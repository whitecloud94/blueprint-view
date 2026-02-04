import { ReactNode } from 'react';
import {GLASS_STYLES} from "../constants/styles.ts";
import {Sidebar} from "../components/blog/Sidebar.tsx";
import {SharedLayout} from "../components/layout/SharedLayout.tsx";
import {PageTransition} from "../components/layout/PageTransition.tsx";

export const BlogLayout = ({ children }: { children: ReactNode }) => {
    return (
        <SharedLayout className={GLASS_STYLES.background} maxWidth="max-w-[1100px]">
            <PageTransition direction="right">
                {/* Main Grid Layout */}
                <div className="max-w-[1100px] w-full flex gap-8 px-4 sm:px-6 py-12">

                    {/* Left Sidebar (Desktop Only) */}
                    <div className="hidden lg:block w-64 shrink-0">
                        <Sidebar />
                    </div>

                    {/* Right Content */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>
                </div>
            </PageTransition>
        </SharedLayout>
    );
};