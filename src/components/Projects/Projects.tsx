import {
    ArrowUpRight,
    Briefcase,
    CarFront,
    FileText,
    Leaf,
    LineChart,
    ShieldCheck,
    Smartphone
} from 'lucide-react';
import { ProjectItem } from "../Skills/ProjectItem";

const STYLES = {
    wrapper: "bg-[#F9F9F9] rounded-[28px] sm:rounded-[32px] p-1.5 sm:p-2 space-y-1 border border-gray-50",
    header: "flex justify-between items-center px-4 sm:px-6 py-4",
    viewAllBtn: "bg-white border border-gray-200 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold text-gray-600 flex items-center gap-1 hover:border-gray-300 transition-colors shadow-sm",
    listWrapper: "flex flex-col gap-1.5",
    item: (active?: boolean) => `group rounded-[20px] sm:rounded-[24px] p-3 sm:p-4 pl-4 sm:pl-5 flex items-center justify-between transition-all duration-300 cursor-pointer border ${active ? 'bg-white border-indigo-100 shadow-md sm:scale-[1.02]' : 'bg-white border-transparent hover:border-gray-50 sm:hover:scale-[1.01]'}`,
    iconBox: (bg: string) => `w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 ${bg} rounded-full flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform`,
    activeBadge: "hidden xs:inline-block text-[8px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-md font-black animate-pulse",
    chevron: (active?: boolean) => `flex-shrink-0 w-8 h-8 flex items-center justify-center transition-colors ${active ? 'text-indigo-600' : 'text-gray-300 group-hover:text-black'}`,
    sectionHeader: "flex items-center gap-2 text-[13px] sm:text-[14px] text-gray-400 font-medium",
};

const projects = [
    {
        title: 'Toyota Financial Core',
        sub: "Now I'm here!",
        icon: <CarFront size={20} className="sm:w-[22px]"/>,
        bg: 'bg-indigo-600',
        active: true
    },
    {
        title: 'IBK 기업은행 업무지원 시스템',
        sub: 'Sub Context1',
        icon: <Briefcase size={20} className="sm:w-[22px]"/>,
        bg: 'bg-[#1A1A1A]'
    },
    {
        title: 'IBK 기업은행 상시감시 시스템',
        sub: 'Sub Context2',
        icon: <ShieldCheck size={20} className="sm:w-[22px]"/>,
        bg: 'bg-[#1A1A1A]'
    },
    {
        title: 'IBK 기업은행 ESG 탄소중립 HUB',
        sub: 'Sub Context2',
        icon: <Leaf size={20} className="sm:w-[22px]"/>,
        bg: 'bg-[#1A1A1A]'
    },
    {
        title: 'BNK 경남은행 시니어 뱅킹 및 모바일 뱅킹 메인화면 개편',
        sub: 'Sub Context3',
        icon: <Smartphone size={20} className="sm:w-[22px]"/>,
        bg: 'bg-[#1A1A1A]'
    },
    {
        title: 'IBK 기업은행 투자상품 통합관리 시스템',
        sub: 'Sub Context2',
        icon: <LineChart size={20} className="sm:w-[22px]"/>,
        bg: 'bg-[#1A1A1A]'
    },
    {
        title: 'BNK 경남은행 비대면 제증명서 발급 서비스',
        sub: 'Sub Context2',
        icon: <FileText size={20} className="sm:w-[22px]"/>,
        bg: 'bg-[#1A1A1A]'
    },
]

export const Projects = () => (
        <section className={`${STYLES.wrapper} mb-6`}>
            <div className={STYLES.header}>
                <div className={STYLES.sectionHeader}>
                    <div className="w-2 h-2 rounded-full bg-gray-300"/>
                    Projects
                </div>
                <button className={STYLES.viewAllBtn}>
                    View All <ArrowUpRight size={12}/>
                </button>
            </div>

            <div className={STYLES.listWrapper}>
                {projects.map((item, i) => (
                    <ProjectItem
                        key={i}
                        title={item.title}
                        sub={item.sub}
                        icon={item.icon}
                        bg={item.bg}
                        active={item.active}
                    />
                ))}
            </div>
        </section>
    )
;
