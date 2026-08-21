import { useCallback, useEffect, useState } from 'react';
import { PostCard } from '../../features/blog/components/PostCard';
import { PostCardSkeleton } from '../../features/blog/components/PostCardSkeleton';
import { BlogLayout } from '../../features/blog/components/BlogLayout';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Loader2, Pencil, PlugZap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COMMON_STYLES, GLASS_STYLES } from '../../constants/styles';
import { postService } from '../../services/postService';
import { getAxiosErrorMessage } from '../../api/axiosInstance';
import { useToast } from '../../hooks/useToast';
import { LiquidToast } from '../../components/common/feedback/LiquidToast';
import { ERROR_ACTION_STYLES, ErrorState } from '../../components/common/feedback/ErrorState';
import { useIsAdmin } from '../../store/useAuthStore';
import { useErrorActions } from '../../store/useErrorStore';
import type { PostSummary } from '../../schemas/postSchema';

export default function BlogListPage() {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const { isVisible, message, showToast } = useToast();
  const { showError } = useErrorActions();
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [nextPage, setNextPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  /**
   * 임시저장 글 발행.
   *
   * 목록은 요약만 들고 있어 상세 응답으로 통째로 갈아끼울 수 없다. 바뀐 것은
   * 상태뿐이므로 해당 필드만 반영한다.
   */
  const handlePublish = async (postId: number) => {
    try {
      const updated = await postService.changeStatus(postId, 'PUBLISHED');
      setPosts((prev) =>
        prev.map((post) => (post.postId === postId ? { ...post, status: updated.status } : post)),
      );
    } catch (error) {
      showError(error, {
        fallbackTitle: '발행하지 못했습니다',
        onRetry: () => void handlePublish(postId),
      });
    }
  };

  /**
   * 목록 조회.
   *
   * 조회 범위는 서버가 판정한다. 관리자에게는 임시저장 글이 함께 내려온다.
   * 첫 페이지는 교체, 이후 페이지는 이어 붙인다.
   */
  const fetchPosts = useCallback(
    async (page: number) => {
      const isFirstPage = page === 0;
      if (isFirstPage) {
        setIsLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const result = await postService.getPosts(page);
        setPosts((prev) => (isFirstPage ? result.content : [...prev, ...result.content]));
        setNextPage(result.page + 1);
        setHasNext(result.hasNext);
        setLoadFailed(false);
      } catch (error) {
        // 이어 붙이기 실패는 이미 보고 있는 목록을 지우지 않는다.
        if (isFirstPage) {
          setLoadFailed(true);
        }
        showToast(getAxiosErrorMessage(error, '포스트를 불러오지 못했습니다.'));
      } finally {
        setIsLoading(false);
        setLoadingMore(false);
      }
    },
    [showToast],
  );

  useEffect(() => {
    void fetchPosts(0);
  }, [fetchPosts, isAdmin]);

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
                <div className="flex justify-center py-6">
                  <ErrorState
                    icon={PlugZap}
                    title="글을 불러올 수 없습니다"
                    description="콘텐츠 서버에 일시적으로 연결할 수 없습니다. 잠시 후 다시 시도해주세요."
                    actions={
                      <button
                        type="button"
                        onClick={() => void fetchPosts(0)}
                        className={ERROR_ACTION_STYLES.primary}
                      >
                        다시 시도
                      </button>
                    }
                  />
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
                    onPublish={isAdmin ? handlePublish : undefined}
                  />
                ))
              )}

              {/* 무한 스크롤 대신 명시적 버튼을 쓴다. 키보드로 도달 가능하고,
                  스크롤 위치 복원이나 푸터 접근을 방해하지 않는다. */}
              {hasNext && (
                <div className="flex justify-center pt-4">
                  <button
                    type="button"
                    onClick={() => void fetchPosts(nextPage)}
                    disabled={isLoadingMore}
                    className={`${COMMON_STYLES.secondaryButton} dark:bg-white/10 dark:text-white dark:border-white/15 px-6 py-3 text-sm disabled:opacity-50`}
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 size={16} className="animate-spin" aria-hidden="true" /> 불러오는 중...
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} aria-hidden="true" /> 더보기
                      </>
                    )}
                  </button>
                </div>
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
