import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

const STYLES = {
  item: (active?: boolean) =>
    `group rounded-[20px] sm:rounded-[24px] p-3 sm:p-4 pl-4 sm:pl-5 flex items-center justify-between transition-all duration-300 cursor-pointer border ${
      active
        ? "bg-white border-indigo-100 shadow-md sm:scale-[1.02]"
        : "bg-white border-transparent hover:border-gray-50 sm:hover:scale-[1.01]"
    }`,
  iconBox: (bg: string) =>
    `w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 ${bg} rounded-full flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform`,
  activeBadge:
    "hidden xs:inline-block text-[8px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-md font-black animate-pulse",
  chevron: (active?: boolean) =>
    `flex-shrink-0 w-8 h-8 flex items-center justify-center transition-colors ${
      active ? "text-indigo-600" : "text-gray-300 group-hover:text-black"
    }`,
};

export interface ProjectItemProps {
  title: string;
  sub: string;
  icon: ReactNode;
  bg: string; // tailwind bg class, e.g., 'bg-indigo-600'
  active?: boolean;
  onClick?: () => void;
  className?: string; // extra classes for outer wrapper if needed
  rightIcon?: ReactNode; // override right-side icon (defaults to ChevronRight)
}

export const ProjectItem = ({
  title,
  sub,
  icon,
  bg,
  active = false,
  onClick,
  className = "",
  rightIcon,
}: ProjectItemProps) => {
  return (
    <div className={`${STYLES.item(active)} ${className}`} onClick={onClick}>
      <div className="flex items-center gap-3 sm:gap-5 min-w-0">
        <div className={STYLES.iconBox(bg)}>{icon}</div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-[14px] sm:text-[16px] font-bold text-gray-900 truncate">{title}</h3>
            {active && <span className={STYLES.activeBadge}>ACTIVE</span>}
          </div>
          <p className="text-[12px] sm:text-[14px] text-gray-500 font-medium truncate">{sub}</p>
        </div>
      </div>
      <div className={STYLES.chevron(active)}>
        {rightIcon ?? <ChevronRight size={18} />}
      </div>
    </div>
  );
};