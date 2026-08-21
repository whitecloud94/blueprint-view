import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, Loader2, PlugZap, Search, SearchX } from 'lucide-react';
import { BlogLayout } from '../../features/blog/components/BlogLayout';
import { PostCard } from '../../features/blog/components/PostCard';
import { PostCardSkeleton } from '../../features/blog/components/PostCardSkeleton';
import { COMMON_STYLES } from '../../constants/styles';
import { postService } from '../../services/postService';
import { getAxiosErrorMessage } from '../../api/axiosInstance';
import { useToast } from '../../hooks/useToast';
import { LiquidToast } from '../../components/common/feedback/LiquidToast';
import { ERROR_ACTION_STYLES, ErrorState } from '../../components/common/feedback/ErrorState';
import type { PostSummary } from '../../schemas/postSchema';

/**
 * 검색 결과.
 *
 * <p>검색어를 URL 의 q 파라미터로 둔다. 결과 화면을 그대로 공유하거나 북마크할 수
 * 있고, 뒤로 가기가 이전 검색어로 돌아간다. 컴포넌트 상태로만 들고 있으면 셋 다
 * 잃는다.
 *
 * <p>목록·태그 화면과 같은 카드와 더보기를 쓴다. 검색으로 좁힌 목록이라는 점만
 * 다르므로 표현까지 달리할 이유가 없다.
 */
export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isVisible, message, showToast } = useToast();

  const keyword = (searchParams.get('q') ?? '').trim();

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
        const result = await postService.searchPosts(keyword, page);
        setPosts((prev) => (isFirstPage ? result.content : [...prev, ...result.content]));
        setNextPage(result.page + 1);
        setHasNext(result.hasNext);
        setTotal(result.totalElements);
        setLoadFailed(false);
      } catch (error) {
        if (isFirstPage) setLoadFailed(true);
        showToast(getAxiosErrorMessage(error, '검색에 실패했습니다.'));
      } finally {
        setIsLoading(false);
        setLoadingMore(false);
      }
    },
    [keyword, showToast],
  );

  useEffect(() => {
    // 검색어가 없으면 보낼 요청이 없다. 안내만 보여 준다.
    if (!keyword) {
      setPosts([]);
      setTotal(0);
      setHasNext(false);
      setIsLoading(false);
      return;
    }
    void fetchPosts(0);
  }, [keyword, fetchPosts]);

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
            <Search size={24} className="text-indigo-500" aria-hidden="true" />
            {keyword ? `'${keyword}' 검색 결과` : '검색'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {!keyword ? '검색어를 입력해주세요' : isLoading ? '검색 중...' : `${total}개의 글`}
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
                    title="검색할 수 없습니다"
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
                    icon={SearchX}
                    title={keyword ? '검색 결과가 없습니다' : '무엇을 찾으시나요?'}
                    description={
                      keyword
                        ? '제목·본문·태그에서 찾지 못했습니다. 더 짧은 단어로 검색해보세요.'
                        : '상단 검색창에 검색어를 입력하면 제목·본문·태그에서 찾습니다.'
                    }
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
