import React from 'react';
import {Navigation} from "./components/Navigation/Navigation.tsx";
import {Hero} from "./components/Hero/Hero.tsx";
import {Projects} from "./components/Projects/Projects.tsx";
import {Skills} from "./components/Skills/Skills.tsx";
import {FooterCTA} from "./components/FooterCTA/FooterCTA.tsx";
import {Social} from "./components/Social/Social.tsx";
import {FooterInfo} from "./components/FooterInfo/FooterInfo.tsx";

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