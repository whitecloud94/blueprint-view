import {Briefcase, Home, Moon, Plus, ShoppingBag, User} from "lucide-react";

export const Navigation = () => {

    const STYLES = {
        container: `bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
        rounded-[24px] p-2 pl-4 sm:pl-6 pr-2 flex justify-between items-center`,
        wrapper: `sticky top-4 sm:top-6 z-50 transition-all duration-300`,
        iconGroup: `flex gap-4 sm:gap-6 text-gray-400`,
        navIconButton: `hover:text-black transition-colors hover:scale-110 duration-200`,
        navIcon: `sm:w-5 sm:h-5`,
        actionGroup: `flex items-center gap-2 sm:gap-3`,
        themeButton: `text-gray-400 hover:text-black transition-colors p-2 hover:rotate-12 duration-300`,
        hireButton: `bg-[#1A1A1A] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-[14px] sm:rounded-[16px] text-[11px] 
        sm:text-[13px] font-bold flex items-center gap-1.5 sm:gap-2 hover:bg-black hover:scale-105 
        active:scale-95 transition-all shadow-lg shadow-black/10`,
        plusIconWrapper: `bg-white/20 rounded-full p-0.5`,
        hireTextDesktop: `hidden xs:inline`,
        hireTextMobile: `xs:hidden`
    }


    return (
        <>
            <nav className={STYLES.wrapper}>
                <div className={STYLES.container}>
                    <div className={STYLES.iconGroup}>
                        <button className={STYLES.navIconButton}><Home size={18} className={STYLES.navIcon} /></button>
                        <button className={STYLES.navIconButton}><User size={18} className={STYLES.navIcon} /></button>
                        <button className={STYLES.navIconButton}><Briefcase size={18} className={STYLES.navIcon} /></button>
                        <button className={STYLES.navIconButton}><ShoppingBag size={18} className={STYLES.navIcon} /></button>
                    </div>
                    <div className={STYLES.actionGroup}>
                        <button className={STYLES.themeButton}><Moon size={18} className={STYLES.navIcon} /></button>
                        <button className={STYLES.hireButton}>
                            <div className={STYLES.plusIconWrapper}><Plus size={10} strokeWidth={4} /></div>
                            <span className={STYLES.hireTextDesktop}>Hire Me</span>
                            <span className={STYLES.hireTextMobile}>Hire</span>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )

}