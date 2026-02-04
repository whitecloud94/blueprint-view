import React from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import {Hero} from "./features/portfolio/Hero/Hero.tsx";
import {Projects} from "./features/portfolio/Projects/Projects.tsx";
import {Skills} from "./features/portfolio/Skills/Skills.tsx";
import {FooterCTA} from "./features/portfolio/FooterCTA/FooterCTA.tsx";
import {Social} from "./features/portfolio/Social/Social.tsx";
import {FooterInfo} from "./features/portfolio/FooterInfo/FooterInfo.tsx";
import {Notice} from "./components/common/feedback/Notice.tsx";
import BlogMain from "./pages/BlogMain.tsx";
import {AnimatePresence} from "framer-motion";
import {PageTransition} from "./components/layout/PageTransition.tsx";
import {SharedLayout} from "./components/layout/SharedLayout.tsx";

const STYLES = {
    main: "w-full max-w-[640px] bg-white rounded-[32px] sm:rounded-[40px] px-5 sm:px-8 pt-10 sm:pt-12 pb-6 sm:pb-8 shadow-sm border border-white mt-0 mx-4",
};

const Portfolio: React.FC = () => {
    return (
        <SharedLayout className="bg-[#F3F3F3] selection:bg-gray-200">
            <PageTransition direction="left">
                <main className={STYLES.main}>
                    <Notice/>
                    <Hero/>
                    <Projects/>
                    <Skills/>
                    <FooterCTA/>
                    <Social/>
                    <FooterInfo/>
                </main>
            </PageTransition>
        </SharedLayout>
    );
};

const AnimatedRoutes = () => {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Portfolio/>}/>
                <Route path="/blog" element={<BlogMain/>}/>
            </Routes>
        </AnimatePresence>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
};

export default App;