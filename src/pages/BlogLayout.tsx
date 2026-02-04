import { ReactNode } from 'react';
import {GLASS_STYLES} from "../constants/styles.ts";
import {Sidebar} from "../components/blog/Sidebar.tsx";
import {SharedLayout} from "../components/layout/SharedLayout.tsx";
import {PageTransition} from "../components/layout/PageTransition.tsx";

export const BlogLayout = ({ children }: { children: ReactNode }) => {
    return (
        <PageTransition direction="right">
            <SharedLayout className={GLASS_STYLES.background}>
                {/* Main Grid Layout */}
                <div className="max-w-[1100px] w-full mx-auto px-4 sm:px-6 py-12 flex gap-8">

                    {/* Left Sidebar (Desktop Only) */}
                    <div className="hidden lg:block w-64 shrink-0">
                        <Sidebar />
                    </div>

                    {/* Right Content */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>
                </div>
            </SharedLayout>
        </PageTransition>
    );
};