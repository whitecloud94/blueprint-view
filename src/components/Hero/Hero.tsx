import {Copy, Plus} from 'lucide-react';

const STATUS_CONFIG = {
    RUNTIME: {
        code: "RUNTIME",
        comment: "근무 중",
        description: "2025.01.02 ~",
        dotClass: "bg-indigo-500 animate-pulse",
        badgeClass: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    COMPILE: {
        code: "COMPILE",
        comment: "파트너 구함",
        description: "새로운 도약을 위해 빌드 중 (Open to Work)",
        dotClass: "bg-emerald-500 animate-bounce",
        badgeClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    DEBUG: {
        code: "DEBUG",
        comment: "기술 고도화",
        description: "기존 로직 개선 및 새로운 기술 스택 학습 중",
        dotClass: "bg-amber-500",
        badgeClass: "bg-amber-50 text-amber-600 border-amber-100",
    }
};

const STYLES = {
    wrapper: "mb-10 sm:mb-14 relative",
    sectionHeader: "flex justify-between items-center mb-8",
    sectionTitle: "flex items-center gap-2 text-[13px] sm:text-[14px] text-gray-400 font-medium",
    dot: "w-1.5 h-1.5 rounded-full bg-gray-300",
    content: "flex flex-col-reverse sm:flex-row justify-between items-center sm:items-start gap-8 sm:gap-4 text-center sm:text-left",
    mainContent: "space-y-6 w-full",
    textGroup: "space-y-3",
    title: "text-[32px] sm:text-[42px] font-bold tracking-tight text-[#1A1A1A] leading-tight",
    description: "text-gray-500 text-[15px] sm:text-[17px] leading-[1.6] max-w-[380px] mx-auto sm:mx-0",
    highlight: "relative ml-1.5 inline-block",
    highlightText: "relative z-10 text-indigo-600 font-bold italic",
    highlightBg: "absolute bottom-0.5 left-0 w-full h-[8px] bg-indigo-50 -rotate-1",
    buttonGroup: "flex justify-center sm:justify-start gap-3 pt-2",
    primaryButton: "bg-[#1A1A1A] text-white px-5 py-3 rounded-[16px] sm:rounded-[18px] text-[12px] sm:text-[13px] font-bold flex items-center gap-2 shadow-xl shadow-black/10 hover:bg-black transition-all hover:-translate-y-0.5",
    primaryButtonIcon: "bg-white/20 rounded-full p-0.5",
    secondaryButton: "bg-white border border-gray-200 text-[#1A1A1A] px-5 py-3 rounded-[16px] sm:rounded-[18px] text-[12px] sm:text-[13px] font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors",
    avatarWrapper: "flex flex-col items-center gap-4 flex-shrink-0",
    avatarContainer: "relative",
    avatarImage: "w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#F2F2F2] border-[4px] sm:border-[6px] border-[#FAFAFA] overflow-hidden shadow-inner",
    profileImg: "w-full h-full object-cover object-center",
    statusWrapper: "flex flex-col items-center gap-2",
    badge: "group px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide flex items-center gap-1.5 border shadow-sm transition-all duration-500 ease-in-out cursor-help overflow-hidden max-w-[130px] hover:max-w-[220px]",
    statusIndicator: "relative flex items-center justify-center w-2.5 h-2.5",
    statusPing: "absolute w-full h-full rounded-full opacity-75 animate-ping",
    statusDot: "relative w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)]",
    statusCode: "shrink-0 uppercase",
    statusDetail: "flex items-center gap-1.5 max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap",
    statusCommentPrefix: "text-current opacity-30 ml-1",
    statusComment: "font-medium",
    statusDesc: "text-[10px] text-gray-400 font-medium tracking-tight",
};

export const Hero = () => {
    // 현재 상태 TODO - (추후 useState 등으로 관리)
    const status = STATUS_CONFIG.RUNTIME;

    const getPingColor = (code: string) => {
        switch (code) {
            case 'RUNTIME': return 'bg-indigo-400';
            case 'COMPILE': return 'bg-emerald-400';
            default: return 'bg-amber-400';
        }
    };

    return (
        <section className={STYLES.wrapper}>
            {/* Section Header */}
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
                            Hi,<br/> I’m Daekyoung KIM
                        </h1>
                        <p className={STYLES.description}>
                            Software Engineer focused on turning complex problems into simple, functional code.
                            Currently crafting experiences as a
                            <span className={STYLES.highlight}>
                                <span className={STYLES.highlightText}>freelancer.</span>
                                <span className={STYLES.highlightBg}></span>
                            </span>
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
                            onClick={() => navigator.clipboard.writeText('your-email@example.com')}
                        >
                            <Copy size={14}/> Copy Email
                        </button>
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

                    <div className={STYLES.statusWrapper}>
                        <div className={`${STYLES.badge} ${status.badgeClass}`}>
                            <div className={STYLES.statusIndicator}>
                                <div className={`${STYLES.statusPing} ${getPingColor(status.code)}`}/>
                                <div className={`${STYLES.statusDot} ${status.dotClass}`}/>
                            </div>

                            <span className={STYLES.statusCode}>{status.code}</span>

                            <div className={STYLES.statusDetail}>
                                <span className={STYLES.statusCommentPrefix}>//</span>
                                <span className={STYLES.statusComment}>{status.comment}</span>
                            </div>
                        </div>

                        <span className={STYLES.statusDesc}>
                            {status.description}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};