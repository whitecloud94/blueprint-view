import {Copy, Plus} from 'lucide-react';
import {useState} from "react";
import {COMMON_STYLES} from "../../../constants/styles.ts";
import {LiquidToast} from "../../../components/common/feedback/LiquidToast.tsx";

const STATUS_CONFIG = {
    RUNTIME: {
        code: "RUNTIME",
        comment: "재직 중",
        description: "2025.01.02 ~",
        dotClass: "bg-indigo-500 animate-pulse",
        pingClass: "bg-indigo-400",
        badgeClass: "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800/50",
    },
    COMPILE: {
        code: "COMPILE",
        comment: "구직 중",
        description: "새로운 도약을 위해 빌드 중 (Open to Work)",
        dotClass: "bg-emerald-500 animate-bounce",
        pingClass: "bg-emerald-400",
        badgeClass: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/50",
    },
    DEBUG: {
        code: "DEBUG",
        comment: "학습 중",
        description: "기존 로직 개선 및 새로운 기술 스택 학습 중",
        dotClass: "bg-amber-500",
        pingClass: "bg-amber-400",
        badgeClass: "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800/50",
    }
};

const STYLES = {
    wrapper: "mb-10 sm:mb-14 relative",
    sectionHeader: "flex justify-between items-center mb-8",
    sectionTitle: COMMON_STYLES.sectionHeader,
    dot: COMMON_STYLES.dot,
    content: "flex flex-col-reverse sm:flex-row justify-between items-center sm:items-start gap-8 sm:gap-4 text-center sm:text-left",
    mainContent: "space-y-6 w-full",
    textGroup: "space-y-3",
    title: `text-[32px] sm:text-[42px] leading-tight ${COMMON_STYLES.title} font-title text-[#1A1A1A] dark:text-white`,
    description: `${COMMON_STYLES.body} dark:text-gray-400 text-[15px] sm:text-[17px] leading-[1.6] max-w-[380px] mx-auto sm:mx-0 font-sans font-medium`,
    highlight: "relative ml-1.5 inline-block",
    highlightText: "relative z-10 text-indigo-600 dark:text-indigo-400 font-bold",
    highlightBg: "absolute bottom-0.5 left-0 w-full h-[8px] bg-indigo-50 dark:bg-indigo-900/30 -rotate-1",
    buttonGroup: "flex justify-center sm:justify-start gap-3 pt-2",
    primaryButton: `${COMMON_STYLES.primaryButton} dark:bg-white dark:text-black px-5 py-3 text-[12px] sm:text-[13px] hover:-translate-y-0.5`,
    primaryButtonIcon: "bg-white/20 dark:bg-black/10 rounded-full p-0.5",
    secondaryButton: `${COMMON_STYLES.secondaryButton} dark:bg-black/40 dark:border-white/10 dark:text-white px-5 py-3 text-[12px] sm:text-[13px]`,
    avatarWrapper: "flex flex-col items-center gap-4 flex-shrink-0 w-[160px] sm:w-[220px]",
    avatarContainer: "relative",
    avatarImage: "w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#F2F2F2] dark:bg-gray-800 border-[4px] sm:border-[6px] border-[#FAFAFA] dark:border-white/10 overflow-hidden shadow-inner",
    profileImg: "!block !w-full !h-full !max-w-none !m-0 object-cover object-top scale-150",
    statusWrapper: "flex flex-col items-center gap-2",
    badge: "group px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide flex items-center justify-center gap-1.5 border shadow-sm transition-all duration-500 ease-in-out cursor-help overflow-hidden min-w-[120px] max-w-[140px] sm:hover:max-w-[280px]",
    badgeLayout: "flex flex-col items-center gap-2 w-full font-mono tracking-tight",
    badgeContainer: "h-8 flex items-center justify-center w-full",
    statusIndicator: "relative flex items-center justify-center w-2.5 h-2.5",
    statusPing: "absolute w-full h-full rounded-full opacity-75 animate-ping",
    statusDot: "relative w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)]",
    statusCode: "shrink-0 uppercase",
    statusDetail: "flex items-center gap-1.5 max-w-0 opacity-0 transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap sm:group-hover:max-w-[160px] sm:group-hover:opacity-100",
    statusCommentPrefix: "text-current opacity-30 ml-1",
    statusComment: "font-medium text-[9px] sm:text-[11px] text-[#629755]",
    statusDesc: "text-[10px] text-gray-400 dark:text-gray-500 font-medium tracking-tight",
};

export const Hero = () => {
    // 현재 상태 TODO - (추후 useState 등으로 관리)
    const [isExpanded, setIsExpanded] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleCopyEmail = () => {
        if (showToast) return; // 이미 토스트가 떠있으면 중복 방지
        navigator.clipboard.writeText(import.meta.env.VITE_CONTACT_EMAIL).then(() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500); 
        });
    };

    const status = STATUS_CONFIG.RUNTIME;

    return (
        <section id="about" className={STYLES.wrapper}>
            <div className={STYLES.sectionHeader}>
                <div className={STYLES.sectionTitle}>
                    <div className={STYLES.dot}/>
                    Developer
                </div>
            </div>

            <div className={STYLES.content}>
                <div className={STYLES.mainContent}>
                    <div className={STYLES.textGroup}>
                        <h1 className={STYLES.title}>
                            안녕하세요,<br/>
                            <span className="text-indigo-600">성장을 꿈꾸는</span><br/>
                            김대경 입니다.
                        </h1>
                        <p className={STYLES.description}>
                            현상의
                            <span className={STYLES.highlight}>
                                <span className={STYLES.highlightText}>본질 </span>
                                <span className={STYLES.highlightBg}></span>
                            </span>
                            에 집중하며, 단순한 코드가 아닌 '가치'를 사용자에게 전달하고자 노력합니다. 
                            끊임없는 호기심으로 더 나은 해결책을 탐구하고 기록하는 여정을 즐깁니다.
                        </p>
                    </div>

                    <div className={STYLES.buttonGroup}>
                        <button className={STYLES.primaryButton}>
                            <div className={STYLES.primaryButtonIcon}>
                                <Plus size={10} strokeWidth={4}/>
                            </div>
                            Hire Me
                        </button>
                        <button
                            className={STYLES.secondaryButton}
                            onClick={handleCopyEmail}
                        >
                            <Copy size={14}/> Copy Email
                        </button>
                        <LiquidToast isVisible={showToast} message="이메일 주소가 복사되었습니다"/>
                    </div>
                </div>

                <div className={STYLES.avatarWrapper}>
                    <div className={STYLES.avatarContainer}>
                        <div className={STYLES.avatarImage}>
                            <img
                                src="/MyPhoto.jpg"
                                alt="Profile"
                                className={STYLES.profileImg}
                            />
                        </div>
                    </div>

                    {/* 배지 영역 레이아웃 격리 */}
                    <div className={STYLES.badgeLayout}>
                        <div className={STYLES.badgeContainer}>
                            <div
                                className={`
                                    ${STYLES.badge} ${status.badgeClass} 
                                    ${isExpanded ? '!max-w-[320px]' : ''}
                                `}
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                <div className={STYLES.statusIndicator}>
                                    <div className={`${STYLES.statusPing} ${status.pingClass}`}/>
                                    <div className={`${STYLES.statusDot} ${status.dotClass}`}/>
                                </div>

                                <span className={STYLES.statusCode}>{status.code}</span>

                                <div className={`
                                    ${STYLES.statusDetail}
                                    ${isExpanded ? '!max-w-[180px] !opacity-100' : ''}
                                `}>
                                    <span className={STYLES.statusCommentPrefix}>//</span>
                                    <span className={STYLES.statusComment}>{status.comment}</span>
                                </div>
                            </div>
                        </div>

                        <span className={STYLES.statusDesc}>{status.description}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};