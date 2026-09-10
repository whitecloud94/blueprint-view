import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Navigation } from './Navigation';

interface SharedLayoutProps {
    children: ReactNode;
}

/** 화면별 바 너비(px). Tailwind 클래스가 아니라 숫자로 두어야 사이 값을 그릴 수 있다. */
const NAV_MAX_WIDTH = {
    compact: 640,
    wide: 1100,
} as const;

/**
 * 바가 늘고 주는 움직임.
 *
 * <p>목표를 살짝 지나쳤다가 돌아오게 두었다. 정확히 멈추면 폭이 "바뀐" 것으로만
 * 보이고, 조금 넘겼다 오면 늘어난 것으로 읽힌다.
 *
 * <p>damping 을 stiffness 에 비해 낮게 잡으면 그 넘김이 생긴다. 다만 두세 번
 * 출렁이면 화면을 옮길 때마다 눈이 먼저 그리로 간다. 한 번만 넘기고 잦아드는
 * 정도에서 멈춘다.
 */
const NAV_WIDTH_SPRING = {
    type: 'spring',
    stiffness: 260,
    damping: 22,
    mass: 0.9,
} as const;

const BACKGROUND = "bg-[#F3F3F3] dark:bg-[#121212] selection:bg-gray-200 dark:selection:bg-gray-800";

export const SharedLayout = ({ children }: SharedLayoutProps) => {
    const location = useLocation();
    const isBlog = location.pathname.startsWith('/blog');
    const prefersReducedMotion = useReducedMotion();

    // 네비게이션 바는 본문 폭을 따라간다. 그래서 바가 쓸 수 있는 가로 공간은
    // 여기서 결정되고, 그 사실을 Navigation 에도 함께 알려준다. 바가 스스로
    // 경로를 다시 해석해 폭을 짐작하면 두 곳이 어긋난다.
    const targetWidth = isBlog ? 'wide' as const : 'compact' as const;

    /**
     * 바가 지금 담을 수 있는 내용의 양.
     *
     * <p>폭과 내용을 동시에 바꾸면 늘어나는 쪽에서 내용이 먼저 커진다. 아직 좁은
     * 바에 검색과 이름표가 들어와 오른쪽 끝이 잘린 채로 수백 밀리초가 지나간다
     * (실측 78px). 그래서 순서를 나눈다. 넓힐 때는 다 늘어난 뒤에 채우고, 좁힐
     * 때는 먼저 비우고 줄인다. 어느 쪽이든 내용이 바보다 큰 순간이 없다.
     */
    const [contentWidth, setContentWidth] = useState(targetWidth);

    useEffect(() => {
        // 좁힐 때는 기다리지 않는다. 비우는 것은 자리를 늘리는 일이라 잘릴 일이 없다.
        if (targetWidth === 'compact') {
            setContentWidth('compact');
        }
    }, [targetWidth]);

    return (
        <div className={`min-h-screen font-sans flex flex-col items-center py-4 sm:py-8 transition-colors duration-500 ${BACKGROUND}`}>
            <motion.div
                className="w-full px-4 sticky top-4 sm:top-6 z-[100] mb-6"
                // 첫 화면에서는 움직이지 않는다. 들어오자마자 바가 펼쳐지면
                // 무엇이 바뀐 것인지 알 수 없는 움직임이 된다.
                initial={false}
                animate={{ maxWidth: NAV_MAX_WIDTH[targetWidth] }}
                // 움직임을 줄여 달라고 한 사용자에게는 폭만 바꾼다. 이 애니메이션은
                // 흐름을 거들 뿐이고, 없어도 어디로 왔는지는 그대로 드러난다.
                transition={prefersReducedMotion ? { duration: 0 } : NAV_WIDTH_SPRING}
                // 다 늘어난 뒤에 채운다. 도중에 경로가 또 바뀌면 그때의 목표를 따른다.
                onAnimationComplete={() => setContentWidth(targetWidth)}
            >
                <Navigation width={contentWidth} />
            </motion.div>
            <div className="w-full">
                {children}
            </div>
        </div>
    );
};
