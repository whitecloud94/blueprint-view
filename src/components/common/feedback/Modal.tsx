import {BookOpen} from "lucide-react";
import {useEffect} from "react";
import {createPortal} from "react-dom";
import {motion} from "framer-motion";
import {COMMON_STYLES} from "../../../constants/styles.ts";
import {Project} from "../../../types";
import {TagChip} from "../../../features/blog/components/TagChip.tsx";
import {useBlogNavigation} from "../../../features/blog/hooks/useBlogNavigation.ts";
import {findTagsForTechStack} from "../../../features/blog/utils/techTag.ts";
import {SectionMarker} from "../../../components/common/SectionMarker.tsx";
import {WindowFrame} from "../../../components/common/WindowFrame.tsx";

const MODAL_STYLES = {
    overlay: "fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/50 dark:bg-black/70 backdrop-blur-[5px]",

    // isolate + mask-image: iOS Safari가 border-radius+overflow-hidden 클리핑을
    // sticky/backdrop-filter 자식과 함께 있을 때 놓치는 버그가 있다(스크롤 바운스 중
    // 내용이 프레임 밖으로 새어 보임). transform은 framer-motion이 인라인으로 이미
    // 쓰고 있어 클래스로 덮어써봐야 no-op이라, mask-image로 강제 클리핑시킨다.
    container: `
        relative w-full max-w-2xl max-h-[90vh] overflow-hidden isolate
        [-webkit-mask-image:-webkit-radial-gradient(white,black)]
        bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-[80px] border border-white/60 dark:border-white/10
        rounded-[40px] sm:rounded-[48px]
        flex flex-col
        shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-none
    `,

    // 실제 스크롤이 일어나는 영역. 애니메이션(transform)은 container(바깥)에 있고
    // 여기는 transform이 없어야 모바일에서 sticky 헤더가 스크롤 중 좌표를 잃지 않는다.
    // overscroll-behavior-y:contain 은 상단/하단을 당겨 놓는 elastic 바운스를 막아
    // 위 클리핑 버그가 트리거되는 상황 자체를 줄인다.
    scrollArea: `flex-1 min-h-0 overflow-y-auto [overscroll-behavior-y:contain] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`,

    // sticky를 창 프레임(WindowFrame) 하나로만 둔다. sticky 요소를 두 개 층으로
    // 쌓아 서로 다른 top 오프셋으로 고정하는 구조가 iOS WebKit에서 스크롤 중
    // 좌표가 흔들리는(이전 프레임이 겹쳐 보이는) 근본 원인이었다. 헤더는 이제
    // 본문처럼 자연스럽게 스크롤되어 나간다 — 닫기 버튼은 WindowFrame으로 옮겼다.
    header: `px-8 sm:px-12 pt-6 sm:pt-8 pb-6 flex justify-between items-start bg-white/95 dark:bg-[#1A1A1A]/95 border-b border-black/5 dark:border-white/10`,
    headerLeft: "flex-1",
    badgeWrapper: "flex items-center gap-2 mb-2 sm:mb-3 font-mono",
    badgeBracket: "text-gray-300 dark:text-gray-600",
    badgeLabel: `${COMMON_STYLES.badgeText} text-gray-400 dark:text-white/40`,
    title: `${COMMON_STYLES.modalTitle} mb-3`,
    periodWrapper: "inline-flex items-center px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/20",
    period: "text-[11px] sm:text-[12px] font-black text-gray-700 dark:text-white/90 tracking-[0.1em]",

    content: "px-8 sm:px-12 py-10 sm:py-14 space-y-12",
    section: "relative",
    sectionTitle: "mb-5",
    bodyText: COMMON_STYLES.modalBody,
    achievementList: "space-y-5",
    achievementItem: "flex gap-3 group",
    achievementMarker: "mt-0.5 font-mono text-[13px] font-bold text-gray-300 dark:text-gray-600 group-hover:text-accent-500 dark:group-hover:text-accent-400 transition-colors shrink-0",

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
        // body에 overflow:hidden만 걸면 iOS WebKit에서는 배경이 터치 스크롤로
        // 계속 움직인다(잘 알려진 제약). 모달 위에서 스와이프하면 실제로는 배경
        // 페이지가 같이 스크롤되면서, 고정 오버레이·sticky 자식들의 좌표 기준이
        // 흔들려 모달 내용이 프레임 밖으로 새어 보이는 원인이었다. body를
        // position:fixed로 그 자리에 못박아야 iOS에서도 배경 스크롤이 확실히 막힌다.
        const scrollY = window.scrollY;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            window.scrollTo(0, scrollY);
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
                <div className={MODAL_STYLES.scrollArea}>
                <WindowFrame
                    filename={`project-${project.id ?? 'x'}.json`}
                    className="sticky top-0 z-20"
                    onClose={onClose}
                />

                <header className={MODAL_STYLES.header}>
                    <div className={MODAL_STYLES.headerLeft}>
                        <div className={MODAL_STYLES.badgeWrapper}>
                            <span className={MODAL_STYLES.badgeBracket}>[</span>
                            <span className={MODAL_STYLES.badgeLabel}>PROJECT DETAILS</span>
                            <span className={MODAL_STYLES.badgeBracket}>]</span>
                        </div>
                        <h2 className={MODAL_STYLES.title}>
                            {project.title}
                        </h2>
                        {project.period && (
                            <div className={MODAL_STYLES.periodWrapper}>
                                <span className={MODAL_STYLES.period}>{project.period}</span>
                            </div>
                        )}
                    </div>
                </header>


                <div className={MODAL_STYLES.content}>
                    <section className={MODAL_STYLES.section}>
                        <div className={MODAL_STYLES.sectionTitle}>
                            <SectionMarker index="01" label="Main Job"/>
                        </div>
                        <p className={MODAL_STYLES.bodyText}>
                            {project.sub}
                        </p>
                    </section>

                    {/* 2. Achievements 섹션 */}
                    <section>
                        <div className={MODAL_STYLES.sectionTitle}>
                            <SectionMarker index="02" label="Achievements"/>
                        </div>
                        <ul className={MODAL_STYLES.achievementList}>
                            {project.achievements?.map((item: string, i: number) => (
                                <li key={i} className={MODAL_STYLES.achievementItem}>
                                    <span className={MODAL_STYLES.achievementMarker}>&gt;</span>
                                    <span className={MODAL_STYLES.bodyText}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* 3. Tech Stack 섹션 */}
                    <section>
                        <div className={MODAL_STYLES.sectionTitle}>
                            <SectionMarker index="03" label="Technologies"/>
                        </div>
                        <div className={MODAL_STYLES.tagWrapper}>
                            {project.tech?.map((t: string) => (
                                <span key={t} className={MODAL_STYLES.tag}>
                                    <div className={MODAL_STYLES.tagInner}>
                                        {t}
                                    </div>
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* 4. 관련 글 — 기술 스택과 겹치는 태그로 잇는다 */}
                    {relatedTags.length > 0 && (
                        <section>
                            <div className="w-full p-6 rounded-[24px] bg-accent-50 dark:bg-accent-500/10 border border-accent-100 dark:border-accent-400/20">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-white dark:bg-white/10 backdrop-blur-md flex items-center justify-center text-accent-600 dark:text-accent-400">
                                        <BookOpen size={22}/>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black text-accent-500/70 dark:text-accent-400/70 uppercase tracking-widest mb-0.5">
                                            Related Posts
                                        </p>
                                        <h4 className="text-[16px] font-bold text-accent-900 dark:text-white">
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
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};