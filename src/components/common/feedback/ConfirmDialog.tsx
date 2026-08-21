import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { COMMON_STYLES } from '../../../constants/styles';

const STYLES = {
  overlay:
    'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 dark:bg-black/70 backdrop-blur-[5px]',
  container:
    'relative w-full max-w-[420px] bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-none p-8',
  iconBox:
    'w-11 h-11 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500 mb-5',
  title: 'text-xl font-black text-gray-900 dark:text-white mb-2',
  description: 'text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-7',
  actions: 'flex gap-2 justify-end',
  cancel: `${COMMON_STYLES.secondaryButton} dark:bg-white/10 dark:text-white dark:border-white/15 px-5 py-2.5 text-sm`,
  confirm:
    'bg-red-500 hover:bg-red-600 text-white rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 px-5 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed',
};

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

  // 파괴적 동작이므로 열렸을 때 포커스를 '취소'에 둔다. Enter 를 잘못 눌러
  // 삭제가 실행되는 상황을 만들지 않는다.
  useEffect(() => {
    if (isOpen) {
      cancelButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={STYLES.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
            className={STYLES.container}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            // 내용 영역 클릭이 오버레이까지 전파돼 닫히지 않도록 막는다.
            onClick={(event) => event.stopPropagation()}
          >
            <div className={STYLES.iconBox}>
              <AlertTriangle size={20} aria-hidden="true" />
            </div>

            <h2 id="confirm-dialog-title" className={STYLES.title}>
              {title}
            </h2>
            <p id="confirm-dialog-description" className={STYLES.description}>
              {description}
            </p>

            <div className={STYLES.actions}>
              <button type="button" ref={cancelButtonRef} onClick={onCancel} className={STYLES.cancel}>
                {cancelLabel}
              </button>
              <button type="button" onClick={onConfirm} disabled={isProcessing} className={STYLES.confirm}>
                {isProcessing ? '처리 중...' : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
