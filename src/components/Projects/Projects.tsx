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
import { ProjectItem } from "./ProjectItem.tsx";

const STYLES = {
    wrapper: `
        bg-white/40 backdrop-blur-2xl 
        rounded-[28px] sm:rounded-[32px] 
        p-1.5 sm:p-2 space-y-1 
        border border-white/40 
        shadow-[0_8px_32px_rgba(0,0,0,0.03)]
    `,

    header: "flex justify-between items-center px-4 sm:px-6 py-4",

    viewAllBtn: `
        bg-white/60 backdrop-blur-md 
        border border-white/60 
        px-3 py-1 rounded-full 
        text-[10px] sm:text-[11px] font-bold text-gray-600 
        flex items-center gap-1 
        hover:bg-white/80 transition-all shadow-sm
    `,

    listWrapper: "flex flex-col gap-1.5",

    activeBadge: "hidden xs:inline-block text-[8px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-md font-black animate-pulse",

    sectionHeader: "flex items-center gap-2 text-[13px] sm:text-[14px] text-gray-400 font-medium",
};

const projects = [
    {
        title: 'Toyota Financial Core',
        sub: "Core시스템 운영관리",
        icon: <CarFront size={20} className="sm:w-[22px]"/>,
        bg: 'bg-indigo-600',
        active: true
    },
    {
        title: 'IBK 기업은행 업무지원 시스템',
        sub: '실시간 연계(EAI) 인터페이스 설계 및 구현',
        icon: <Briefcase size={20} className="sm:w-[22px]"/>,
        bg: 'bg-[#1A1A1A]'
    },
    {
        title: 'IBK 기업은행 상시감시 시스템',
        sub: 'Spring Batch 기반 데이터 처리 및 공통 모듈 구현',
        icon: <ShieldCheck size={20} className="sm:w-[22px]"/>,
        bg: 'bg-[#1A1A1A]'
    },
    {
        title: 'IBK 기업은행 ESG 탄소중립 HUB',
        sub: '실시간 연계(EAI) 로직 구현 및 관리자 화면 구현',
        icon: <Leaf size={20} className="sm:w-[22px]"/>,
        bg: 'bg-[#1A1A1A]'
    },
    {
        title: 'BNK 경남은행 시니어 뱅킹 및 모바일 뱅킹 메인화면 개편',
        sub: '메인이체, 거래내역조회 등 다수 화면 및 관리자 화면 구현',
        icon: <Smartphone size={20} className="sm:w-[22px]"/>,
        bg: 'bg-[#1A1A1A]'
    },
    {
        title: 'IBK 기업은행 투자상품 통합관리 시스템',
        sub: '비즈니스 로직 구현 및 Spring Batch 기반의 DW 데이터 처리 로직 구현',
        icon: <LineChart size={20} className="sm:w-[22px]"/>,
        bg: 'bg-[#1A1A1A]'
    },
    {
        title: 'BNK 경남은행 비대면 제증명서 발급 서비스',
        sub: '레포트 레이아웃 작성 및 비즈니스 로직 구현',
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
);
