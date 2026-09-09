import { ReactNode, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';

interface SharedLayoutProps {
    children: ReactNode;
}

export const SharedLayout = ({ children }: SharedLayoutProps) => {
    const location = useLocation();
    const isBlog = location.pathname.startsWith('/blog');

    // 네비게이션 바는 본문 폭을 따라간다. 그래서 바가 쓸 수 있는 가로 공간은
    // 여기서 결정되고, 그 사실을 Navigation 에도 함께 알려준다. 바가 스스로
    // 경로를 다시 해석해 폭을 짐작하면 두 곳이 어긋난다.
    const config = useMemo(() => ({
        maxWidth: isBlog ? "max-w-[1100px]" : "max-w-[640px]",
        navWidth: isBlog ? "wide" as const : "compact" as const,
        className: "bg-[#F3F3F3] dark:bg-[#121212] selection:bg-gray-200 dark:selection:bg-gray-800"
    }), [isBlog]);

    return (
        <div className={`min-h-screen font-sans flex flex-col items-center py-4 sm:py-8 transition-colors duration-500 ${config.className}`}>
            <div className={`w-full ${config.maxWidth} px-4 sticky top-4 sm:top-6 z-[100] mb-6`}>
                <Navigation width={config.navWidth} />
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    );
};
