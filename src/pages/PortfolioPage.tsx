import React from 'react';
import {Hero} from "../features/portfolio/components/Hero.tsx";
import {Projects} from "../features/portfolio/components/Projects.tsx";
import {Skills} from "../features/portfolio/components/Skills.tsx";
import {FooterCTA} from "../features/portfolio/components/FooterCTA.tsx";
import {Social} from "../features/portfolio/components/Social.tsx";
import {FooterInfo} from "../features/portfolio/components/FooterInfo.tsx";
import {Notice} from "../components/common/feedback/Notice.tsx";
import {PageTransition} from "../components/layout/PageTransition.tsx";

const STYLES = {
    main: "w-full max-w-[640px] bg-white dark:bg-white/[0.03] rounded-[32px] sm:rounded-[40px] px-5 sm:px-8 pt-10 sm:pt-12 pb-6 sm:pb-8 shadow-sm border border-white dark:border-white/[0.08] mt-0",
};

const PortfolioPage: React.FC = () => {
    return (
        <PageTransition direction="left">
            <div className="w-full flex justify-center">
                <main className={STYLES.main}>
                    <Notice/>
                    <Hero/>
                    <Projects/>
                    <Skills/>
                    <FooterCTA/>
                    <Social/>
                    <FooterInfo/>
                </main>
            </div>
        </PageTransition>
    );
};

export default PortfolioPage;
