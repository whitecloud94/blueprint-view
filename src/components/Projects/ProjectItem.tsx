import { ChevronRight } from "lucide-react";
import {ReactNode, useEffect, useRef, useState} from "react";

const STYLES = {
  item: (active?: boolean) =>
      `group rounded-[20px] sm:rounded-[24px] p-3 sm:p-4 pl-4 sm:pl-5 
    flex items-center justify-between transition-all duration-300 cursor-pointer border
    backdrop-blur-2xl 
    ${
          active
              ? "bg-white/90 border-indigo-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:scale-[1.02]"
              : "bg-white/70 border-white/60 hover:bg-white/90 hover:border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:hover:scale-[1.01]"
      }`,

  iconBox: (bg: string) =>
      `w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 ${bg} rounded-full 
    flex items-center justify-center text-white 
    shadow-[0_4px_12px_rgba(0,0,0,0.1)] group-hover:rotate-6 transition-transform`,

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
  bg: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  rightIcon?: ReactNode;
}

export const ProjectItem = ({ title, sub, icon, bg, active = false, onClick, className = "", rightIcon }: ProjectItemProps) => {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const checkOverflow = () => {
            if (textRef.current) {
                // 실제 텍스트 너비가 부모 너비보다 크면 overflow 상태로 설정
                setIsOverflowing(textRef.current.scrollWidth > textRef.current.clientWidth);
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow); // 화면 크기 변경 대응
        return () => window.removeEventListener('resize', checkOverflow);
    }, [sub]);

    return (
        <div className={`${STYLES.item(active)} ${className}`} onClick={onClick}>
            <div className="flex items-center gap-3 sm:gap-5 min-w-0 flex-1">
                <div className={STYLES.iconBox(bg)}>{icon}</div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="text-[14px] sm:text-[16px] font-bold text-gray-900 truncate">
                            {title}
                        </h3>
                        {active && <span className={STYLES.activeBadge}>ACTIVE</span>}
                    </div>

                    <div className="relative w-full overflow-hidden">
                        <p
                            ref={textRef}
                            className={`
                text-[12px] sm:text-[14px] text-gray-500 font-medium whitespace-nowrap
                ${isOverflowing ? 'truncate group-hover:animate-marquee group-hover:overflow-visible group-hover:truncate-none' : ''}
              `}
                        >
                            {sub}
                        </p>
                    </div>
                </div>
            </div>

            <div className={STYLES.chevron(active)}>
                {rightIcon ?? <ChevronRight size={18} />}
            </div>
        </div>
    );
};