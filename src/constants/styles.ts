export const COMMON_STYLES = {
    glass: "bg-white/60 dark:bg-white/[0.05] backdrop-blur-xl border border-white/40 dark:border-white/[0.1] shadow-sm",
    glassMuted: "bg-white/40 dark:bg-white/[0.03] backdrop-blur-lg border border-white/30 dark:border-white/[0.05] shadow-sm",
    glassDark: "bg-gray-900/80 dark:bg-white/95 backdrop-blur-xl border border-white/10 dark:border-black/10 shadow-lg text-white dark:text-black",
    liquidGlass: "bg-white/20 dark:bg-white/[0.05] backdrop-blur-2xl border border-white/30 dark:border-white/[0.1]",

    card: "rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl shadow-gray-200/50 dark:shadow-none bg-white dark:bg-white/[0.02]",
    innerCard: "bg-white/50 dark:bg-white/[0.05] backdrop-blur-md border border-white/60 dark:border-white/[0.1] rounded-[20px] sm:rounded-[24px] transition-all duration-300",

    title: "font-black tracking-tight text-gray-900 dark:text-white",
    body: "font-medium text-gray-600 dark:text-gray-400",
    
    // Section Headers
    sectionHeader: "flex items-center gap-2 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-indigo-500",
    dot: "w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]",

    // Typography
    modalTitle: "text-[28px] sm:text-[36px] font-black text-white leading-[1.1] tracking-tight",
    modalBody: "text-[16px] sm:text-[17px] text-white/80 leading-[1.85] font-medium tracking-tight",
    badgeText: "text-[11px] font-black tracking-widest",

    // Buttons
    primaryButton: "bg-gray-900 text-white rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/20 active:scale-95",
    secondaryButton: "bg-white/80 backdrop-blur-md border border-gray-200 text-gray-900 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-white hover:border-gray-300 active:scale-95 shadow-sm",

    // Interactive
    iconButton: "w-9 h-9 sm:w-10 sm:h-10 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 border border-white/60 transition-all duration-300 hover:shadow-lg hover:scale-110 active:scale-95",
};

export const GLASS_STYLES = {
    // 기본 배경 (밝은 그레이)
    background: "bg-[#F3F3F3]",

    // 유리 카드 (기본)
    card: `
        bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl 
        border border-white/60 dark:border-white/[0.08]
        shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none
        rounded-[24px]
    `,

    // 유리 카드 (강조/호버 시)
    cardHover: `
        hover:bg-white/60 dark:hover:bg-white/[0.06] hover:shadow-[0_8px_30px_rgba(79,70,229,0.08)] 
        hover:-translate-y-1 transition-all duration-300
    `,

    // 텍스트 스타일
    heading: "text-gray-900 dark:text-white font-bold tracking-tight",
    subtext: "text-gray-500 dark:text-gray-400 font-medium",

    // 포인트 컬러
    accent: "text-indigo-600",
    accentBg: "bg-indigo-50",
};