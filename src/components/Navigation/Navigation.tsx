import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Home, Moon, Plus, ShoppingBag, User, BookOpen } from "lucide-react";
import { COMMON_STYLES } from "../../constants/styles";

const STYLES = {
    wrapper: `sticky top-4 sm:top-6 z-50 transition-all duration-500`,
    container: `${COMMON_STYLES.glassMuted} rounded-[24px] p-2 pl-4 sm:pl-6 pr-2 flex justify-between items-center relative`,
    iconGroup: `flex gap-4 sm:gap-6 text-gray-400 relative z-10`, // z-10으로 물방울보다 위로 올림
    navIconButton: `relative px-1 py-2 transition-all duration-300 active:scale-95 flex items-center justify-center`,
    navIcon: `sm:w-5 sm:h-5`,
    actionGroup: `flex items-center gap-2 sm:gap-3`,
    themeButton: `text-gray-400 hover:text-black transition-transform p-2 hover:rotate-12 duration-300`,
    hireButton: `${COMMON_STYLES.glassDark} px-3 sm:px-5 py-2 sm:py-2.5 rounded-[14px] sm:rounded-[16px] text-[11px] sm:text-[13px] font-bold flex items-center gap-1.5 sm:gap-2 hover:bg-black hover:scale-105 active:scale-95 transition-all`,
    plusIconWrapper: `bg-white/20 rounded-full p-0.5`,
    hireMeLabel: "hidden xs:inline",
    hireLabel: "xs:hidden",
};

export const Navigation = () => {
    // 현재 활성화된 탭 상태 (기본값: Home)
    const [activeTab, setActiveTab] = useState('Home');

    const navItems = [
        { Icon: Home, label: 'Home' },
        { Icon: User, label: 'About' },
        { Icon: Briefcase, label: 'Projects' },
        { Icon: BookOpen, label: 'Blog' }, // 블로그 메뉴 추가
        { Icon: ShoppingBag, label: 'Products' }
    ];

    return (
        <nav className={STYLES.wrapper}>
            <div className={STYLES.container}>
                {/* 메인 메뉴 아이콘 */}
                <div className={STYLES.iconGroup}>
                    {navItems.map(({ Icon, label }) => {
                        const isActive = activeTab === label;
                        return (
                            <button
                                key={label}
                                onClick={() => setActiveTab(label)}
                                className={`${STYLES.navIconButton} ${isActive ? 'text-indigo-600' : 'hover:text-black'}`}
                                aria-label={label}
                            >
                                {/* 물방울(Blob) 배경 효과 */}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-blob"
                                        className="absolute inset-0 bg-indigo-50/80 rounded-xl -z-10"
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30
                                        }}
                                    >
                                        {/* 하단 인디고 포인트 점 */}
                                        <motion.div
                                            layoutId="nav-dot"
                                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full"
                                        />
                                    </motion.div>
                                )}

                                <Icon size={18} className={STYLES.navIcon} />
                            </button>
                        );
                    })}
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
                        <span className={STYLES.hireMeLabel}>Hire Me</span>
                        <span className={STYLES.hireLabel}>Hire</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};