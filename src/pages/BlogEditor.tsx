import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
    Save,
    Eye,
    Edit3,
    ArrowLeft,
    Tag as TagIcon,
    Link as LinkIcon,
    X,
    ChevronDown
} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {GLASS_STYLES, COMMON_STYLES} from '../constants/styles';
import {PROJECTS} from '../data';

export default function BlogEditor() {
    const navigate = useNavigate();
    const [mode, setMode] = useState<'edit' | 'preview' | 'split'>('split');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState('');
    const [relatedProjectId, setRelatedProjectId] = useState<number | null>(null);

    // 로컬 스토리지에서 자동 저장된 내용 불러오기
    useEffect(() => {
        const saved = localStorage.getItem('blog-draft');
        if (saved) {
            const {title, content, tags, relatedProjectId} = JSON.parse(saved);
            setTitle(title || '');
            setContent(content || '');
            setTags(tags || []);
            setRelatedProjectId(relatedProjectId || null);
        }
    }, []);

    // 자동 저장
    useEffect(() => {
        const draft = {title, content, tags, relatedProjectId};
        localStorage.setItem('blog-draft', JSON.stringify(draft));
    }, [title, content, tags, relatedProjectId]);

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && currentTag.trim()) {
            if (!tags.includes(currentTag.trim())) {
                setTags([...tags, currentTag.trim()]);
            }
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(t => t !== tagToRemove));
    };

    const handleSave = () => {
        alert('글이 성공적으로 저장되었습니다! (Mock)');
        localStorage.removeItem('blog-draft');
        navigate('/blog');
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
                                onClick={handleSave}
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
                            {/* Left: Editor */}
                            <div className={`${GLASS_STYLES.card} flex flex-col bg-white/70 overflow-hidden`}>
                                <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
                                    <input
                                        type="text"
                                        placeholder="Enter post title..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full text-2xl font-black bg-transparent border-none outline-none placeholder:text-gray-300 text-gray-900"
                                    />
                                    <div className="flex gap-2 shrink-0 ml-4">
                                        <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg border border-gray-100 text-[10px] font-bold text-gray-400">
                                            <TagIcon size={12}/> {tags.length} Tags
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                                    <textarea
                                        placeholder="Write your story using Markdown..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="w-full h-full bg-transparent border-none outline-none resize-none text-lg leading-relaxed text-gray-700 placeholder:text-gray-300 min-h-[500px]"
                                    />
                                </div>
                            </div>

                            {/* Right: Preview */}
                            <div className={`${GLASS_STYLES.card} flex flex-col bg-white/80 overflow-hidden`}>
                                <div className="p-6 border-b border-gray-100 bg-gray-50/50 shrink-0">
                                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Live Preview</h2>
                                </div>
                                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                    <div className="prose prose-indigo prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
                                        <h1 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
                                            {title || 'Untitled Post'}
                                        </h1>
                                        {content ? (
                                            <ReactMarkdown 
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    h1: ({node, ...props}) => <h1 className="text-4xl font-black text-gray-900 mt-12 mb-6" {...props} />,
                                                    h2: ({node, ...props}) => <h2 className="text-3xl font-black text-gray-900 mt-10 mb-4" {...props} />,
                                                    h3: ({node, ...props}) => <h3 className="text-2xl font-black text-gray-900 mt-8 mb-3" {...props} />,
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
                                                    }
                                                }}
                                            >
                                                {content}
                                            </ReactMarkdown>
                                        ) : (
                                            <p className="text-gray-300 italic">Preview will appear here...</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : mode === 'edit' ? (
                        <motion.div
                            key="edit-pane"
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            className="max-w-4xl mx-auto space-y-6 h-[calc(100vh-140px)] flex flex-col"
                        >
                            {/* 메인 에디터 카드 */}
                            <div className={`${GLASS_STYLES.card} flex-1 flex flex-col bg-white/70 overflow-hidden`}>
                                <div className="p-8 space-y-6 shrink-0">
                                    <input
                                        type="text"
                                        placeholder="Enter post title..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full text-4xl font-black bg-transparent border-none outline-none placeholder:text-gray-300 text-gray-900"
                                    />

                                    <div className="flex flex-wrap gap-4 items-center border-y border-gray-100 py-4">
                                        {/* 프로젝트 연동 */}
                                        <div className="relative group">
                                            <div className="flex items-center gap-2 text-sm font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                                                <LinkIcon size={14}/>
                                                <select
                                                    value={relatedProjectId || ''}
                                                    onChange={(e) => setRelatedProjectId(Number(e.target.value) || null)}
                                                    className="bg-transparent outline-none cursor-pointer appearance-none pr-6"
                                                >
                                                    <option value="">No Related Project</option>
                                                    {PROJECTS.map(p => (
                                                        <option key={p.id} value={p.id}>{p.title}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown size={14} className="absolute right-2 pointer-events-none"/>
                                            </div>
                                        </div>

                                        {/* 태그 입력 */}
                                        <div className="flex flex-wrap gap-2 items-center flex-1">
                                            <div className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg border border-indigo-100">
                                                <TagIcon size={14}/>
                                                <input
                                                    type="text"
                                                    placeholder="Add tag..."
                                                    value={currentTag}
                                                    onChange={(e) => setCurrentTag(e.target.value)}
                                                    onKeyDown={handleAddTag}
                                                    className="bg-transparent outline-none text-sm font-bold w-20 placeholder:text-indigo-300"
                                                />
                                            </div>
                                            {tags.map(tag => (
                                                <span 
                                                    key={tag}
                                                    className="flex items-center gap-1 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-bold text-gray-600 shadow-sm"
                                                >
                                                    #{tag}
                                                    <button onClick={() => removeTag(tag)} className="hover:text-red-500">
                                                        <X size={12}/>
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
                                    <textarea
                                        placeholder="Write your story using Markdown..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="w-full h-full bg-transparent border-none outline-none resize-none text-lg leading-relaxed text-gray-700 placeholder:text-gray-300 min-h-[400px]"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="preview-pane"
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            className={`${GLASS_STYLES.card} max-w-4xl mx-auto bg-white/80 h-[calc(100vh-140px)] flex flex-col overflow-hidden`}
                        >
                            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                                <div className="max-w-3xl mx-auto">
                                    {relatedProjectId && (
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-wider mb-6">
                                            <LinkIcon size={12}/>
                                            Related Project: {PROJECTS.find(p => p.id === relatedProjectId)?.title}
                                        </div>
                                    )}
                                    <h1 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
                                        {title || 'Untitled Post'}
                                    </h1>
                                    <div className="flex gap-2 mb-10">
                                        {tags.map(tag => (
                                            <span key={tag} className="text-sm font-bold text-indigo-500">#{tag}</span>
                                        ))}
                                    </div>
                                    <div className="prose prose-indigo prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
                                        {content ? (
                                            <ReactMarkdown 
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    h1: ({node, ...props}) => <h1 className="text-4xl font-black text-gray-900 mt-12 mb-6" {...props} />,
                                                    h2: ({node, ...props}) => <h2 className="text-3xl font-black text-gray-900 mt-10 mb-4" {...props} />,
                                                    h3: ({node, ...props}) => <h3 className="text-2xl font-black text-gray-900 mt-8 mb-3" {...props} />,
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
                                                    }
                                                }}
                                            >
                                                {content}
                                            </ReactMarkdown>
                                        ) : (
                                            <p className="text-gray-300 italic">No content yet...</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
