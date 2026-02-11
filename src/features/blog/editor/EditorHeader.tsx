import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, Eye, Save } from 'lucide-react';
import { COMMON_STYLES } from '../../../constants/styles';

interface EditorHeaderProps {
    mode: 'edit' | 'preview' | 'split';
    setMode: (mode: 'edit' | 'preview' | 'split') => void;
    onSave: () => void;
}

export const EditorHeader = ({ mode, setMode, onSave }: EditorHeaderProps) => {
    const navigate = useNavigate();

    return (
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
                            onClick={onSave}
                            className={`${COMMON_STYLES.primaryButton} px-6 py-2 text-sm shadow-indigo-200`}
                        >
                            <Save size={18}/> Publish
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};
