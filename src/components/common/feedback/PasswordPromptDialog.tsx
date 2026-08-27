import { useEffect, useRef, useState, type FormEvent } from 'react';
import { KeyRound } from 'lucide-react';
import { DIALOG_BUTTON_STYLES, Dialog } from './Dialog';

interface PasswordPromptDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  isProcessing?: boolean;
  /** 서버가 돌려준 실패 사유. 대화상자를 닫지 않고 자리에서 보여준다. */
  errorMessage?: string;
  onConfirm: (password: string) => void;
  onCancel: () => void;
}

/**
 * 비밀번호 확인 대화상자.
 *
 * <p>익명 댓글은 작성 시 입력한 비밀번호로 본인을 확인한다. 수정과 삭제가 같은
 * 확인 절차를 쓰므로 한 컴포넌트로 둔다.
 *
 * <p>실패해도 대화상자를 닫지 않는다. 닫으면 사용자가 처음부터 다시 시작해야 한다.
 */
export const PasswordPromptDialog = ({
  isOpen,
  title,
  description,
  confirmLabel = '확인',
  isProcessing = false,
  errorMessage,
  onConfirm,
  onCancel,
}: PasswordPromptDialogProps) => {
  const [password, setPassword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // 다시 열었을 때 이전 입력이 남아 있지 않도록 비운다.
  useEffect(() => {
    if (isOpen) setPassword('');
  }, [isOpen]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (password) onConfirm(password);
  };

  return (
    <Dialog
      isOpen={isOpen}
      icon={KeyRound}
      tone="neutral"
      title={title}
      description={description}
      onClose={onCancel}
      initialFocusRef={inputRef}
      actions={
        <>
          <button type="button" onClick={onCancel} className={DIALOG_BUTTON_STYLES.secondary}>
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isProcessing || !password}
            className={DIALOG_BUTTON_STYLES.primary}
          >
            {isProcessing ? '처리 중...' : confirmLabel}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment-password" className="sr-only">
          비밀번호
        </label>
        <input
          id="comment-password"
          ref={inputRef}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="off"
          placeholder="작성 시 입력한 비밀번호"
          aria-invalid={Boolean(errorMessage)}
          className={`block w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:text-white ${
            errorMessage ? 'border-red-500' : 'border-gray-100 dark:border-white/10'
          }`}
        />
        {errorMessage && (
          <p className="mt-2 text-xs text-red-500" role="alert">
            {errorMessage}
          </p>
        )}
      </form>
    </Dialog>
  );
};
