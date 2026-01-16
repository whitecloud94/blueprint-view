import React from 'react';
import {Instagram, Globe, Linkedin} from 'lucide-react';
import {SiGithub} from "react-icons/si";

const STYLES = {
    wrapper: "bg-[#F9F9F9] rounded-[24px] sm:rounded-[28px] p-2 flex flex-col xs:flex-row items-center justify-between px-4 sm:pl-6 sm:pr-3 gap-4 py-4 sm:py-2",
    buttonGroup: "flex gap-2",
    iconButton: "w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-100",
    sectionHeader: "flex items-center gap-2 text-[13px] sm:text-[14px] text-gray-400 font-medium",
    dot: "w-1.5 h-1.5 rounded-full bg-gray-300",
};

export const SocialSection = () => (
    <section className={STYLES.wrapper}>
        <div className={STYLES.sectionHeader}>
            <div className={STYLES.dot}/>
            Follow Me
        </div>
        <div className={STYLES.buttonGroup}>
            {[SiGithub, Instagram, Globe, Linkedin].map((Icon, idx) => (
                <button key={idx} className={STYLES.iconButton}><Icon size={18}/></button>
            ))}
        </div>
    </section>
);
