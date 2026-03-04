import {
    ArrowUpRight
} from 'lucide-react';
import {ProjectItem} from "./ProjectItem.tsx";
import {Modal} from "../../../components/common/feedback/Modal.tsx";
import {useState} from "react";
import { COMMON_STYLES } from "../../../constants/styles.ts";
import {AnimatePresence} from "framer-motion";
import { PROJECTS } from "../../../data";
import { Project } from "../../../types";
import {useToast} from "../../../hooks/useToast.ts";
import {LiquidToast} from "../../../components/common/feedback/LiquidToast.tsx";

const STYLES = {
    wrapper: `${COMMON_STYLES.glass} ${COMMON_STYLES.card}`,
    header: "flex justify-between items-center px-4 sm:px-6 py-4",
    viewAllBtn: `${COMMON_STYLES.secondaryButton} px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold text-gray-600 flex items-center gap-1 hover:bg-white/80 transition-all shadow-sm`,
    listWrapper: "flex flex-col gap-1.5",
    sectionHeader: COMMON_STYLES.sectionHeader,
    dot: COMMON_STYLES.dot,
};

export const Projects = () => {
    // 1. 현재 어떤 프로젝트가 선택되었는지 관리하는 상태
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const {isVisible, message, showDevToast} = useToast();

    // 2. 모달을 닫는 콜백 함수
    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    return (
        <section id="projects" className={`${STYLES.wrapper} mb-6`}>
            <div className={STYLES.header}>
                <div className={STYLES.sectionHeader}>
                    <div className={STYLES.dot}/>
                    Projects
                </div>
                <button className={STYLES.viewAllBtn} onClick={showDevToast}>
                    View All <ArrowUpRight size={12}/>
                </button>
            </div>

            <div className={STYLES.listWrapper}>
                {PROJECTS.map((item, i) => (
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
            <LiquidToast isVisible={isVisible} message={message} />
        </section>
    );
};
