import type { ReactNode } from 'react';
import { useForm, type SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import {
  userRegisterFormSchema,
  type UserRegisterFormData,
} from '../../schemas/userSchema';
import { useUserActions, useUserError, useUserLoading } from '../../store/useUserStore';

const defaultValues: UserRegisterFormData = {
  userId: '',
  userName: '',
  userPassword: '',
  confirmPassword: '',
  userEmail: '',
};

export const UserForm = () => {
  const navigate = useNavigate();
  const { addUser } = useUserActions();
  const isLoading = useUserLoading();
  const error = useUserError();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterFormData>({
    resolver: zodResolver(userRegisterFormSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const onValid = async ({ userId, userPassword, userName, userEmail }: UserRegisterFormData) => {
    await addUser({ userId, userPassword, userName, userEmail });
    reset(defaultValues);
    navigate('/');
  };

  const onInvalid: SubmitErrorHandler<UserRegisterFormData> = (formErrors) => {
    const firstError = Object.values(formErrors)[0];
    if (firstError?.message) {
      alert(firstError.message);
    }
  };

  return (
    <div className="w-full max-w-[640px] bg-white dark:bg-white/[0.03] rounded-[32px] sm:rounded-[40px] px-5 sm:px-10 py-10 sm:py-12 shadow-sm border border-white dark:border-white/[0.08]">
      <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">사용자 등록</h2>

      {error && (
        <p className="mb-4 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-6" noValidate>
        <Field label="아이디" error={errors.userId?.message}>
          <input
            id="userId"
            {...register('userId')}
            autoComplete="username"
            aria-invalid={Boolean(errors.userId)}
            placeholder="아이디를 입력하세요 (6자 이상)"
            className={inputClass(Boolean(errors.userId))}
          />
        </Field>

        <Field label="이름" error={errors.userName?.message}>
          <input
            id="userName"
            {...register('userName')}
            autoComplete="name"
            aria-invalid={Boolean(errors.userName)}
            placeholder="이름을 입력하세요"
            className={inputClass(Boolean(errors.userName))}
          />
        </Field>

        <Field label="비밀번호" error={errors.userPassword?.message}>
          <input
            id="userPassword"
            type="password"
            {...register('userPassword')}
            autoComplete="new-password"
            aria-invalid={Boolean(errors.userPassword)}
            placeholder="비밀번호를 입력하세요 (8자 이상)"
            className={inputClass(Boolean(errors.userPassword))}
          />
        </Field>

        <Field label="비밀번호 확인" error={errors.confirmPassword?.message}>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            autoComplete="new-password"
            aria-invalid={Boolean(errors.confirmPassword)}
            placeholder="동일한 비밀번호를 입력하세요"
            className={inputClass(Boolean(errors.confirmPassword))}
          />
        </Field>

        <Field label="이메일" error={errors.userEmail?.message}>
          <input
            id="userEmail"
            type="email"
            {...register('userEmail')}
            autoComplete="email"
            aria-invalid={Boolean(errors.userEmail)}
            placeholder="example@email.com"
            className={inputClass(Boolean(errors.userEmail))}
          />
        </Field>

        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className={`w-full flex justify-center py-4 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none font-bold text-sm transition-all transform active:scale-[0.98] ${
            isLoading || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.01]'
          }`}
        >
          {isLoading || isSubmitting ? '등록 중...' : '등록하기'}
        </button>
      </form>
    </div>
  );
};

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
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
  return `block w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm ${
    hasError ? 'border-red-500' : 'border-gray-100 dark:border-white/10'
  }`;
}
