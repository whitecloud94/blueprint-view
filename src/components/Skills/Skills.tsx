import { ArrowUpRight } from 'lucide-react';
import { SiOracle, SiReact, SiSpringboot, SiTypescript } from "react-icons/si";
import { BiLogoJava } from "react-icons/bi";

const STYLES = {
    // 1. 부모 컨테이너: 네비게이션과 동일한 투명도와 블러 적용
    wrapper: `
        bg-white/40 backdrop-blur-2xl 
        rounded-[28px] sm:rounded-[32px] 
        p-1.5 sm:p-2 space-y-1 
        border border-white/40 
        shadow-[0_8px_32px_rgba(0,0,0,0.03)]
    `,

    // 2. 스킬 아이템: ProjectItem과 동일하게 밀도를 높여(70%) 경계를 뚜렷하게 함
    SkilItem: `
        group bg-white/70 backdrop-blur-xl 
        rounded-[20px] sm:rounded-[24px] 
        p-3 sm:p-4 pl-4 sm:pl-5 
        flex items-center justify-between 
        transition-all duration-300 cursor-pointer 
        border border-white/60 
        hover:bg-white/90 hover:border-white hover:scale-[1.01] hover:shadow-lg
    `,

    // 3. 아이콘 박스: 내부가 비치는 맑은 유리 느낌 추가
    SkillIcon: `
        w-9 h-9 sm:w-10 sm:h-10 
        bg-white/40 backdrop-blur-md 
        border border-white/60 
        rounded-full flex items-center justify-center 
        text-lg sm:text-xl shadow-sm
    `,

    // 4. 태그: 반투명한 유리 배지 스타일
    SkillTag: `
        text-[9px] sm:text-[10px] font-bold text-gray-400 
        bg-black/5 backdrop-blur-sm 
        px-2 py-1 rounded-md tracking-wider 
        border border-black/5
    `,

    dot: "w-1.5 h-1.5 rounded-full bg-gray-300",
};

export const Skills = () => (
    <section className={`${STYLES.wrapper} mb-12 sm:mb-16`}>
        <div className="flex items-center gap-2 px-4 sm:px-6 py-4 text-xs sm:text-sm font-medium text-gray-400">
            <div className={STYLES.dot}/>
            My available skills
        </div>
        {[
            {name: 'Spring boot - Batch', tag: 'Batch', icon: <SiSpringboot className="text-[#6DB33F]"/>},
            {name: 'Spring boot - MVC', tag: 'mvc', icon: <SiSpringboot className="text-[#6DB33F]"/>},
            {name: 'Oracle', tag: 'RDBMS', icon: <SiOracle className="text-[#F80000]"/>},
            {name: 'React', tag: 'Front', icon: <SiReact className="text-[#61DAFB]"/>},
            {name: 'TypeScript', tag: 'Script', icon: <SiTypescript className="text-[#3178C6]"/>},
            {name: 'Java', tag: 'Server', icon: <BiLogoJava className="text-[#007396]"/>},
            {name: 'Etc', tag: 'Keep learning🔥', icon: '📖'},
        ].map((prod, j) => (
            <div key={j} className={STYLES.SkilItem}>
                <div className="flex items-center gap-3 sm:gap-5">
                    <div className={STYLES.SkillIcon}>{prod.icon}</div>
                    <span className="text-[14px] sm:text-[15px] font-bold text-gray-900">{prod.name}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                    <span className={STYLES.SkillTag}>{prod.tag}</span>
                    <ArrowUpRight size={16} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
            </div>
        ))}
    </section>
);