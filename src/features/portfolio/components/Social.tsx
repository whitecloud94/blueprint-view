import { SiGithub, SiGmail } from "react-icons/si";
import { COMMON_STYLES } from "../../../constants/styles.ts";
import { SectionMarker } from "../../../components/common/SectionMarker.tsx";

const STYLES = {
    wrapper: `${COMMON_STYLES.glass} rounded-[24px] sm:rounded-[28px] p-2 flex flex-col xs:flex-row items-center justify-between px-4 sm:pl-6 sm:pr-3 gap-4 py-4 sm:py-2`,
    buttonGroup: "flex gap-2",
    iconButton: (hoverColor: string) => `${COMMON_STYLES.iconButton} ${hoverColor}`,
    iconButtonDisabled: "opacity-40 cursor-not-allowed pointer-events-none",
};

const githubUrl = import.meta.env.VITE_GITHUB_URL as string | undefined;

const SOCIAL_DATA = [
    { Icon: SiGithub, color: "hover:text-[#181717] hover:bg-white", label: "Github", href: githubUrl },
    { Icon: SiGmail, color: "hover:text-[#EA4335] hover:bg-white", label: "Gmail", href: `mailto:${import.meta.env.VITE_CONTACT_EMAIL}` },
];

export const Social = () => {
    return (
        <section className={STYLES.wrapper}>
            <SectionMarker index="04" label="Contact points"/>
            <div className={STYLES.buttonGroup}>
                {SOCIAL_DATA.map(({ Icon, color, label, href }, idx) => {
                    const isDisabled = !href;
                    return (
                        <a
                            key={idx}
                            href={href ?? undefined}
                            target={label === 'Github' ? '_blank' : undefined}
                            rel={label === 'Github' ? 'noreferrer' : undefined}
                            className={`${STYLES.iconButton(color)} ${isDisabled ? STYLES.iconButtonDisabled : ''}`}
                            aria-label={label}
                            aria-disabled={isDisabled}
                        >
                            <Icon size={18}/>
                        </a>
                    );
                })}
            </div>
        </section>
    );
};