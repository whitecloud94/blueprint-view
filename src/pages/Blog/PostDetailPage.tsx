// src/pages/Blog/PostDetailPage.tsx
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {BlogLayout} from "../../features/blog/components/BlogLayout";
import {ArrowLeft, Calendar, Clock, FileQuestion, Link as LinkIcon, Pencil, PlugZap, Trash2} from 'lucide-react';
import {GLASS_STYLES} from '../../constants/styles';
import {AnimatePresence, motion} from 'framer-motion';
import {useEffect, useState} from "react";
import {postService} from "../../services/postService.ts";
import {Post} from "../../schemas/postSchema.ts";
import {PostDetailSkeleton} from "../../features/blog/components/PostDetailSkeleton";
import {MarkdownContent} from "../../features/blog/components/MarkdownContent";
import {SampleContentNotice} from "../../features/blog/components/SampleContentNotice";
import {useViewCount} from "../../features/blog/hooks/useViewCount";
import {useReadTimeTracker} from "../../features/blog/hooks/useReadTimeTracker";
import {TagChip} from "../../features/blog/components/TagChip";
import {CommentSection} from "../../features/blog/comment/CommentSection";
import {LikeButton} from "../../features/blog/components/LikeButton";
import {LiquidToast} from "../../components/common/feedback/LiquidToast";
import {useToast} from "../../hooks/useToast";
import {ConfirmDialog} from "../../components/common/feedback/ConfirmDialog";
import {ERROR_ACTION_STYLES, ErrorState} from "../../components/common/feedback/ErrorState";
import {useIsAdmin} from "../../store/useAuthStore";
import {useErrorActions} from "../../store/useErrorStore";

export default function PostDetailPage() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const isAdmin = useIsAdmin();
    const {showError} = useErrorActions();
    const {isVisible, message, showToast} = useToast();

    const [post, setPost] = useState<Post>();
    const [isLoading, setIsLoading] = useState(true);
    const [loadFailed, setLoadFailed] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    // 본문을 실제로 연 방문만 센다. 세션 단위 중복은 훅이 걸러 낸다.
    useViewCount(post?.postId, post?.status === 'PUBLISHED');

    // 목록의 평균 읽기 시간을 채우는 기록. 발행글에만 의미가 있다.
    useReadTimeTracker(post?.status === 'PUBLISHED' ? post?.postId : undefined);

    const handleDelete = async () => {
        if (!post?.postId) return;

        setDeleting(true);
        try {
            await postService.deletePost(post.postId);
            navigate('/blog', {replace: true});
        } catch (error) {
            setDeleting(false);
            setDeleteDialogOpen(false);
            showError(error, {
                fallbackTitle: '삭제하지 못했습니다',
                onRetry: () => void handleDelete(),
            });
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true);
            try {
                const data = await postService.getPostById(Number(id));
                setPost(data);
                setLoadFailed(false);
            } catch (error) {
                // 404(없거나 비공개)와 서버에 닿지 못한 상황을 구분한다.
                // 둘 다 "글이 없다"로 보여주면 사용자가 잘못된 판단을 하게 된다.
                setPost(undefined);
                setLoadFailed(!isNotFound(error));
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost().then(r => console.log(r));
    }, [id])

    const relatedProject = null;

    return (
        <BlogLayout>
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="skeleton"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <PostDetailSkeleton />
                    </motion.div>
                ) : !post ? (
                    <motion.div
                        key="not-found"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-center py-16"
                    >
                        {/* 삭제된 글과 권한이 없어 감춰진 글을 서버가 모두 404 로 응답한다.
                            어느 쪽인지 드러나지 않도록 문구도 구분하지 않는다. */}
                        {loadFailed ? (
                            <ErrorState
                                icon={PlugZap}
                                title="글을 불러올 수 없습니다"
                                description="콘텐츠 서버에 일시적으로 연결할 수 없습니다. 잠시 후 다시 시도해주세요."
                                actions={
                                    <button
                                        type="button"
                                        onClick={() => navigate('/blog')}
                                        className={ERROR_ACTION_STYLES.primary}
                                    >
                                        <ArrowLeft size={16} /> 목록으로
                                    </button>
                                }
                            />
                        ) : (
                            <ErrorState
                                icon={FileQuestion}
                                code="404"
                                label="NOT FOUND"
                                title="글을 찾을 수 없습니다"
                                description="삭제되었거나 아직 공개되지 않은 글입니다."
                                actions={
                                    <button
                                        type="button"
                                        onClick={() => navigate('/blog')}
                                        className={ERROR_ACTION_STYLES.primary}
                                    >
                                        <ArrowLeft size={16} /> 목록으로
                                    </button>
                                }
                            />
                        )}
                    </motion.div>
                ) : (
                    <motion.div 
                        key="content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        {/* 상단 네비게이션 & 메타 */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between gap-4">
                                <button
                                    onClick={() => navigate('/blog')}
                                    className="group flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors font-bold text-sm"
                                >
                                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                    Back to List
                                </button>

                                {/* 관리자에게만 노출한다. 노출 여부와 무관하게 실제 권한은 서버가 판정한다. */}
                                {isAdmin && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => navigate(`/blog/${post.postId}/edit`)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-white/60 dark:hover:bg-white/5 transition-colors"
                                        >
                                            <Pencil size={15} /> 수정
                                        </button>
                                        <button
                                            onClick={() => setDeleteDialogOpen(true)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-white/60 dark:hover:bg-white/5 transition-colors"
                                        >
                                            <Trash2 size={15} /> 삭제
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {relatedProject && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 rounded-full text-xs font-black uppercase tracking-wider">
                                        <LinkIcon size={12} />
                                        Related Project: {relatedProject.title}
                                    </div>
                                )}
                                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                                    {post.titleName}
                                </h1>
                                
                                {post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <TagChip key={tag.slug} tag={tag} size="md" />
                                        ))}
                                    </div>
                                )}

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 dark:text-gray-500 font-mono">
                                    {post.status === 'DRAFT' && (
                                        <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs font-black tracking-wider">
                                            임시저장
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={14}/> {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"/>
                                    <span className="flex items-center gap-1.5">
                                        <Clock size={14}/> {post.updatedAt ? new Date(post.updatedAt).toLocaleTimeString() : new Date().toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <SampleContentNotice />

                        {/* 본문 콘텐츠 */}
                        <div className={`${GLASS_STYLES.card} bg-white/80 dark:bg-gray-900/40 p-8 sm:p-12`}>
                            <div className="prose prose-sky dark:prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white">
                                <MarkdownContent>{post.content}</MarkdownContent>
                            </div>

                            {/* 글을 다 읽은 자리에 둔다. 읽기 전에 누르는 동선은 어색하다. */}
                            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-white/10 flex justify-center">
                                <LikeButton
                                    target="post"
                                    targetId={post.postId ?? 0}
                                    initialCount={post.likeCount}
                                    initialLiked={post.likedByMe ?? false}
                                    onError={showToast}
                                />
                            </div>
                        </div>

                        {/* 댓글은 발행된 글에만 받는다. 임시저장 글은 방문자에게 보이지 않는다. */}
                        {post.postId !== undefined && post.status === 'PUBLISHED' && (
                            <CommentSection postId={post.postId} onNotify={showToast} />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <LiquidToast isVisible={isVisible} message={message} variant="error" />

            <ConfirmDialog
                isOpen={isDeleteDialogOpen}
                title="글을 삭제할까요?"
                description="삭제한 글은 복구할 수 없습니다. 잠시 내려두려는 것이라면 수정 화면에서 임시저장으로 되돌리는 편이 안전합니다."
                confirmLabel="삭제"
                isProcessing={isDeleting}
                onConfirm={handleDelete}
                onCancel={() => setDeleteDialogOpen(false)}
            />
        </BlogLayout>
    );
}

/** 서버가 404 로 응답했는지. 연결 실패와 구분하기 위한 판별이다. */
function isNotFound(error: unknown): boolean {
    return axios.isAxiosError(error) && error.response?.status === 404;
}
