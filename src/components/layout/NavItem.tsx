import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
    Icon: LucideIcon;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const STYLES = {
    navIconButton: `relative w-10 h-10 transition-all duration-300 active:scale-95 flex items-center justify-center group`,
    navIcon: `sm:w-5 sm:h-5 z-10`,
    activeBlob: "absolute inset-0 bg-indigo-50/80 dark:bg-indigo-900/30 rounded-xl -z-10",
    activeDot: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full",
};

export const NavItem = ({ Icon, label, isActive, onClick }: NavItemProps) => {
    return (
        <button
            onClick={onClick}
            className={`${STYLES.navIconButton} ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
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
