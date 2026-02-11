import {ReactNode} from 'react';
import {Sidebar} from "./Sidebar";
import {PageTransition} from "../../../components/layout/PageTransition";

const STYLES = {
    wrapper: "w-full flex justify-center",
    container: "max-w-[1100px] w-full flex gap-8 px-4 sm:px-6 py-12",
    sidebarWrapper: "hidden lg:block w-64 shrink-0",
    contentWrapper: "flex-1 min-w-0",
};

export const BlogLayout = ({ children }: { children: ReactNode }) => {
    return (
        <PageTransition direction="right">
            <div className={STYLES.wrapper}>
                {/* Main Grid Layout */}
                <div className={STYLES.container}>
                    {/* Left Sidebar (Desktop Only) */}
                    <div className={STYLES.sidebarWrapper}>
                        <Sidebar />
                    </div>

                    {/* Right Content */}
                    <main className={STYLES.contentWrapper}>
                        {children}
                    </main>
                </div>
            </div>
        </PageTransition>
    );
};