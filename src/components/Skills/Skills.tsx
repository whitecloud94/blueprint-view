import {ArrowUpRight} from 'lucide-react';
import {SiOracle, SiReact, SiSpringboot, SiTypescript} from "react-icons/si";
import {BiLogoJava} from "react-icons/bi";

const STYLES = {
    wrapper: "bg-[#F9F9F9] rounded-[28px] sm:rounded-[32px] p-1.5 sm:p-2 space-y-1 border border-gray-50",
    SkilItem: "group bg-white rounded-[20px] sm:rounded-[24px] p-3 sm:p-4 pl-4 sm:pl-5 flex items-center justify-between hover:scale-[1.01] hover:shadow-md transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-50",
    SkillIcon: "w-9 h-9 sm:w-10 sm:h-10 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-lg sm:text-xl shadow-sm",
    SkillTag: "text-[9px] sm:text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md tracking-wider border border-gray-200",
    dot: "w-1.5 h-1.5 rounded-full bg-gray-300",
};

export const Skills = () => (
    <section className={`${STYLES.wrapper} mb-12 sm:mb-16`}>
        <div className="flex items-center gap-2 px-4 sm:px-6 py-4 text-xs sm:text-sm font-medium text-gray-400">
            <div className={STYLES.dot}/>
            My available skills
        </div>
        {[
            {name: 'Spring boot - Batch', tag: 'Batch', icon: <SiSpringboot/>},
            {name: 'Spring boot - MVC', tag: 'mvc', icon: <SiSpringboot/>},
            {name: 'Oracle', tag: 'RDBMS', icon: <SiOracle/>},
            {name: 'React', tag: 'Front', icon: <SiReact/>},
            {name: 'TypeScript', tag: 'Script', icon: <SiTypescript/>},
            {name: 'Java', tag: 'FRAMER', icon: <BiLogoJava/>},
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
