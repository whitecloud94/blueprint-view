import { useRef } from 'react';
import { FileClock } from 'lucide-react';
import { DIALOG_BUTTON_STYLES, Dialog } from '../../../components/common/feedback/Dialog';
import type { DraftRecord } from './useDraftAutosave';

interface DraftRestoreDialogProps {
  /** null 이면 물어볼 것이 없다. */
  draft: DraftRecord | null;
  /** 초안을 쓰기 시작한 뒤 원본이 다른 곳에서 바뀌었는지. */
  isSourceChanged: boolean;
  onRestore: () => void;
  onDiscard: () => void;
}

/**
 * 수정 중이던 내용을 되돌릴지 묻는다.
 *
 * <p>둘 다 안전한 선택은 아니다. 불러오면 최신 원본 대신 옛 내용이 편집기에 올라가고,
 * 버리면 쓰던 것이 사라진다. 그래서 언제 쓰던 것인지와 그사이 원본이 바뀌었는지를
 * 함께 보여준다. 이 두 가지가 판단에 필요한 전부다.
 *
 * <p>ESC 와 바깥 클릭은 '불러오기'로 본다. 되돌릴 수 있는 쪽이기 때문이다. 불러온
 * 내용은 저장하지 않는 한 새로고침으로 원본으로 돌아갈 수 있지만, 버린 초안은
 * 어디에도 남지 않는다.
 */
export const DraftRestoreDialog = ({
  draft,
  isSourceChanged,
  onRestore,
  onDiscard,
}: DraftRestoreDialogProps) => {
  const restoreButtonRef = useRef<HTMLButtonElement>(null);

  if (!draft) {
    return null;
  }

  const description = isSourceChanged
    ? `${formatSavedAt(draft.savedAt)} 쓰다 만 내용이 남아 있습니다. 이 글은 그 뒤에 다른 곳에서 수정됐습니다. 불러오면 최신 원본이 아니라 쓰다 만 내용이 편집기에 올라갑니다.`
    : `${formatSavedAt(draft.savedAt)} 쓰다 만 내용이 남아 있습니다. 불러오면 지금 편집기의 내용을 대신합니다.`;

  return (
    <Dialog
      isOpen
      icon={FileClock}
      tone={isSourceChanged ? 'warning' : 'neutral'}
      title={isSourceChanged ? '그사이 원본이 바뀌었습니다' : '쓰다 만 내용이 있습니다'}
      description={description}
      onClose={onRestore}
      initialFocusRef={restoreButtonRef}
      actions={
        <>
          <button type="button" onClick={onDiscard} className={DIALOG_BUTTON_STYLES.secondary}>
            버리고 원본 보기
          </button>
          <button
            type="button"
            ref={restoreButtonRef}
            onClick={onRestore}
            className={DIALOG_BUTTON_STYLES.primary}
          >
            불러오기
          </button>
        </>
      }
    />
  );
};

/**
 * 초안을 마지막으로 저장한 시각. 뒤에 "쓰다 만"이 이어지므로 조사까지 붙여 돌려준다.
 *
 * <p>"몇 분 전"이 날짜보다 판단에 바로 쓰인다. 자리를 비운 사이의 일인지, 지난주에
 * 두고 간 것인지가 갈린다. 하루가 넘어가면 상대 표기가 오히려 헷갈리므로 날짜로 바꾼다.
 */
function formatSavedAt(savedAt: string): string {
  const saved = new Date(savedAt);
  if (Number.isNaN(saved.getTime())) {
    return '이전에';
  }

  const elapsedMinutes = Math.floor((Date.now() - saved.getTime()) / 60_000);

  if (elapsedMinutes < 1) return '방금';
  if (elapsedMinutes < 60) return `${elapsedMinutes}분 전에`;

  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) return `${elapsedHours}시간 전에`;

  return `${saved.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}에`;
}
