import {Route, Routes, useLocation} from 'react-router-dom';
import {AnimatePresence} from "framer-motion";
import { Suspense, lazy } from 'react';

const PortfolioPage = lazy(() => import("../pages/PortfolioPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const BlogListPage = lazy(() => import("../pages/Blog/BlogListPage"));
const BlogEditorPage = lazy(() => import("../pages/Blog/BlogEditorPage"));
const PostDetailPage = lazy(() => import("../pages/Blog/PostDetailPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));

export const AppRouter = () => {
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
                    <Route path="/" element={<PortfolioPage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/blog" element={<BlogListPage/>}/>
                    <Route path="/blog/write" element={<BlogEditorPage/>}/>
                    <Route path="/blog/:id" element={<PostDetailPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                </Routes>
            </Suspense>
        </AnimatePresence>
    );
};
