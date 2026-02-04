import { ReactNode } from 'react';
import { Navigation } from './Navigation';

interface SharedLayoutProps {
    children: ReactNode;
    maxWidth?: string;
    className?: string;
}

export const SharedLayout = ({ children, maxWidth = "max-w-[640px]", className = "" }: SharedLayoutProps) => {
    return (
        <div className={`min-h-screen font-sans flex flex-col items-center py-4 sm:py-8 ${className}`}>
            <div className={`w-full ${maxWidth} px-4 sticky top-4 sm:top-6 z-50 mb-6`}>
                <Navigation />
            </div>
            {children}
        </div>
    );
};
