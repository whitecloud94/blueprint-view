// src/pages/Blog/PostDetailPage.tsx
import {useNavigate, useParams} from 'react-router-dom';
import {BlogLayout} from "../../features/blog/components/BlogLayout";
import {ArrowLeft, Calendar, Clock, Link as LinkIcon} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {GLASS_STYLES} from '../../constants/styles';
import {AnimatePresence, motion} from 'framer-motion';
import {useEffect, useState} from "react";
import {postService} from "../../services/postService.ts";
import {Post} from "../../schemas/postSchema.ts";
import {PostDetailSkeleton} from "../../features/blog/components/PostDetailSkeleton";

export default function PostDetailPage() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    // const post = MOCK_POSTS.find(p => p.id === Number(id));
    const [post, setPost] = useState<Post>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true);
            try {
                const data = await postService.getPostById(Number(id));
                setPost(data);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
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
                        className="flex flex-col items-center justify-center py-20"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h2>
                        <button 
                            onClick={() => navigate('/blog')}
                            className="text-indigo-600 font-bold flex items-center gap-2"
                        >
                            <ArrowLeft size={20} /> Back to Blog
                        </button>
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
                            <button 
                                onClick={() => navigate('/blog')}
                                className="group flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-bold text-sm"
                            >
                                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                Back to List
                            </button>

                            <div className="space-y-4">
                                {relatedProject && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-black uppercase tracking-wider">
                                        <LinkIcon size={12} />
                                        Related Project: {relatedProject.title}
                                    </div>
                                )}
                                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                                    {post.titleName}
                                </h1>
                                
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 dark:text-gray-500 font-mono">
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

                        {/* 본문 콘텐츠 */}
                        <div className={`${GLASS_STYLES.card} bg-white/80 dark:bg-gray-900/40 p-8 sm:p-12`}>
                            <div className="prose prose-indigo dark:prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        h1: ({node, ...props}) => (
                                            <h1 className="text-4xl font-black text-gray-900 dark:text-white mt-12 mb-6" {...props} />
                                        ),
                                        h2: ({node, ...props}) => (
                                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-10 mb-4" {...props} />
                                        ),
                                        h3: ({node, ...props}) => (
                                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-8 mb-3" {...props} />
                                        ),
                                        code({node, className, children, ...props}: any) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            const isInline = !match;
                                            return !isInline ? (
                                                <SyntaxHighlighter
                                                    style={vscDarkPlus}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    {...props}
                                                >
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
                                            ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            );
                                        },
                                    }}
                                >
                                    {post.content || post.excerpt}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </BlogLayout>
    );
}
