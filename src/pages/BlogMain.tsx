// src/pages/BlogMain.tsx
import {PostCard} from '../components/blog/PostCard';
import {BlogLayout} from "./BlogLayout.tsx";
import {MOCK_POSTS} from "../data";

export default function BlogMain() {
    return (
        <BlogLayout>
            <div className="space-y-6">
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
            </div>
        </BlogLayout>
    );
}