import {Route, Routes, useLocation} from 'react-router-dom';
import {AnimatePresence} from "framer-motion";
import { Suspense, lazy } from 'react';
import { LoadingBar } from '../components/common/LoadingBar';
import { RequireAdmin } from '../features/auth/components/RequireAdmin';

const PortfolioPage = lazy(() => import("../pages/PortfolioPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const BlogListPage = lazy(() => import("../pages/Blog/BlogListPage"));
const BlogEditorPage = lazy(() => import("../pages/Blog/BlogEditorPage"));
const PostDetailPage = lazy(() => import("../pages/Blog/PostDetailPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));

export const AppRouter = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Suspense fallback={<LoadingBar />}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PortfolioPage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/blog" element={<BlogListPage/>}/>
                    <Route path="/blog/:id" element={<PostDetailPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>

                    {/* 관리자 전용 구간. 최종 권한 판정은 서버가 수행한다. */}
                    <Route element={<RequireAdmin/>}>
                        <Route path="/blog/write" element={<BlogEditorPage/>}/>
                    </Route>
                </Routes>
            </Suspense>
        </AnimatePresence>
    );
};
