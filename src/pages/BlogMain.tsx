// src/pages/BlogMain.tsx
import {PostCard} from '../components/blog/PostCard';
import {BlogLayout} from "./BlogLayout.tsx";
import {MOCK_POSTS} from "../data";
import {motion} from 'framer-motion';
import {Pencil} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {COMMON_STYLES} from '../constants/styles';

export default function BlogMain() {
    const navigate = useNavigate();
    return (
        <BlogLayout>
            <div className="space-y-6 relative">
                {/* 헤더 영역 (선택사항) */}
                <div className="mb-8 ml-2">
                    <h1 className="text-3xl font-black text-gray-900 mb-2">Latest Posts</h1>
                    <p className="text-gray-500">테스트 데이터 및 Mock 데이터를 사용하여 블로그 포스트를 표시합니다.</p>
                </div>

                {/* 글 목록 렌더링 */}
                {MOCK_POSTS.map((post) => (
                    <PostCard
                        key={post.id}
                        {...post}
                    />
                ))}

                {/* 플로팅 액션 버튼 (FAB) */}
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate('/blog/write')}
                    className={`fixed bottom-8 right-8 w-16 h-16 ${COMMON_STYLES.primaryButton} rounded-2xl shadow-2xl shadow-indigo-200 z-50`}
                >
                    <Pencil size={24} />
                </motion.button>
            </div>
        </BlogLayout>
    );
}