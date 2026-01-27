import React from 'react';
import {Navigation} from "./components/layout/Navigation.tsx";
import {Hero} from "./features/portfolio/Hero/Hero.tsx";
import {Projects} from "./features/portfolio/Projects/Projects.tsx";
import {Skills} from "./features/portfolio/Skills/Skills.tsx";
import {FooterCTA} from "./features/portfolio/FooterCTA/FooterCTA.tsx";
import {Social} from "./features/portfolio/Social/Social.tsx";
import {FooterInfo} from "./features/portfolio/FooterInfo/FooterInfo.tsx";
import {Notice} from "./components/common/feedback/Notice.tsx";

const STYLES = {
    layout: "min-h-screen bg-[#F3F3F3] text-[#1A1A1A] font-sans py-4 sm:py-8 px-4 flex justify-center items-start selection:bg-gray-200",
    container: "w-full max-w-[640px] space-y-6",
    main: "bg-white rounded-[32px] sm:rounded-[40px] px-5 sm:px-8 pt-10 sm:pt-12 pb-6 sm:pb-8 shadow-sm border border-white",
};

const App: React.FC = () => {
    return (
        <div className={STYLES.layout}>
            <div className={STYLES.container}>
                <Navigation/>
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
        </div>
    );
};

export default App;