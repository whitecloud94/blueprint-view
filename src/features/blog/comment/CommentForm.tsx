import { useForm, type SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { COMMON_STYLES } from '../../../constants/styles';
import { commentFormSchema, type CommentFormData } from '../../../schemas/commentSchema';

interface CommentFormProps {
  /** 답글 폼이면 부모 댓글 번호. 최상위 댓글이면 생략한다. */
  parentId?: number;
  onSubmit: (data: CommentFormData, parentId?: number) => Promise<void>;
  onCancel?: () => void;
  onInvalid?: (message: string) => void;
}

const defaultValues: CommentFormData = {
  guestName: '',
  guestPassword: '',
  content: '',
  website: '',
};

/**
 * 허니팟 입력을 감추는 스타일.
 *
 * display:none 을 쓰지 않는다. 감춰진 것이 티가 나면 폼을 채우는 쪽에서 건너뛴다.
 * 화면 밖으로 밀어 두면 사람 눈에는 보이지 않으면서 DOM 상으로는 평범한 입력이다.
 */
const HONEYPOT_STYLE: React.CSSProperties = {
  position: 'absolute',
  left: '-9999px',
  width: '1px',
  height: '1px',
  opacity: 0,
};

/**
 * 댓글/답글 작성 폼.
 *
 * <p>최상위 댓글과 답글이 받는 값이 같아 하나로 쓴다. 차이는 parentId 뿐이다.
 *
 * <p>비밀번호를 함께 받는 이유는 가입 없이 쓴 댓글을 나중에 수정·삭제하기 위해서다.
 *
 * <p>스팸 방어용 허니팟 입력이 하나 숨어 있다. 키보드 순서와 스크린리더에서 모두
 * 빠지므로 실제 사용자는 존재 자체를 알 수 없다.
 */
export const CommentForm = ({ parentId, onSubmit, onCancel, onInvalid }: CommentFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const onValid = async (data: CommentFormData) => {
    await onSubmit(data, parentId);
    reset(defaultValues);
  };

  const handleInvalid: SubmitErrorHandler<CommentFormData> = (formErrors) => {
    const firstError = Object.values(formErrors)[0];
    if (firstError?.message) onInvalid?.(firstError.message);
  };

  return (
    <form onSubmit={handleSubmit(onValid, handleInvalid)} className="space-y-3" noValidate>
      <input
        {...register('website')}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={HONEYPOT_STYLE}
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          {...register('guestName')}
          placeholder="닉네임"
          autoComplete="nickname"
          aria-label="닉네임"
          aria-invalid={Boolean(errors.guestName)}
          className={inputClass(Boolean(errors.guestName))}
        />
        <input
          {...register('guestPassword')}
          type="password"
          placeholder="비밀번호"
          autoComplete="new-password"
          aria-label="비밀번호"
          aria-invalid={Boolean(errors.guestPassword)}
          className={inputClass(Boolean(errors.guestPassword))}
        />
      </div>

      <textarea
        {...register('content')}
        rows={parentId ? 2 : 3}
        placeholder={parentId ? '답글을 입력하세요' : '댓글을 입력하세요'}
        aria-label={parentId ? '답글 내용' : '댓글 내용'}
        aria-invalid={Boolean(errors.content)}
        className={`${inputClass(Boolean(errors.content))} resize-none leading-relaxed`}
      />

      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            취소
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${COMMON_STYLES.primaryButton} dark:bg-white dark:text-black px-5 py-2 text-sm disabled:opacity-50`}
        >
          <Send size={14} /> {isSubmitting ? '등록 중...' : '등록'}
        </button>
      </div>
    </form>
  );
};

function inputClass(hasError: boolean) {
  return `block w-full px-4 py-2.5 bg-gray-50 dark:bg-black/20 border rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 ${
    hasError ? 'border-red-500' : 'border-gray-100 dark:border-white/10'
  }`;
}
