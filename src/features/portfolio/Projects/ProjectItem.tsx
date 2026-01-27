import {ChevronRight} from "lucide-react";
import {ReactNode} from "react";
import { COMMON_STYLES } from "../../../constants/styles.ts";
import { MarqueeText } from "../../../components/common/MarqueeText.tsx";

const STYLES = {
    item: (active?: boolean) =>
        `${COMMON_STYLES.innerCard} p-3 sm:p-4 pl-4 sm:pl-5 flex items-center justify-between cursor-pointer group
    ${ active ? "bg-white/90 border-indigo-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:scale-[1.02]"
              : "hover:bg-white/90 hover:border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:hover:scale-[1.01]"
    }`,

    iconBox: (bg: string) =>
        `w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 ${bg} rounded-full 
        flex items-center justify-center text-white 
        shadow-[0_4px_12px_rgba(0,0,0,0.1)] group-hover:rotate-6 transition-transform`,

    activeBadge: "hidden xs:inline-block text-[8px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-md font-black animate-pulse",

    chevron: (active?: boolean) =>
        `flex-shrink-0 w-8 h-8 flex items-center justify-center transition-colors ${
            active ? "text-indigo-600" : "text-gray-300 group-hover:text-black"
        }`,
    contentWrapper: "flex items-center gap-3 sm:gap-5 min-w-0 flex-1",
    infoWrapper: "flex-1 min-w-0 flex flex-col justify-center gap-0.5",
    titleWrapper: "flex items-center gap-2 w-full",
    title: "text-[14px] sm:text-[16px] font-bold text-gray-900",
    subTitle: "text-[12px] sm:text-[14px] text-gray-500 font-medium",
};

export interface ProjectItemProps {
    title: string;
    sub: string;
    icon: ReactNode;
    bg: string;
    active?: boolean;
    onClick?: () => void;
    className?: string;
    rightIcon?: ReactNode;
}

export const ProjectItem = ({
                                title,
                                sub,
                                icon,
                                bg,
                                active = false,
                                onClick,
                                className = "",
                                rightIcon
                            }: ProjectItemProps) => {
    return (
        <div className={`${STYLES.item(active)} ${className}`} onClick={onClick}>
            <div className={STYLES.contentWrapper}>
                <div className={STYLES.iconBox(bg)}>{icon}</div>

                <div className={STYLES.infoWrapper}>
                    <div className={STYLES.titleWrapper}>
                        <MarqueeText 
                            text={title} 
                            className={STYLES.title}
                        />
                        {active && <span className={STYLES.activeBadge + " shrink-0"}>ACTIVE</span>}
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