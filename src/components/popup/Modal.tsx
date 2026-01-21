import {X} from "lucide-react";
import {useEffect} from "react";
import {createPortal} from "react-dom";
import {motion} from "framer-motion";
import {COMMON_STYLES} from "../../constants/styles";

const MODAL_STYLES = {
    overlay: "fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/30 backdrop-blur-[6px]",

    container: `
        relative w-full max-w-2xl max-h-[90vh] overflow-y-auto
        ${COMMON_STYLES.liquidGlass}
        rounded-[40px] sm:rounded-[48px]
        flex flex-col scrollbar-hide
    `,

    header: "sticky top-0 z-10 px-8 sm:px-12 py-8 sm:py-10 flex justify-between items-start bg-white/20 backdrop-blur-2xl border-b border-white/40",

    content: "px-8 sm:px-12 py-10 sm:py-14 space-y-12",

    sectionTitle: "text-[11px] sm:text-[12px] font-black text-indigo-600 uppercase tracking-[0.25em] mb-5 flex items-center gap-2.5 opacity-80",

    bodyText: "text-[16px] sm:text-[17px] text-gray-700 leading-[1.85] font-medium tracking-tight",

    tagWrapper: "flex flex-wrap gap-2.5 mt-4",
    tag: "px-4 py-2 rounded-2xl bg-white/50 text-indigo-700 text-[11px] sm:text-[12px] font-bold border border-white/80 shadow-sm backdrop-blur-md hover:bg-indigo-50/50 transition-colors cursor-default",
    dot: "w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
};

interface ModalProps {
    project: any;
    onClose: () => void;
}

export const Modal = ({project, onClose}: ModalProps) => {
    if (!project) return null;

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return createPortal(
        <motion.div
            className={MODAL_STYLES.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className={MODAL_STYLES.container}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                        type: "spring",
                        damping: 20,
                        stiffness: 250,
                        mass: 0.8
                    }
                }}
                exit={{
                    opacity: 0,
                    scale: 0.95,
                    y: 10,
                    transition: { duration: 0.2 }
                }}
                onClick={e => e.stopPropagation()}
            >

                {/* Header: 제목 및 닫기 버튼 */}
                <header className={MODAL_STYLES.header}>
                    <div className="flex-1 pr-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]"/>
                            <span className="text-[11px] font-black text-gray-400 tracking-widest">PROJECT CASE STUDY</span>
                        </div>
                        <h2 className="text-[28px] sm:text-[36px] font-black text-gray-900 leading-[1.1] tracking-tight">
                            {project.title}
                        </h2>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-3 bg-white/40 hover:bg-white/80 border border-white/60 rounded-2xl transition-all duration-300 shadow-sm group active:scale-95"
                    >
                        <X size={22} className="text-gray-500 group-hover:text-black transition-colors"/>
                    </button>
                </header>

                {/* Content Area */}
                <div className={MODAL_STYLES.content}>
                    {/* 1. Overview 섹션 */}
                    <section className="relative">
                        <div className={MODAL_STYLES.sectionTitle}>
                            <div className={MODAL_STYLES.dot}/>
                            Briefing
                        </div>
                        <p className={MODAL_STYLES.bodyText}>
                            {project.sub}
                        </p>
                    </section>

                    {/* 2. Achievements 섹션 */}
                    <section>
                        <div className={MODAL_STYLES.sectionTitle}>
                            <div className={MODAL_STYLES.dot}/>
                            Key Solutions
                        </div>
                        <ul className="space-y-5">
                            {project.achievements?.map((item: string, i: number) => (
                                <li key={i} className="flex gap-4 group">
                                    <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-indigo-200 group-hover:bg-indigo-500 transition-colors shrink-0"/>
                                    <span className={MODAL_STYLES.bodyText}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* 3. Tech Stack 섹션 */}
                    <section>
                        <div className={MODAL_STYLES.sectionTitle}>
                            <div className={MODAL_STYLES.dot}/>
                            Technologies
                        </div>
                        <div className={MODAL_STYLES.tagWrapper}>
                            {project.tech?.map((t: string) => (
                                <span key={t} className={MODAL_STYLES.tag}>{t}</span>
                            ))}
                        </div>
                    </section>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};