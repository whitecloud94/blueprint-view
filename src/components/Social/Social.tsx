import { SiGithub, SiGmail } from "react-icons/si";
import { COMMON_STYLES } from "../../constants/styles";

const STYLES = {
    wrapper: `${COMMON_STYLES.glass} rounded-[24px] sm:rounded-[28px] p-2 flex flex-col xs:flex-row items-center justify-between px-4 sm:pl-6 sm:pr-3 gap-4 py-4 sm:py-2`,
    buttonGroup: "flex gap-2",
    iconButton: (hoverColor: string) => `
        w-9 h-9 sm:w-10 sm:h-10 
        bg-white/70 backdrop-blur-md 
        rounded-full flex items-center justify-center 
        text-gray-400 border border-white/60
        transition-all duration-300 
        ${hoverColor} hover:shadow-lg hover:scale-110 active:scale-95
    `,
    sectionHeader: COMMON_STYLES.sectionHeader,
    dot: COMMON_STYLES.dot,
};

const SOCIAL_DATA = [
    { Icon: SiGithub, color: "hover:text-[#181717] hover:bg-white", label: "Github" },
    { Icon: SiGmail, color: "hover:text-[#EA4335] hover:bg-white", label: "Gmail" }
];

export const Social = () => (
    <section className={STYLES.wrapper}>
        <div className={STYLES.sectionHeader}>
            <div className={STYLES.dot}/>
            Contact points
        </div>
        <div className={STYLES.buttonGroup}>
            {SOCIAL_DATA.map(({ Icon, color, label }, idx) => (
                <button
                    key={idx}
                    className={STYLES.iconButton(color)}
                    aria-label={label}
                >
                    <Icon size={18}/>
                </button>
            ))}
        </div>
    </section>
);