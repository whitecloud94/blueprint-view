import React from 'react';
import {Hero} from "../../features/portfolio/Hero/Hero.tsx";
import {Projects} from "../../features/portfolio/Projects/Projects.tsx";
import {Skills} from "../../features/portfolio/Skills/Skills.tsx";
import {FooterCTA} from "../../features/portfolio/FooterCTA/FooterCTA.tsx";
import {Social} from "../../features/portfolio/Social/Social.tsx";
import {FooterInfo} from "../../features/portfolio/FooterInfo/FooterInfo.tsx";
import {Notice} from "../../components/common/feedback/Notice.tsx";
import {PageTransition} from "../../components/layout/PageTransition.tsx";

const STYLES = {
    main: "w-full max-w-[640px] bg-white rounded-[32px] sm:rounded-[40px] px-5 sm:px-8 pt-10 sm:pt-12 pb-6 sm:pb-8 shadow-sm border border-white mt-0",
};

const Portfolio: React.FC = () => {
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

export default Portfolio;
