import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, Eye, FileText, Send } from 'lucide-react';
import { COMMON_STYLES } from '../../../constants/styles';

interface EditorHeaderProps {
    mode: 'edit' | 'preview' | 'split';
    setMode: (mode: 'edit' | 'preview' | 'split') => void;
    /** 비공개 상태로 저장 */
    onSaveDraft: () => void;
    /** 공개 상태로 저장 */
    onPublish: () => void;
    isSubmitting?: boolean;
    /** 기존 글 수정 중인지 여부. 제목 표기에만 쓰인다. */
    isEditMode?: boolean;
}

export const EditorHeader = ({
    mode,
    setMode,
    onSaveDraft,
    onPublish,
    isSubmitting = false,
    isEditMode = false,
}: EditorHeaderProps) => {
    const navigate = useNavigate();

    return (
        <div className="sticky top-0 z-50 px-6 py-4">
            <nav className="max-w-5xl mx-auto bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl px-6 py-3 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/blog')}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                            aria-label="Go back"
                        >
                            <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300"/>
                        </button>
                        <h1 className="font-bold text-gray-900 dark:text-white hidden sm:block">
                            {isEditMode ? '글 수정' : '새 글 작성'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="bg-gray-100 dark:bg-white/5 p-1 rounded-xl flex mr-2">
                            <button
                                onClick={() => setMode('edit')}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                                    mode === 'edit' ? 'bg-white dark:bg-white/10 shadow-sm dark:shadow-none text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'
                                }`}
                            >
                                <Edit3 size={16}/> Edit
                            </button>
                            <button
                                onClick={() => setMode('split')}
                                className={`hidden md:flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                                    mode === 'split' ? 'bg-white dark:bg-white/10 shadow-sm dark:shadow-none text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'
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
                                    mode === 'preview' ? 'bg-white dark:bg-white/10 shadow-sm dark:shadow-none text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'
                                }`}
                            >
                                <Eye size={16}/> Preview
                            </button>
                        </div>
                        {/* 저장과 공개를 분리한다. 하나의 버튼만 두면 쓰다 만 글이
                            그대로 공개되는 것 외에 선택지가 없다. */}
                        <button
                            onClick={onSaveDraft}
                            disabled={isSubmitting}
                            className={`${COMMON_STYLES.secondaryButton} dark:bg-white/10 dark:text-white dark:border-white/15 px-4 py-2 text-sm disabled:opacity-50`}
                        >
                            <FileText size={16}/> 임시저장
                        </button>
                        <button
                            onClick={onPublish}
                            disabled={isSubmitting}
                            className={`${COMMON_STYLES.primaryButton} dark:bg-white dark:text-black px-6 py-2 text-sm shadow-indigo-200 dark:shadow-none disabled:opacity-50`}
                        >
                            <Send size={16}/> 발행
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};
