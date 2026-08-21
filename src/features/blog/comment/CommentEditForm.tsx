import { useState, type FormEvent } from 'react';
import { COMMON_STYLES } from '../../../constants/styles';

interface CommentEditFormProps {
  initialContent: string;
  isProcessing?: boolean;
  /** 서버가 돌려준 실패 사유. 폼을 닫지 않고 자리에서 보여준다. */
  errorMessage?: string;
  onSubmit: (content: string, password: string) => void;
  onCancel: () => void;
}

/**
 * 댓글 인라인 수정 폼.
 *
 * <p>내용과 비밀번호를 한 자리에서 받는다. 내용을 따로 물어보고 비밀번호를 다시
 * 묻는 2단계로 만들면, 비밀번호가 틀렸을 때 사용자가 수정 내용부터 다시 써야 한다.
 */
export const CommentEditForm = ({
  initialContent,
  isProcessing = false,
  errorMessage,
  onSubmit,
  onCancel,
}: CommentEditFormProps) => {
  const [content, setContent] = useState(initialContent);
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (content.trim() && password) {
      onSubmit(content.trim(), password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-1">
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={3}
        aria-label="수정할 내용"
        className={`${inputClass(false)} resize-none leading-relaxed`}
      />
      <div className="flex gap-2">
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="작성 시 입력한 비밀번호"
          autoComplete="off"
          aria-label="비밀번호"
          aria-invalid={Boolean(errorMessage)}
          className={inputClass(Boolean(errorMessage))}
        />
        <button
          type="button"
          onClick={onCancel}
          className="shrink-0 px-4 py-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isProcessing || !content.trim() || !password}
          className={`${COMMON_STYLES.primaryButton} dark:bg-white dark:text-black shrink-0 px-5 py-2 text-sm disabled:opacity-50`}
        >
          {isProcessing ? '저장 중...' : '저장'}
        </button>
      </div>
      {errorMessage && (
        <p className="text-xs text-red-500" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
};

function inputClass(hasError: boolean) {
  return `block w-full px-4 py-2.5 bg-gray-50 dark:bg-black/20 border rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 ${
    hasError ? 'border-red-500' : 'border-gray-100 dark:border-white/10'
  }`;
}
