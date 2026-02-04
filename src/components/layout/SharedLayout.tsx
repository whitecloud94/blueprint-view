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
            <div className={`w-full ${maxWidth} px-4`}>
                <Navigation />
            </div>
            <div className="w-full flex flex-col items-center">
                {children}
            </div>
        </div>
    );
};
