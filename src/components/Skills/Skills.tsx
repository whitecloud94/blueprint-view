import { ArrowUpRight } from 'lucide-react';
import { SiOracle, SiReact, SiSpringboot, SiTypescript } from "react-icons/si";
import { BiLogoJava } from "react-icons/bi";
import { COMMON_STYLES } from "../../constants/styles";
import { MarqueeText } from "../common/MarqueeText";
import React from "react";

const STYLES = {
    wrapper: `${COMMON_STYLES.glass} ${COMMON_STYLES.card}`,
    skillItem: `${COMMON_STYLES.innerCard} p-3 sm:p-4 pl-4 sm:pl-5 flex items-center justify-between cursor-pointer group hover:bg-white/90 hover:border-white hover:scale-[1.01] hover:shadow-lg`,
    skillIcon: `${COMMON_STYLES.iconButton} text-lg sm:text-xl shadow-sm text-gray-900`,
    skillTag: `text-[9px] sm:text-[10px] font-bold text-gray-400 bg-black/5 backdrop-blur-sm px-2 py-1 rounded-md tracking-wider border border-black/5`,
    header: `${COMMON_STYLES.sectionHeader} px-4 sm:px-6 py-4`,
    dot: COMMON_STYLES.dot,
};

interface SkillItemProps {
    name: string;
    tag: string;
    icon: React.ReactNode;
}

const SkillItem = ({ name, tag, icon }: SkillItemProps) => (
    <div className={STYLES.skillItem}>
        <div className="flex items-center gap-3 sm:gap-5 min-w-0 flex-1">
            <div className={STYLES.skillIcon}>{icon}</div>
            <MarqueeText
                text={name}
                className="text-[14px] sm:text-[15px] font-bold text-gray-900"
            />
        </div>
        <div className="flex items-center gap-2 sm:gap-3 ml-2 shrink-0">
            <span className={STYLES.skillTag}>{tag}</span>
            <ArrowUpRight size={16} className="text-gray-300 group-hover:text-black transition-colors" />
        </div>
    </div>
);

export const Skills = () => (
    <section className={`${STYLES.wrapper} mb-12 sm:mb-16`}>
        <div className={STYLES.header}>
            <div className={STYLES.dot} />
            My available skills
        </div>
        {[
            { name: 'Spring boot - Batch', tag: 'Job Optimization', icon: <SiSpringboot className="text-[#6DB33F]" /> },
            { name: 'Spring boot - MVC', tag: 'Robust Architecture', icon: <SiSpringboot className="text-[#6DB33F]" /> },
            { name: 'Oracle', tag: 'ACID', icon: <SiOracle className="text-[#F80000]" /> },
            { name: 'React', tag: 'Component', icon: <SiReact className="text-[#61DAFB]" /> },
            { name: 'TypeScript', tag: 'Type Safety', icon: <SiTypescript className="text-[#3178C6]" /> },
            { name: 'Java', tag: 'LTS Support', icon: <BiLogoJava className="text-[#007396]" /> },
            { name: 'Etc', tag: 'Keep learning🔥', icon: '📖' },
        ].map((prod, j) => (
            <SkillItem key={j} name={prod.name} tag={prod.tag} icon={prod.icon} />
        ))}
    </section>
);