export const COMMON_STYLES = {
    // Glass surfaces — one shared formula (white-highlight border + layered shadow),
    // three opacity tiers by how "in front" the surface sits.
    glass: "bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl border border-white/60 dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.03),0_12px_32px_-8px_rgba(0,0,0,0.08)] dark:shadow-none",
    glassMuted: "bg-white/55 dark:bg-white/[0.035] backdrop-blur-lg border border-white/50 dark:border-white/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.02),0_8px_24px_-6px_rgba(0,0,0,0.06)] dark:shadow-none",
    glassDark: "bg-gray-900/95 dark:bg-white/95 backdrop-blur-xl border border-white/10 dark:border-black/5 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.25)] dark:shadow-none text-white dark:text-black",

    card: "rounded-[32px] sm:rounded-[40px] overflow-hidden",
    innerCard: "bg-white/55 dark:bg-white/[0.05] backdrop-blur-md border border-white/60 dark:border-white/[0.1] rounded-[20px] sm:rounded-[24px] transition-all duration-300",

    title: "font-black tracking-tight text-gray-900 dark:text-white",
    body: "font-medium text-gray-500 dark:text-gray-400",

    // Section Headers
    sectionHeader: "flex items-center gap-2 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-accent-500",
    dot: "w-1.5 h-1.5 rounded-full bg-accent-500",

    // Typography
    modalTitle: "text-[28px] sm:text-[36px] font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight",
    modalBody: "text-[16px] sm:text-[17px] text-gray-600 dark:text-white/80 leading-[1.85] font-medium tracking-tight",
    badgeText: "text-[11px] font-black tracking-widest",

    // Buttons
    primaryButton: "bg-gray-900 text-white rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/20 active:scale-95",
    secondaryButton: "bg-white/80 backdrop-blur-md border border-gray-200 text-gray-900 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-white hover:border-gray-300 active:scale-95 shadow-sm",

    // Interactive
    iconButton: "w-9 h-9 sm:w-10 sm:h-10 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 border border-white/60 transition-all duration-300 hover:shadow-lg hover:scale-110 active:scale-95",
};

export const GLASS_STYLES = {
    // Same glass surface as COMMON_STYLES.glass, just shaped as a standalone card —
    // kept as one definition so portfolio and blog cards never drift apart again.
    card: `${COMMON_STYLES.glass} ${COMMON_STYLES.card}`,

    cardHover: `
        hover:bg-white/85 dark:hover:bg-white/[0.06] hover:shadow-[0_16px_40px_-12px_rgba(79,70,229,0.12)]
        hover:-translate-y-1 transition-all duration-300
    `,

    heading: "text-gray-900 dark:text-white font-bold tracking-tight",
    subtext: "text-gray-500 dark:text-gray-400 font-medium",
};
