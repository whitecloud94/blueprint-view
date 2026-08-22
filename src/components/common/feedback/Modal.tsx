import {BookOpen, X} from "lucide-react";
import {useEffect} from "react";
import {createPortal} from "react-dom";
import {motion} from "framer-motion";
import {COMMON_STYLES} from "../../../constants/styles.ts";
import {Project} from "../../../types";
import {TagChip} from "../../../features/blog/components/TagChip.tsx";
import {useBlogNavigation} from "../../../features/blog/hooks/useBlogNavigation.ts";
import {findTagsForTechStack} from "../../../features/blog/utils/techTag.ts";

const MODAL_STYLES = {
    overlay: "fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/50 dark:bg-black/70 backdrop-blur-[5px]",

    container: `
        relative w-full max-w-2xl max-h-[90vh] overflow-y-auto
        bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-[80px] border border-white/60 dark:border-white/10
        rounded-[40px] sm:rounded-[48px]
        flex flex-col scrollbar-hide
        shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-none
    `,

    header: `sticky top-0 z-10 px-8 sm:px-12 py-8 sm:py-10 flex justify-between items-start bg-white/40 dark:bg-white/5 backdrop-blur-2xl border-b border-black/5 dark:border-white/10`,
    headerLeft: "flex-1 pr-6",
    badgeWrapper: "flex items-center gap-2 mb-2 sm:mb-3",
    badgeDot: COMMON_STYLES.dot,
    badgeLabel: `${COMMON_STYLES.badgeText} text-gray-400 dark:text-white/40`,
    title: `${COMMON_STYLES.modalTitle} mb-3`,
    periodWrapper: "inline-flex items-center px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/20 backdrop-blur-md",
    period: "text-[11px] sm:text-[12px] font-black text-gray-700 dark:text-white/90 tracking-[0.1em] flex items-center gap-2",
    periodDot: "w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400",
    closeButton: "w-9 h-9 sm:w-10 sm:h-10 bg-black/5 dark:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-gray-500 dark:text-white/60 border border-black/5 dark:border-white/20 transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/20 hover:text-gray-900 dark:hover:text-white hover:scale-110 active:scale-95 p-3 group",

    content: "px-8 sm:px-12 py-10 sm:py-14 space-y-12",
    section: "relative",
    sectionTitle: `${COMMON_STYLES.sectionHeader} mb-5`,
    bodyText: COMMON_STYLES.modalBody,
    achievementList: "space-y-5",
    achievementItem: "flex gap-4 group",
    achievementDot: "mt-2.5 w-1.5 h-1.5 rounded-full bg-black/10 dark:bg-white/20 group-hover:bg-indigo-500 dark:group-hover:bg-white/60 transition-colors shrink-0",

    tagWrapper: "flex flex-wrap gap-3 mt-4",
    tag: `
        relative overflow-hidden
        bg-black/5 dark:bg-white/10 backdrop-blur-md
        border border-black/5 dark:border-white/20
        px-4 py-2 rounded-xl
        text-gray-700 dark:text-white/90 text-[11px] sm:text-[12px]
        font-bold tracking-wider
        transition-all duration-300
        hover:bg-black/10 dark:hover:bg-white/20 hover:border-black/10 dark:hover:border-white/40 hover:scale-105
        hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_25px_-5px_rgba(255,255,255,0.2)]
        cursor-default
        group/tag
    `,
    tagInner: "relative z-10 flex items-center gap-1.5",
    tagDot: "w-1 h-1 rounded-full bg-indigo-500 dark:bg-indigo-400 group-hover/tag:bg-indigo-600 dark:group-hover/tag:bg-indigo-300 transition-colors shadow-[0_0_5px_rgba(129,140,248,0.8)]",
    tagGlow: "absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent opacity-0 group-hover/tag:opacity-100 transition-opacity duration-500",
    dot: COMMON_STYLES.dot,
};

interface ModalProps {
    project: Project;
    onClose: () => void;
}

export const Modal = ({project, onClose}: ModalProps) => {
    const {state} = useBlogNavigation();

    // 프로젝트의 기술 스택과 겹치는 태그. 겹치는 글이 없으면 빈 배열이라 섹션이 사라진다.
    // 아직 글을 쓰지 않은 프로젝트에 "관련 글" 버튼만 덩그러니 남는 것을 막는다.
    const relatedTags = state.status === 'ready'
        ? findTagsForTechStack(project.tech ?? [], state.data.tags)
        : [];

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    useEffect(() => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
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

                <header className={MODAL_STYLES.header}>
                    <div className={MODAL_STYLES.headerLeft}>
                        <div className={MODAL_STYLES.badgeWrapper}>
                            <span className={MODAL_STYLES.badgeDot}/>
                            <span className={MODAL_STYLES.badgeLabel}>PROJECT DETAILS</span>
                        </div>
                        <h2 className={MODAL_STYLES.title}>
                            {project.title}
                        </h2>
                        {project.period && (
                            <div className={MODAL_STYLES.periodWrapper}>
                                <div className={MODAL_STYLES.period}>
                                    <span className={MODAL_STYLES.periodDot}/>
                                    {project.period}
                                </div>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className={MODAL_STYLES.closeButton}
                    >
                        <X size={22} className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors"/>
                    </button>
                </header>


                <div className={MODAL_STYLES.content}>
                    <section className={MODAL_STYLES.section}>
                        <div className={MODAL_STYLES.sectionTitle}>
                            <div className={MODAL_STYLES.dot}/>
                            Main Job
                        </div>
                        <p className={MODAL_STYLES.bodyText}>
                            {project.sub}
                        </p>
                    </section>

                    {/* 2. Achievements 섹션 */}
                    <section>
                        <div className={MODAL_STYLES.sectionTitle}>
                            <div className={MODAL_STYLES.dot}/>
                            Achievements
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
                                <span key={t} className={MODAL_STYLES.tag}>
                                    <div className={MODAL_STYLES.tagGlow} />
                                    <div className={MODAL_STYLES.tagInner}>
                                        <span className={MODAL_STYLES.tagDot} />
                                        {t}
                                    </div>
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* 4. 관련 글 — 기술 스택과 겹치는 태그로 잇는다 */}
                    {relatedTags.length > 0 && (
                        <section>
                            <div className="w-full p-6 rounded-[24px] bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-400/20">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-white dark:bg-white/10 backdrop-blur-md flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                        <BookOpen size={22}/>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black text-indigo-500/70 dark:text-indigo-400/70 uppercase tracking-widest mb-0.5">
                                            Related Posts
                                        </p>
                                        <h4 className="text-[16px] font-bold text-indigo-900 dark:text-white">
                                            이 프로젝트의 기술로 쓴 글 읽어보기
                                        </h4>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {relatedTags.map((tag) => (
                                        <TagChip
                                            key={tag.slug}
                                            tag={tag}
                                            count={tag.postCount}
                                            size="md"
                                            onNavigate={onClose}
                                        />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};