interface WindowFrameProps {
    filename: string;
    className?: string;
}

/**
 * 코드 에디터 창 상단 바 흉내: 트래픽 라이트 점 + 가짜 파일명 탭.
 * Projects 카드, 프로젝트 상세 Modal의 시그니처 비주얼로 쓰인다.
 */
export const WindowFrame = ({filename, className = ''}: WindowFrameProps) => (
    <div className={`flex items-center gap-2.5 px-4 sm:px-5 h-9 border-b border-black/5 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] ${className}`}>
        <span className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"/>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"/>
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]"/>
        </span>
        <span className="font-mono text-[11px] text-gray-400 dark:text-gray-500 truncate">{filename}</span>
    </div>
);
