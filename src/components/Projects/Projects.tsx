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
import {ProjectItem} from "./ProjectItem.tsx";
import {Modal} from "../popup/Modal.tsx";
import {useState} from "react";
import { COMMON_STYLES } from "../../constants/styles";
import {AnimatePresence} from "framer-motion";

const STYLES = {
    wrapper: `${COMMON_STYLES.glass} ${COMMON_STYLES.card}`,
    header: "flex justify-between items-center px-4 sm:px-6 py-4",
    viewAllBtn: `bg-white/60 backdrop-blur-md border border-white/60 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold text-gray-600 flex items-center gap-1 hover:bg-white/80 transition-all shadow-sm`,
    listWrapper: "flex flex-col gap-1.5",
    sectionHeader: COMMON_STYLES.sectionHeader,
    dot: COMMON_STYLES.dot,
};

const projects = [
    {
        id: 1, // 모달 연동을 위해 고유 ID 추가를 추천합니다
        title: 'Toyota Financial Core',
        sub: "Core시스템 운영관리",
        icon: <CarFront size={20} className="sm:w-[22px]"/>,
        bg: 'bg-indigo-600',
        active: true,
        achievements: [
            "여신 계정계 코어 시스템 운영 및 유지보수",
            "대량 데이터 처리 및 배치 프로세스 최적화",
            "금융 규제 준수를 위한 시스템 로직 수정"
        ],
        tech: ["Java", "Spring Boot", "Oracle", "JEUS"]
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

export const Projects = () => {
    // 1. 현재 어떤 프로젝트가 선택되었는지 관리하는 상태
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    // 2. 모달을 닫는 콜백 함수
    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    return (
        <section className={`${STYLES.wrapper} mb-6`}>
            <div className={STYLES.header}>
                <div className={STYLES.sectionHeader}>
                    <div className={STYLES.dot}/>
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
                        // 3. 클릭 시 해당 아이템 데이터를 상태에 저장
                        onClick={() => setSelectedProject(item)}
                    />
                ))}
            </div>

            {/* 4. 선택된 프로젝트가 있을 때만 모달 렌더링 */}
            <AnimatePresence>
                {selectedProject && (
                    <Modal
                        project={selectedProject}
                        onClose={handleCloseModal}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};
