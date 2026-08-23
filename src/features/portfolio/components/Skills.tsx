import { ArrowUpRight } from 'lucide-react';
import { SiOracle, SiReact, SiSpringboot, SiTypescript } from "react-icons/si";
import { BiLogoJava } from "react-icons/bi";
import { COMMON_STYLES } from "../../../constants/styles.ts";
import { MarqueeText } from "../../../components/common/MarqueeText.tsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useBlogNavigation } from "../../blog/hooks/useBlogNavigation.ts";
import { findTagForTech } from "../../blog/utils/techTag.ts";

const STYLES = {
    wrapper: `${COMMON_STYLES.glass} ${COMMON_STYLES.card}`,
    skillItem: `${COMMON_STYLES.innerCard} p-3 sm:p-4 pl-4 sm:pl-5 flex items-center justify-between cursor-pointer group hover:bg-white/90 dark:hover:bg-white/[0.1] hover:border-white dark:hover:border-white/[0.2] hover:scale-[1.01] hover:shadow-lg`,
    skillInfo: "flex items-center gap-3 sm:gap-5 min-w-0 flex-1",
    skillIcon: `${COMMON_STYLES.iconButton} text-lg sm:text-xl shadow-sm text-gray-900 dark:bg-white/[0.1] dark:text-white dark:border-white/[0.1]`,
    skillName: "text-[14px] sm:text-[15px] font-bold text-gray-900 dark:text-white",
    skillAction: "flex items-center gap-2 sm:gap-3 ml-2 shrink-0",
    skillTag: `text-[9px] sm:text-[10px] font-bold text-gray-400 bg-black/5 dark:bg-white/5 backdrop-blur-sm px-2 py-1 rounded-md tracking-wider border border-black/5 dark:border-white/5`,
    postCount: "text-[9px] sm:text-[10px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/15 px-2 py-1 rounded-md tracking-wider tabular-nums",
    skillArrow: "text-gray-300 group-hover:text-black transition-colors",
    header: `${COMMON_STYLES.sectionHeader} px-4 sm:px-6 py-4`,
    listWrapper: "flex flex-col gap-1.5",
    dot: COMMON_STYLES.dot,
};

interface SkillItemProps {
    name: string;
    tag: string;
    icon: React.ReactNode;
    /** 이 기술로 쓴 글 수. 대응하는 태그가 있을 때만 내려온다. */
    postCount?: number;
    onClick?: () => void;
}

const SkillItem = ({ name, tag, icon, postCount, onClick }: SkillItemProps) => (
    <button type="button" className={`${STYLES.skillItem} w-full text-left`} onClick={onClick}>
        <div className={STYLES.skillInfo}>
            <div className={STYLES.skillIcon}>{icon}</div>
            <MarqueeText
                text={name}
                className={STYLES.skillName}
            />
        </div>
        <div className={STYLES.skillAction}>
            {/* 읽을 글이 있을 때만 개수를 보여 준다. 없는데 눌러 보게 만들지 않는다. */}
            {postCount !== undefined && postCount > 0 && (
                <span className={STYLES.postCount}>
                    {postCount} {postCount === 1 ? 'post' : 'posts'}
                </span>
            )}
            <span className={STYLES.skillTag}>{tag}</span>
            <ArrowUpRight size={16} className={STYLES.skillArrow} />
        </div>
    </button>
);

interface Skill {
    name: string;
    tag: string;
    icon: React.ReactNode;
    /**
     * 대응하는 태그가 없을 때 갈 곳.
     *
     * 'search' 는 기술 이름으로 본문까지 훑는다. 태그가 아직 없어도 그 기술을 언급한
     * 글은 찾아진다. 'blog' 는 기술이 아닌 항목(Etc)용이다. 검색어로 쓸 이름이 없다.
     */
    fallback: 'search' | 'blog';
}

const SKILLS: Skill[] = [
    { name: 'Spring boot - Batch', tag: 'Job Optimization', icon: <SiSpringboot className="text-[#6DB33F]" />, fallback: 'search' },
    { name: 'Spring boot - MVC', tag: 'Robust Architecture', icon: <SiSpringboot className="text-[#6DB33F]" />, fallback: 'search' },
    { name: 'Oracle', tag: 'ACID', icon: <SiOracle className="text-[#F80000]" />, fallback: 'search' },
    { name: 'React', tag: 'Component', icon: <SiReact className="text-[#61DAFB]" />, fallback: 'search' },
    { name: 'TypeScript', tag: 'Type Safety', icon: <SiTypescript className="text-[#3178C6]" />, fallback: 'search' },
    { name: 'Java', tag: 'LTS Support', icon: <BiLogoJava className="text-[#007396]" />, fallback: 'search' },
    { name: 'Etc', tag: 'Keep learning🔥', icon: '📖', fallback: 'blog' },
];

/**
 * 보유 기술 목록.
 *
 * <p>항목을 누르면 그 기술로 쓴 글로 간다. 기술 이름을 블로그 태그와 대조해 찾고,
 * 대응하는 태그가 없으면 검색으로 넘긴다. 목록에 태그 이름을 따로 적어 두지 않는
 * 이유는, 그러면 태그를 바꿀 때마다 이 파일도 함께 고쳐야 하기 때문이다.
 */
export const Skills = () => {
    const navigate = useNavigate();
    const {state} = useBlogNavigation();
    const tags = state.status === 'ready' ? state.data.tags : [];

    const handleSelect = (skill: Skill) => {
        const matched = findTagForTech(skill.name, tags);
        if (matched) {
            navigate(`/blog/tags/${encodeURIComponent(matched.slug)}`);
            return;
        }
        if (skill.fallback === 'search') {
            navigate(`/blog/search?q=${encodeURIComponent(skill.name)}`);
            return;
        }
        navigate('/blog');
    };

    return (
        <section id="products" className={`${STYLES.wrapper} mb-12 sm:mb-16`}>
            <div className={STYLES.header}>
                <div className={STYLES.dot} />
                My available skills
            </div>
            <div className={STYLES.listWrapper}>
                {SKILLS.map((skill) => (
                    <SkillItem
                        key={skill.name}
                        name={skill.name}
                        tag={skill.tag}
                        icon={skill.icon}
                        postCount={findTagForTech(skill.name, tags)?.postCount}
                        onClick={() => handleSelect(skill)}
                    />
                ))}
            </div>
        </section>
    );
};