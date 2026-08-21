import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, Hash, Loader2, PlugZap } from 'lucide-react';
import { BlogLayout } from '../../features/blog/components/BlogLayout';
import { PostCard } from '../../features/blog/components/PostCard';
import { PostCardSkeleton } from '../../features/blog/components/PostCardSkeleton';
import { COMMON_STYLES } from '../../constants/styles';
import { tagService } from '../../services/tagService';
import { getAxiosErrorMessage } from '../../api/axiosInstance';
import { useToast } from '../../hooks/useToast';
import { LiquidToast } from '../../components/common/feedback/LiquidToast';
import { ERROR_ACTION_STYLES, ErrorState } from '../../components/common/feedback/ErrorState';
import type { PostSummary } from '../../schemas/postSchema';

/**
 * 태그별 모아보기.
 *
 * <p>목록과 같은 카드·페이지네이션을 쓴다. 태그로 좁힌 목록이라는 점만 다르다.
 */
export default function TagPostsPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isVisible, message, showToast } = useToast();

  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [nextPage, setNextPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchPosts = useCallback(
    async (page: number) => {
      const isFirstPage = page === 0;
      if (isFirstPage) setIsLoading(true);
      else setLoadingMore(true);

      try {
        const result = await tagService.getPostsByTag(slug, page);
        setPosts((prev) => (isFirstPage ? result.content : [...prev, ...result.content]));
        setNextPage(result.page + 1);
        setHasNext(result.hasNext);
        setTotal(result.totalElements);
        setLoadFailed(false);
      } catch (error) {
        if (isFirstPage) setLoadFailed(true);
        showToast(getAxiosErrorMessage(error, '글을 불러오지 못했습니다.'));
      } finally {
        setIsLoading(false);
        setLoadingMore(false);
      }
    },
    [slug, showToast],
  );

  useEffect(() => {
    void fetchPosts(0);
  }, [fetchPosts]);

  return (
    <BlogLayout>
      <div className="space-y-6">
        <button
          onClick={() => navigate('/blog')}
          className="group flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-bold text-sm"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          전체 글 보기
        </button>

        <div className="mb-8 ml-2">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Hash size={26} className="text-indigo-500" aria-hidden="true" />
            {slug}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {isLoading ? '불러오는 중...' : `${total}개의 글`}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              {[1, 2, 3].map((i) => (
                <PostCardSkeleton key={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {loadFailed ? (
                <div className="flex justify-center py-6">
                  <ErrorState
                    icon={PlugZap}
                    title="글을 불러올 수 없습니다"
                    description="콘텐츠 서버에 일시적으로 연결할 수 없습니다. 잠시 후 다시 시도해주세요."
                    actions={
                      <button type="button" onClick={() => void fetchPosts(0)} className={ERROR_ACTION_STYLES.primary}>
                        다시 시도
                      </button>
                    }
                  />
                </div>
              ) : posts.length === 0 ? (
                <div className="flex justify-center py-6">
                  <ErrorState
                    icon={Hash}
                    title="이 태그의 글이 없습니다"
                    description="태그 이름이 바뀌었거나 아직 글이 없습니다."
                    actions={
                      <button type="button" onClick={() => navigate('/blog')} className={ERROR_ACTION_STYLES.primary}>
                        전체 글 보기
                      </button>
                    }
                  />
                </div>
              ) : (
                posts.map((post) => <PostCard key={post.postId} post={post} />)
              )}

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
      </div>
      <LiquidToast isVisible={isVisible} message={message} variant="error" />
    </BlogLayout>
  );
}
