import {X} from "lucide-react";
import {useEffect} from "react";
import {createPortal} from "react-dom";
import {motion} from "framer-motion";
import {COMMON_STYLES} from "../../constants/styles";

const MODAL_STYLES = {
    overlay: "fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-[2px]",

    container: `
        relative w-full max-w-2xl max-h-[90vh] overflow-y-auto
        bg-white/35 backdrop-blur-[40px] border border-white/40
        rounded-[40px] sm:rounded-[48px]
        flex flex-col scrollbar-hide 
        shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.2)]
    `,

    header: `sticky top-0 z-10 px-8 sm:px-12 py-8 sm:py-10 flex justify-between items-start bg-white/10 backdrop-blur-2xl border-b border-white/20`,
    headerLeft: "flex-1 pr-6",
    badgeWrapper: "flex items-center gap-2 mb-2",
    badgeDot: "w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]",
    badgeLabel: `${COMMON_STYLES.badgeText} text-white/40`,
    title: COMMON_STYLES.modalTitle,
    closeButton: "w-9 h-9 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white/60 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 p-3 group",

    content: "px-8 sm:px-12 py-10 sm:py-14 space-y-12",
    section: "relative",
    sectionTitle: `${COMMON_STYLES.sectionHeader} mb-5 text-white/90`,
    bodyText: COMMON_STYLES.modalBody,
    achievementList: "space-y-5",
    achievementItem: "flex gap-4 group",
    achievementDot: "mt-2.5 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors shrink-0",

    tagWrapper: "flex flex-wrap gap-2.5 mt-4",
    tag: `bg-white/30 backdrop-blur-xl border border-white/40 px-4 py-2 rounded-2xl text-white text-[11px] sm:text-[12px] font-bold cursor-default`,
    dot: "w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
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
                    <div className={MODAL_STYLES.headerLeft}>
                        <div className={MODAL_STYLES.badgeWrapper}>
                            <span className={MODAL_STYLES.badgeDot}/>
                            <span className={MODAL_STYLES.badgeLabel}>PROJECT CASE STUDY</span>
                        </div>
                        <h2 className={MODAL_STYLES.title}>
                            {project.title}
                        </h2>
                    </div>
                    <button 
                        onClick={onClose} 
                        className={MODAL_STYLES.closeButton}
                    >
                        <X size={22} className="group-hover:text-white transition-colors"/>
                    </button>
                </header>

                {/* Content Area */}
                <div className={MODAL_STYLES.content}>
                    {/* 1. Overview 섹션 */}
                    <section className={MODAL_STYLES.section}>
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
                        <ul className={MODAL_STYLES.achievementList}>
                            {project.achievements?.map((item: string, i: number) => (
                                <li key={i} className={MODAL_STYLES.achievementItem}>
                                    <div className={MODAL_STYLES.achievementDot}/>
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