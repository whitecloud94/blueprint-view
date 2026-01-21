import {Briefcase, Home, Moon, Plus, ShoppingBag, User} from "lucide-react";
import { COMMON_STYLES } from "../../constants/styles";

const STYLES = {
    wrapper: `sticky top-4 sm:top-6 z-50 transition-all duration-500`,
    container: `${COMMON_STYLES.glassMuted} rounded-[24px] p-2 pl-4 sm:pl-6 pr-2 flex justify-between items-center`,
    iconGroup: `flex gap-4 sm:gap-6 text-gray-400`,
    navIconButton: `hover:text-black transition-all hover:scale-110 duration-200 active:scale-95`,
    navIcon: `sm:w-5 sm:h-5`,
    actionGroup: `flex items-center gap-2 sm:gap-3`,
    themeButton: `text-gray-400 hover:text-black transition-transform p-2 hover:rotate-12 duration-300`,
    hireButton: `${COMMON_STYLES.glassDark} px-3 sm:px-5 py-2 sm:py-2.5 rounded-[14px] sm:rounded-[16px] text-[11px] sm:text-[13px] font-bold flex items-center gap-1.5 sm:gap-2 hover:bg-black hover:scale-105 active:scale-95 transition-all`,
    plusIconWrapper: `bg-white/20 rounded-full p-0.5`,
};

export const Navigation = () => {
    return (
        <nav className={STYLES.wrapper}>
            <div className={STYLES.container}>
                {/* 메인 메뉴 아이콘 */}
                <div className={STYLES.iconGroup}>
                    {[
                        { Icon: Home, label: 'Home' },
                        { Icon: User, label: 'About' },
                        { Icon: Briefcase, label: 'Projects' },
                        { Icon: ShoppingBag, label: 'Products' }
                    ].map(({ Icon, label }, idx) => (
                        <button key={idx} className={STYLES.navIconButton} aria-label={label}>
                            <Icon size={18} className={STYLES.navIcon} />
                        </button>
                    ))}
                </div>

                {/* 우측 액션 영역 */}
                <div className={STYLES.actionGroup}>
                    <button className={STYLES.themeButton} aria-label="Toggle Theme">
                        <Moon size={18} className={STYLES.navIcon} />
                    </button>

                    <button className={STYLES.hireButton}>
                        <div className={STYLES.plusIconWrapper}>
                            <Plus size={10} strokeWidth={4} />
                        </div>
                        <span className="hidden xs:inline">Hire Me</span>
                        <span className="xs:hidden">Hire</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};