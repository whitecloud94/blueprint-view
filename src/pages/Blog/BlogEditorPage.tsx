import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {GLASS_STYLES} from '../../constants/styles';
import EditorPanel from '../../features/blog/editor/EditorPanel';
import EditorPreview from '../../features/blog/editor/EditorPreview.tsx';
import {EditorHeader} from '../../features/blog/editor/EditorHeader';
import {useBlogStore} from '../../store/useBlogStore';
import {blogPostSchema, BlogPostData} from '../../features/blog/schemas/blog';

const DRAFT_KEY = 'blog-draft';

export default function BlogEditorPage() {
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
            <EditorHeader mode={mode} setMode={setMode} onSave={handleSaveClick} />

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
                            <EditorPreview
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
                            <EditorPreview
                                className={`${GLASS_STYLES.card} bg-white/80 h-full`}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
