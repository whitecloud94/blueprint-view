import {ChevronRight} from "lucide-react";
import {motion} from "framer-motion";
import { COMMON_STYLES } from "../../../constants/styles.ts";
import { MarqueeText } from "../../../components/common/MarqueeText.tsx";
import {ProjectItemProps} from "../../../types";

const STYLES = {
    item: (active?: boolean) =>
        `${COMMON_STYLES.innerCard} p-3 sm:p-4 pl-4 sm:pl-5 flex items-center justify-between cursor-pointer group relative
    ${ active ? "bg-white/90 dark:bg-white/10 border-accent-200 dark:border-accent-500/50 shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:scale-[1.02]"
              : "hover:bg-white/90 dark:hover:bg-white/10 hover:border-white dark:hover:border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:hover:scale-[1.01]"
    }`,

    featuredBar: "absolute left-1 top-2 bottom-2 w-[3px] rounded-full bg-accent-500",

    iconBox: (bg: string) =>
        `w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 ${bg} rounded-full
        flex items-center justify-center text-white
        shadow-[0_4px_12px_rgba(0,0,0,0.1)] group-hover:rotate-6 transition-transform`,

    activeBadge: "hidden xs:inline-block text-[8px] bg-accent-600 dark:bg-accent-500 text-white px-1.5 py-0.5 rounded-md font-black",
    featuredBadge: "hidden sm:inline-flex items-center gap-1 text-[8px] font-mono font-black text-accent-600 dark:text-accent-400 border border-accent-200 dark:border-accent-500/40 px-1.5 py-0.5 rounded-md tracking-wider",

    chevron: (active?: boolean) =>
        `flex-shrink-0 w-8 h-8 flex items-center justify-center transition-colors ${
            active ? "text-accent-600 dark:text-accent-400" : "text-gray-300 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white"
        }`,
    contentWrapper: "flex items-center gap-3 sm:gap-5 min-w-0 flex-1",
    infoWrapper: "flex-1 min-w-0 flex flex-col justify-center gap-0.5",
    titleWrapper: "flex items-center gap-2 w-full",
    title: "text-[14px] sm:text-[16px] font-bold text-gray-900 dark:text-white",
    subTitle: "text-[12px] sm:text-[14px] text-gray-500 dark:text-gray-400 font-medium",
};

export const ProjectItem = ({
                                title,
                                sub,
                                icon,
                                bg,
                                active = false,
                                featured = false,
                                onClick,
                                className = "",
                                rightIcon
                            }: ProjectItemProps) => {
    return (
        <div className={`${STYLES.item(active)} ${className}`} onClick={onClick}>
            {featured && <span className={STYLES.featuredBar}/>}
            <div className={STYLES.contentWrapper}>
                <div className={STYLES.iconBox(bg)}>{icon}</div>

                <div className={STYLES.infoWrapper}>
                    <div className={STYLES.titleWrapper}>
                        <MarqueeText
                            text={title}
                            className={STYLES.title}
                        />
                        {active && (
                            <motion.span
                                className={STYLES.activeBadge + " shrink-0"}
                                initial={{opacity: 0, scale: 0.7}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{type: "spring", stiffness: 400, damping: 20}}
                            >
                                ACTIVE
                            </motion.span>
                        )}
                        {featured && (
                            <span className={STYLES.featuredBadge + " shrink-0"}>
                                FEATURED
                            </span>
                        )}
                    </div>

                    <MarqueeText 
                        text={sub} 
                        containerHeight="h-5"
                        className={STYLES.subTitle}
                    />
                </div>
            </div>

            <div className={STYLES.chevron(active)}>
                {rightIcon ?? <ChevronRight size={18}/>}
            </div>
        </div>
    );
};