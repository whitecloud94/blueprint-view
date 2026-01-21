import {X} from "lucide-react";
import {useEffect} from "react";
import {createPortal} from "react-dom";
import {motion} from "framer-motion";

const MODAL_STYLES = {
    overlay: "fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md",

    container: `
        relative w-full max-w-2xl max-h-[85vh] overflow-y-auto
        bg-white/80 backdrop-blur-2xl 
        rounded-[32px] sm:rounded-[40px] border border-white/40 
        shadow-[0_40px_80px_rgba(0,0,0,0.15)]
        flex flex-col scrollbar-hide
    `,

    // 헤더: 제목 영역을 더 넓게 쓰고 여백을 충분히 확보
    header: "sticky top-0 z-10 px-6 sm:px-10 py-6 sm:py-8 flex justify-between items-start bg-white/40 backdrop-blur-xl border-b border-gray-100/30",

    // 컨텐츠: 섹션별 간격(space-y-10)을 크게 벌려 시원한 느낌 부여
    content: "px-6 sm:px-10 py-8 sm:py-12 space-y-10",

    sectionTitle: "text-[12px] sm:text-[13px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2",

    bodyText: "text-[15px] sm:text-[16px] text-gray-600 leading-[1.8] font-medium pl-1",

    tagWrapper: "flex flex-wrap gap-2 mt-2",
    tag: "px-3.5 py-1.5 rounded-full bg-indigo-50/50 text-indigo-600 text-[11px] sm:text-[12px] font-black border border-indigo-100/50 shadow-sm",
    dot: "w-1.5 h-1.5 rounded-full bg-indigo-600"
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
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"/>
                            <span className="text-[12px] font-bold text-gray-400">PROJECT DETAIL</span>
                        </div>
                        <h2 className="text-[24px] sm:text-[28px] font-black text-gray-900 leading-tight">
                            {project.title}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <X size={24} className="text-gray-400"/>
                    </button>
                </header>

                {/* Content Area */}
                <div className={MODAL_STYLES.content}>
                    {/* 1. Overview 섹션 */}
                    <section>
                        <div className={MODAL_STYLES.sectionTitle}>
                            <div className={MODAL_STYLES.dot}/>
                            Overview
                        </div>
                        <p className={MODAL_STYLES.bodyText}>
                            {project.sub}
                        </p>
                    </section>

                    {/* 2. Achievements 섹션: 성과가 돋보이도록 리스트 형태 권장 */}
                    <section>
                        <div className={MODAL_STYLES.sectionTitle}>
                            <div className={MODAL_STYLES.dot}/>
                            Key Achievements
                        </div>
                        <ul className="space-y-4 pl-1">
                            {project.achievements?.map((item: string, i: number) => (
                                <li key={i} className="flex gap-3 text-gray-600 group">
                                    <span
                                        className="text-indigo-400 font-black group-hover:text-indigo-600 transition-colors mt-0.5">•</span>
                                    <span className={MODAL_STYLES.bodyText}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* 3. Tech Stack 섹션: 태그 형태로 시각화 */}
                    <section>
                        <div className={MODAL_STYLES.sectionTitle}>
                            <div className={MODAL_STYLES.dot}/>
                            Tech Stack
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