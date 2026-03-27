import {Route, Routes, useLocation} from 'react-router-dom';
import {AnimatePresence} from "framer-motion";
import { Suspense, lazy } from 'react';
import { LoadingBar } from '../components/common/LoadingBar';

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
            <Suspense fallback={<LoadingBar />}>
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
