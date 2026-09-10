import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/**
 * 버튼이 나타나는 깊이.
 *
 * <p>한 화면만큼 내려온 시점을 기준으로 삼는다. 고정 픽셀로 두면 큰 모니터에서는
 * 아직 첫 화면인데 버튼이 떠 있고, 좁은 화면에서는 한참 내려간 뒤에야 나온다.
 */
const showAfter = () => window.innerHeight;

const STYLES = {
    button: `
        fixed bottom-6 right-6 z-40
        flex h-11 w-11 items-center justify-center rounded-full
        border border-white/60 bg-white/80 text-gray-500 shadow-lg backdrop-blur-md
        hover:text-accent-600 hover:border-accent-200
        dark:border-white/10 dark:bg-white/[0.08] dark:text-gray-300
        dark:hover:text-accent-300 dark:hover:border-accent-400/30
        transition-colors duration-300 motion-reduce:transition-none
    `,
};

/**
 * 맨 위로 되돌리는 떠 있는 버튼.
 *
 * <p>긴 글을 다 읽고 나면 제목도, 목록으로 가는 길도 화면 밖에 있다. 되돌아가려면
 * 손으로 한참 밀어 올려야 한다.
 *
 * <p>처음부터 떠 있지는 않는다. 첫 화면에서는 올라갈 곳이 없어서 누를 이유가 없고,
 * 그 자리에 무엇이 떠 있으면 본문만 가린다.
 */
export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        let frame = 0;

        const update = () => {
            frame = 0;
            setIsVisible(window.scrollY > showAfter());
        };

        // 스크롤 이벤트는 한 번 움직일 때 수십 번 들어온다. 프레임마다 한 번만 읽는다.
        const handleScroll = () => {
            if (!frame) {
                frame = requestAnimationFrame(update);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        // 새로고침으로 중간부터 시작하는 경우가 있어 처음 위치도 한 번 본다.
        update();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    const scrollToTop = () => {
        // index.css 가 html 에 scroll-behavior: smooth 를 걸어 두었다. auto 는 그
        // 설정을 따르라는 뜻이라 움직임이 그대로 남는다. 끄려면 instant 여야 한다.
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    type="button"
                    onClick={scrollToTop}
                    aria-label="맨 위로 이동"
                    title="맨 위로"
                    className={STYLES.button}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
                >
                    <ArrowUp size={18} />
                </motion.button>
            )}
        </AnimatePresence>
    );
};
