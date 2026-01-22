import { SiGithub, SiGmail } from "react-icons/si";
import { COMMON_STYLES } from "../../constants/styles";

const STYLES = {
    wrapper: `${COMMON_STYLES.glass} rounded-[24px] sm:rounded-[28px] p-2 flex flex-col xs:flex-row items-center justify-between px-4 sm:pl-6 sm:pr-3 gap-4 py-4 sm:py-2`,
    buttonGroup: "flex gap-2",
    iconButton: (hoverColor: string) => `${COMMON_STYLES.iconButton} ${hoverColor}`,
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