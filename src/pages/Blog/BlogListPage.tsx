import { useEffect, useState } from 'react';
import { PostCard } from '../../features/blog/components/PostCard';
import { PostCardSkeleton } from '../../features/blog/components/PostCardSkeleton';
import { BlogLayout } from '../../features/blog/components/BlogLayout';
import { AnimatePresence, motion } from 'framer-motion';
import { Pencil, PlugZap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COMMON_STYLES, GLASS_STYLES } from '../../constants/styles';
import { postService } from '../../services/postService';
import { getAxiosErrorMessage } from '../../api/axiosInstance';
import { useToast } from '../../hooks/useToast';
import { LiquidToast } from '../../components/common/feedback/LiquidToast';
import { useIsAdmin } from '../../store/useAuthStore';
import type { Post } from '../../schemas/postSchema';

export default function BlogListPage() {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const { isVisible, message, showToast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  /** 임시저장 글 발행. 성공 시 목록의 해당 항목만 갱신한다. */
  const handlePublish = async (postId: number) => {
    try {
      const updated = await postService.changeStatus(postId, 'PUBLISHED');
      setPosts((prev) => prev.map((post) => (post.postId === postId ? updated : post)));
    } catch (error) {
      showToast(getAxiosErrorMessage(error, '발행에 실패했습니다.'));
    }
  };

  // 조회 범위는 서버가 판정한다. 관리자에게는 임시저장 글이 함께 내려온다.
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const data = await postService.getPosts();
        setPosts(data);
        setLoadFailed(false);
      } catch (error) {
        setLoadFailed(true);
        showToast(getAxiosErrorMessage(error, '포스트를 불러오지 못했습니다.'));
      } finally {
        setIsLoading(false);
      }
    };
    void fetchPosts();
  }, [showToast, isAdmin]);

  return (
    <BlogLayout>
      <div className="space-y-6 relative">
        <div className="mb-8 ml-2">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Latest Posts</h1>
          <p className="text-gray-500 dark:text-gray-400">최신 포스트를 조회합니다.</p>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {[1, 2, 3].map((i) => (
                <PostCardSkeleton key={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* API 가 로컬 데스크탑에 있어 연결 실패가 정상 범위의 상태다.
                  빈 목록으로 보이면 "글이 없음"과 구분되지 않으므로 명시한다. */}
              {loadFailed ? (
                <div className={`${GLASS_STYLES.card} p-10 flex flex-col items-center gap-3 text-center`}>
                  <PlugZap size={36} className="text-gray-300 dark:text-gray-600" aria-hidden="true" />
                  <h2 className={`${GLASS_STYLES.heading} text-lg`}>글을 불러올 수 없습니다</h2>
                  <p className={GLASS_STYLES.subtext}>
                    콘텐츠 서버에 일시적으로 연결할 수 없습니다. 잠시 후 다시 시도해주세요.
                  </p>
                </div>
              ) : posts.length === 0 ? (
                <div className={`${GLASS_STYLES.card} p-10 text-center`}>
                  <p className={GLASS_STYLES.subtext}>아직 발행된 글이 없습니다.</p>
                </div>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post.postId}
                    post={post}
                    readTime="5 min read"
                    tags={[]}
                    onPublish={isAdmin ? handlePublish : undefined}
                  />
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 글쓰기 진입점은 관리자에게만 노출한다. 노출 여부와 무관하게
            실제 저장 권한은 서버가 판정한다. */}
        {isAdmin && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/blog/write')}
            aria-label="새 글 작성"
            className={`fixed bottom-8 right-8 w-16 h-16 ${COMMON_STYLES.primaryButton} rounded-2xl shadow-2xl shadow-indigo-200 z-50`}
          >
            <Pencil size={24} />
          </motion.button>
        )}
      </div>
      <LiquidToast isVisible={isVisible} message={message} variant="error" />
    </BlogLayout>
  );
}
