import {Route, Routes, useLocation} from 'react-router-dom';
import {AnimatePresence} from "framer-motion";
import Portfolio from "../../pages/Portfolio";
import BlogMain from "../../pages/BlogMain";
import BlogEditor from "../../pages/BlogEditor";
import PostDetail from "../../pages/PostDetail";

export const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Portfolio/>}/>
                <Route path="/blog" element={<BlogMain/>}/>
                <Route path="/blog/write" element={<BlogEditor/>}/>
                <Route path="/blog/:id" element={<PostDetail/>}/>
            </Routes>
        </AnimatePresence>
    );
};
