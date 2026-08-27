interface SectionMarkerProps {
    /** 두 자리 순번 문자열. 예: "01" */
    index: string;
    label: string;
    className?: string;
}

/**
 * 코드 인덱스 스타일 섹션 라벨. `01 // PROJECTS` 형태로 점(dot) 마커를 대체한다.
 */
export const SectionMarker = ({index, label, className = ''}: SectionMarkerProps) => (
    <div className={`flex items-center gap-2 font-mono text-[11px] sm:text-[12px] font-bold tracking-[0.15em] uppercase ${className}`}>
        <span className="text-accent-500 dark:text-accent-400">{index}</span>
        <span className="text-gray-300 dark:text-gray-600">//</span>
        <span className="text-gray-500 dark:text-gray-400">{label}</span>
    </div>
);
