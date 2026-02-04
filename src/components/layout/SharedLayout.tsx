import { ReactNode, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';
import { GLASS_STYLES } from "../../constants/styles.ts";

interface SharedLayoutProps {
    children: ReactNode;
}

export const SharedLayout = ({ children }: SharedLayoutProps) => {
    const location = useLocation();
    const isBlog = location.pathname.startsWith('/blog');

    const config = useMemo(() => ({
        maxWidth: isBlog ? "max-w-[1100px]" : "max-w-[640px]",
        className: isBlog ? GLASS_STYLES.background : "bg-[#F3F3F3] selection:bg-gray-200"
    }), [isBlog]);

    return (
        <div className={`min-h-screen font-sans flex flex-col items-center py-4 sm:py-8 transition-colors duration-500 ${config.className}`}>
            <div className={`w-full ${config.maxWidth} px-4 sticky top-4 sm:top-6 z-[100] mb-6`}>
                <Navigation />
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    );
};
