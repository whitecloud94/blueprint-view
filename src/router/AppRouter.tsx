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
const TagPostsPage = lazy(() => import("../pages/Blog/TagPostsPage"));
const SearchResultsPage = lazy(() => import("../pages/Blog/SearchResultsPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export const AppRouter = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Suspense fallback={<LoadingBar />}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PortfolioPage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/blog" element={<BlogListPage/>}/>
                    {/* :id 보다 먼저 둔다. 뒤에 두면 'tags' 와 'search' 가 글 번호로 해석된다. */}
                    <Route path="/blog/tags/:slug" element={<TagPostsPage/>}/>
                    <Route path="/blog/search" element={<SearchResultsPage/>}/>
                    <Route path="/blog/:id" element={<PostDetailPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>

                    {/* 관리자 전용 구간. 최종 권한 판정은 서버가 수행한다. */}
                    <Route element={<RequireAdmin/>}>
                        <Route path="/blog/write" element={<BlogEditorPage/>}/>
                        <Route path="/blog/:id/edit" element={<BlogEditorPage/>}/>
                    </Route>

                    {/* 일치하는 라우트가 없으면 빈 화면이 남는다. 항상 마지막에 둔다. */}
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Suspense>
        </AnimatePresence>
    );
};
