import {X} from "lucide-react";

interface WindowFrameProps {
    filename: string;
    className?: string;
    /** 지정하면 우측에 닫기 버튼을, 좌측 붉은 점에 같은 동작을 건다. Modal처럼 닫을 대상이 있을 때만 쓴다. */
    onClose?: () => void;
}

const STYLES = {
    // 점 세 개를 한 그룹으로 묶는다. macOS 는 셋 중 어디에 커서를 올려도 기호가
    // 함께 나타나므로, 붉은 점 자신이 아니라 이 묶음의 hover 를 기준으로 삼는다.
    lights: "group/lights flex gap-1.5 shrink-0",
    dot: "w-2.5 h-2.5 rounded-full shrink-0",

    // 점의 지름은 10px 라 그대로는 누르기 어렵다. 음수 마진으로 자리를 되돌려
    // 겉보기 배치를 유지한 채, 안쪽 여백만큼 누를 수 있는 범위를 22px 로 넓힌다.
    // 여백을 이보다 키우면 옆의 노란 점까지 덮어 엉뚱한 곳을 눌러도 닫히게 된다.
    closeDotButton: `relative -m-1.5 p-1.5 rounded-full transition-transform active:scale-90 motion-reduce:transition-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F57] focus-visible:ring-offset-1
        focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1A1A1A]`,
    closeDotGlyph: "w-2 h-2 text-black/55 opacity-0 transition-opacity group-hover/lights:opacity-100 motion-reduce:transition-none",
};

/**
 * 코드 에디터 창 상단 바 흉내: 트래픽 라이트 점 + 가짜 파일명 탭.
 * Projects 카드, 프로젝트 상세 Modal의 시그니처 비주얼로 쓰인다.
 *
 * <p>onClose 를 받으면 붉은 점이 실제 닫기 버튼이 된다. macOS 창과 같은 자리에
 * 같은 동작이 있어야 눌러 볼 만한 것으로 읽힌다. 우측의 X 는 그대로 두는데,
 * 점 위의 기호는 hover 로만 드러나 터치 화면과 스크린 리더에는 닫는 방법이
 * 보이지 않기 때문이다.
 */
export const WindowFrame = ({filename, className = '', onClose}: WindowFrameProps) => (
    <div className={`flex items-center gap-2.5 px-4 sm:px-5 h-9 border-b border-black/5 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] ${className}`}>
        <span className={STYLES.lights}>
            {onClose ? (
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="닫기"
                    title="닫기"
                    className={STYLES.closeDotButton}
                >
                    <span className={`${STYLES.dot} bg-[#FF5F57] flex items-center justify-center`}>
                        <X className={STYLES.closeDotGlyph} strokeWidth={4} aria-hidden/>
                    </span>
                </button>
            ) : (
                <span className={`${STYLES.dot} bg-[#FF5F57]`}/>
            )}
            <span className={`${STYLES.dot} bg-[#FEBC2E]`}/>
            <span className={`${STYLES.dot} bg-[#28C840]`}/>
        </span>
        <span className="font-mono text-[11px] text-gray-400 dark:text-gray-500 truncate flex-1">{filename}</span>
        {onClose && (
            <button
                onClick={onClose}
                aria-label="닫기"
                className="shrink-0 -mr-1.5 p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
                <X size={14}/>
            </button>
        )}
    </div>
);
