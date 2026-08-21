import { useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { DIALOG_BUTTON_STYLES, Dialog } from './Dialog';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isProcessing?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * 되돌릴 수 없는 동작을 실행하기 전 확인을 받는 대화상자.
 *
 * <p>window.confirm 을 쓰지 않는 이유는 브라우저 기본 대화상자가 앱의 시각적
 * 맥락에서 벗어나고 문구를 다듬을 수 없기 때문이다.
 */
export const ConfirmDialog = ({
  isOpen,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  isProcessing = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog
      isOpen={isOpen}
      icon={AlertTriangle}
      tone="danger"
      title={title}
      description={description}
      onClose={onCancel}
      // 파괴적 동작이므로 포커스를 '취소'에 둔다. Enter 를 잘못 눌러 실행되는 상황을 막는다.
      initialFocusRef={cancelButtonRef}
      actions={
        <>
          <button
            type="button"
            ref={cancelButtonRef}
            onClick={onCancel}
            className={DIALOG_BUTTON_STYLES.secondary}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className={DIALOG_BUTTON_STYLES.danger}
          >
            {isProcessing ? '처리 중...' : confirmLabel}
          </button>
        </>
      }
    />
  );
};
