import {Route, Routes, useLocation} from 'react-router-dom';
import {AnimatePresence} from "framer-motion";
import { Suspense, lazy } from 'react';

// Route-based code splitting (lazy-loaded pages)
const Portfolio = lazy(() => import("../../pages/Portfolio/Portfolio"));
const About = lazy(() => import("../../pages/About/About"));
const BlogMain = lazy(() => import("../../pages/Blog/BlogMain"));
const BlogEditor = lazy(() => import("../../pages/Blog/BlogEditor"));
const PostDetail = lazy(() => import("../../pages/Blog/PostDetail"));

export const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Suspense
                fallback={
                    <div className="w-full flex justify-center p-6">
                        <div className="w-full max-w-[640px] bg-white rounded-[24px] px-5 py-6 shadow-sm border border-white text-gray-500 text-sm animate-pulse">
                            Loading...
                        </div>
                    </div>
                }
            >
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Portfolio/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/blog" element={<BlogMain/>}/>
                    <Route path="/blog/write" element={<BlogEditor/>}/>
                    <Route path="/blog/:id" element={<PostDetail/>}/>
                </Routes>
            </Suspense>
        </AnimatePresence>
    );
};
