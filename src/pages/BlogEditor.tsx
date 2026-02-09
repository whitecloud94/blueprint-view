import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {ArrowLeft, Edit3, Eye, Save,} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {COMMON_STYLES, GLASS_STYLES} from '../constants/styles';
import EditorPanel from '../components/blog/editor/EditorPanel.tsx';
import PreviewPanel from '../components/blog/editor/PreviewPanel.tsx';
import {useBlogStore} from '../store/useBlogStore';
import {blogPostSchema, BlogPostData} from '../schemas/blog';

const DRAFT_KEY = 'blog-draft';

export default function BlogEditor() {
    const navigate = useNavigate();
    const { formData, setFormData, reset } = useBlogStore();
    
    const {
        handleSubmit,
        formState: { errors },
    } = useForm<BlogPostData>({
        resolver: zodResolver(blogPostSchema),
        values: formData,
    });

    const [mode, setMode] = useState<'edit' | 'preview' | 'split'>('split');

    // 로컬 스토리지에서 자동 저장된 내용 불러오기
    useEffect(() => {
        const saved = localStorage.getItem(DRAFT_KEY);
        if (saved) {
            try {
                const draft = JSON.parse(saved);
                setFormData(draft);
            } catch (e) {
                console.error('Failed to parse saved draft', e);
            }
        }
    }, [setFormData]);

    // 자동 저장 (데이터 변경 시, 디바운스)
    useEffect(() => {
        const handler = setTimeout(() => {
            localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
        }, 500);
        return () => clearTimeout(handler);
    }, [formData]);

    const onSave = (data: BlogPostData) => {
        console.log('Saving data:', data);
        alert('글이 성공적으로 저장되었습니다! (Mock)');
        localStorage.removeItem(DRAFT_KEY);
        reset();
        navigate('/blog');
    };

    const handleSaveClick = () => {
        handleSubmit(onSave)();
        if (Object.keys(errors).length > 0) {
            const firstError = Object.values(errors)[0];
            if (firstError?.message) {
                alert(firstError.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#F3F3F3] pb-20">
            {/* 상단 네비게이션 */}
            <div className="sticky top-0 z-50 px-6 py-4">
                <nav className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl px-6 py-3 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/blog')}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                aria-label="Go back"
                            >
                                <ArrowLeft size={20} className="text-gray-600"/>
                            </button>
                            <h1 className="font-bold text-gray-900 hidden sm:block">Write New Post</h1>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="bg-gray-100 p-1 rounded-xl flex mr-2">
                                <button
                                    onClick={() => setMode('edit')}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                                        mode === 'edit' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                                    }`}
                                >
                                    <Edit3 size={16}/> Edit
                                </button>
                                <button
                                    onClick={() => setMode('split')}
                                    className={`hidden md:flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                                        mode === 'split' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                                    }`}
                                >
                                    <div className="flex gap-0.5">
                                        <div className="w-1.5 h-3 border-r border-current"></div>
                                        <div className="w-1.5 h-3"></div>
                                    </div>
                                    Split
                                </button>
                                <button
                                    onClick={() => setMode('preview')}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                                        mode === 'preview' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                                    }`}
                                >
                                    <Eye size={16}/> Preview
                                </button>
                            </div>
                            <button
                                onClick={handleSaveClick}
                                className={`${COMMON_STYLES.primaryButton} px-6 py-2 text-sm shadow-indigo-200`}
                            >
                                <Save size={18}/> Publish
                            </button>
                        </div>
                    </div>
                </nav>
            </div>

            <main className="max-w-[1600px] mx-auto mt-4 px-6">
                <AnimatePresence mode="wait">
                    {mode === 'split' ? (
                        <motion.div
                            key="split-pane"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-140px)]"
                        >
                            <EditorPanel
                                className={`${GLASS_STYLES.card} bg-white/70`}
                                isCompact
                            />
                            <PreviewPanel
                                className={`${GLASS_STYLES.card} bg-white/80`}
                                showLiveBadge
                            />
                        </motion.div>
                    ) : mode === 'edit' ? (
                        <motion.div
                            key="edit-pane"
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col"
                        >
                            <EditorPanel
                                className={`${GLASS_STYLES.card} bg-white/70 h-full`}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="preview-pane"
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col"
                        >
                            <PreviewPanel
                                className={`${GLASS_STYLES.card} bg-white/80 h-full`}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
