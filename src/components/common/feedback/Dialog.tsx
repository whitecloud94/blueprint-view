import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

/** 아이콘 색조. 대화상자의 성격을 색으로 먼저 알린다. */
export type DialogTone = 'danger' | 'warning' | 'neutral';

const TONE_STYLES: Record<DialogTone, string> = {
  danger: 'bg-red-50 dark:bg-red-500/10 text-red-500',
  warning: 'bg-amber-50 dark:bg-amber-500/10 text-amber-500',
  neutral: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 dark:text-indigo-400',
};

const STYLES = {
  overlay:
    'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 dark:bg-black/70 backdrop-blur-[5px]',
  container:
    'relative w-full max-w-[420px] bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-none p-8',
  iconBox: 'w-11 h-11 rounded-2xl flex items-center justify-center mb-5',
  title: 'text-xl font-black text-gray-900 dark:text-white mb-2',
  description: 'text-sm text-gray-500 dark:text-gray-400 leading-relaxed',
  meta: 'mt-4 font-mono text-[11px] text-gray-400 dark:text-gray-600',
  actions: 'flex flex-wrap gap-2 justify-end mt-7',
};

interface DialogProps {
  isOpen: boolean;
  icon: LucideIcon;
  tone?: DialogTone;
  title: string;
  description: string;
  /** 부가 정보(오류 식별자 등). 본문보다 약하게 표기한다. */
  meta?: string;
  /** 제목·설명과 버튼 사이에 들어갈 추가 내용(입력 필드 등). */
  children?: ReactNode;
  /** 버튼 영역. */
  actions: ReactNode;
  onClose: () => void;
  /** 열렸을 때 포커스를 둘 요소. 지정하지 않으면 대화상자 자체에 둔다. */
  initialFocusRef?: RefObject<HTMLElement | null>;
}

/**
 * 대화상자 공통 껍데기.
 *
 * <p>확인 요청과 오류 알림이 각자 다른 모양을 가지면 사용자는 매번 새로운 화면을
 * 읽어야 한다. 레이아웃·애니메이션·닫기 동작을 여기 한 곳에 두고, 각 대화상자는
 * 아이콘과 문구, 버튼만 정한다.
 *
 * <p>ESC 로 닫히고 오버레이 클릭으로도 닫힌다. 포커스를 안으로 옮겨 키보드 사용자가
 * 뒤쪽 화면을 헤매지 않게 한다.
 */
export const Dialog = ({
  isOpen,
  icon: Icon,
  tone = 'neutral',
  title,
  description,
  meta,
  children,
  actions,
  onClose,
  initialFocusRef,
}: DialogProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // 지정된 요소가 없으면 대화상자 자체에 포커스를 준다. 파괴적 동작을 가진
    // 대화상자는 호출자가 '취소' 버튼을 지정해 오조작을 막는다.
    const target = initialFocusRef?.current ?? containerRef.current;
    target?.focus();
  }, [isOpen, initialFocusRef]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={STYLES.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            tabIndex={-1}
            className={`${STYLES.container} outline-none`}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            // 내용 영역 클릭이 오버레이까지 전파돼 닫히지 않도록 막는다.
            onClick={(event) => event.stopPropagation()}
          >
            <div className={`${STYLES.iconBox} ${TONE_STYLES[tone]}`}>
              <Icon size={20} aria-hidden="true" />
            </div>

            <h2 id="dialog-title" className={STYLES.title}>
              {title}
            </h2>
            <p id="dialog-description" className={STYLES.description}>
              {description}
            </p>

            {meta && <p className={STYLES.meta}>{meta}</p>}

            {children && <div className="mt-5">{children}</div>}

            <div className={STYLES.actions}>{actions}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

/** 대화상자 버튼 표기. 모든 대화상자가 같은 크기·모양을 갖도록 고정한다. */
export const DIALOG_BUTTON_STYLES = {
  primary:
    'bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 px-5 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed',
  danger:
    'bg-red-500 hover:bg-red-600 text-white rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 px-5 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed',
  secondary:
    'bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/15 text-gray-900 dark:text-white rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-white dark:hover:bg-white/15 active:scale-95 px-5 py-2.5 text-sm',
};
