import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
    Icon: LucideIcon;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const STYLES = {
    navIconButton: `relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 transition-all duration-300 active:scale-95 flex items-center justify-center group`,
    navIcon: `sm:w-5 sm:h-5 z-10`,
    activeBlob: "absolute inset-0 bg-accent-50/80 dark:bg-accent-900/30 rounded-xl -z-10",
    // 가운데 정렬에 transform 을 쓰지 않는다. 이 점은 layout 애니메이션의
    // 대상이라, 애니메이션이 끝나면 framer-motion 이 transform 을 지우면서
    // -translate-x-1/2 까지 함께 사라져 점이 오른쪽으로 밀린다.
    activeDot: "absolute -bottom-1 inset-x-0 mx-auto w-1 h-1 bg-accent-600 dark:bg-accent-400 rounded-full",
};

export const NavItem = ({ Icon, label, isActive, onClick }: NavItemProps) => {
    return (
        <button
            onClick={onClick}
            className={`${STYLES.navIconButton} ${isActive ? 'text-accent-600 dark:text-accent-400' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
            aria-label={label}
        >
            {isActive && (
                <motion.div
                    layoutId="nav-blob"
                    className={STYLES.activeBlob}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                    }}
                >
                    <motion.div
                        layoutId="nav-dot"
                        className={STYLES.activeDot}
                    />
                </motion.div>
            )}

            <Icon size={18} className={STYLES.navIcon} />
        </button>
    );
};
