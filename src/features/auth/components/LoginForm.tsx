import type { ReactNode } from 'react';
import { useForm, type SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { signInSchema, type SignInInput } from '../../../schemas/authSchema';
import { useAuthActions, useAuthError } from '../../../store/useAuthStore';
import { useToast } from '../../../hooks/useToast';
import { LiquidToast } from '../../../components/common/feedback/LiquidToast';

const defaultValues: SignInInput = {
  userId: '',
  userPassword: '',
};

/** 로그인 후 돌아갈 위치. RequireAdmin 이 넘겨 준다. */
interface LocationState {
  from?: { pathname: string };
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, resetError } = useAuthActions();
  const authError = useAuthError();
  const { isVisible, message, showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const onValid = async (input: SignInInput) => {
    try {
      await signIn(input);
      const redirectTo = (location.state as LocationState | null)?.from?.pathname ?? '/blog';
      navigate(redirectTo, { replace: true });
    } catch {
      // 스토어가 이미 사용자용 메시지를 담고 있으므로 별도 처리하지 않는다.
    }
  };

  const onInvalid: SubmitErrorHandler<SignInInput> = (formErrors) => {
    const firstError = Object.values(formErrors)[0];
    if (firstError?.message) {
      showToast(firstError.message);
    }
  };

  return (
    <div className="w-full max-w-[480px] bg-white dark:bg-white/[0.03] rounded-[32px] sm:rounded-[40px] px-5 sm:px-10 py-10 sm:py-12 shadow-sm border border-white dark:border-white/[0.08]">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-10 h-10 rounded-2xl bg-accent-50 dark:bg-accent-500/10 flex items-center justify-center text-accent-600 dark:text-accent-400">
          <Lock size={18} aria-hidden="true" />
        </span>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">로그인</h1>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        글 작성과 관리는 관리자 계정으로만 가능합니다.
      </p>

      {authError && (
        <p className="mb-4 text-sm text-red-500" role="alert">
          {authError}
        </p>
      )}

      <form
        onSubmit={handleSubmit(onValid, onInvalid)}
        onChange={resetError}
        className="space-y-6"
        noValidate
      >
        <Field label="아이디" htmlFor="userId" error={errors.userId?.message}>
          <input
            id="userId"
            {...register('userId')}
            autoComplete="username"
            aria-invalid={Boolean(errors.userId)}
            placeholder="아이디를 입력하세요"
            className={inputClass(Boolean(errors.userId))}
          />
        </Field>

        <Field label="비밀번호" htmlFor="userPassword" error={errors.userPassword?.message}>
          <input
            id="userPassword"
            type="password"
            {...register('userPassword')}
            autoComplete="current-password"
            aria-invalid={Boolean(errors.userPassword)}
            placeholder="비밀번호를 입력하세요"
            className={inputClass(Boolean(errors.userPassword))}
          />
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-4 px-4 bg-accent-600 hover:bg-accent-700 text-white rounded-2xl shadow-lg shadow-accent-200 dark:shadow-none font-bold text-sm transition-all transform active:scale-[0.98] ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.01]'
          }`}
        >
          {isSubmitting ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <LiquidToast isVisible={isVisible} message={message} variant="error" />
    </div>
  );
};

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `block w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-accent-500/20 sm:text-sm dark:text-white ${
    hasError ? 'border-red-500' : 'border-gray-100 dark:border-white/10'
  }`;
}
