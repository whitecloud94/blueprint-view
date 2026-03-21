import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { userSchema, User } from '../../schemas/userSchema';
import { useUserStore } from '../../store/useUserStore';

export const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const { addUser, isLoading } = useUserStore();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      user_id: '',
      user_name: '',
      user_password: '',
      user_email: '',
    },
  });

  const onSubmit = async (data: User) => {
    try {
      await addUser(data);
      alert('사용자가 등록되었습니다!');
      reset();
      navigate('/'); // 등록 성공 후 홈으로 이동
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-[640px] bg-white dark:bg-white/[0.03] rounded-[32px] sm:rounded-[40px] px-5 sm:px-10 py-10 sm:py-12 shadow-sm border border-white dark:border-white/[0.08]">
      <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">사용자 등록</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 아이디 필드 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">아이디</label>
          <input
            {...register('user_id')}
            placeholder="아이디를 입력하세요 (6자 이상)"
            className={`block w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm ${
              errors.user_id ? 'border-red-500' : 'border-gray-100 dark:border-white/10'
            }`}
          />
          {errors.user_id && <p className="mt-1.5 text-xs text-red-500">{errors.user_id.message}</p>}
        </div>

        {/* 이름 필드 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">이름</label>
          <input
            {...register('user_name')}
            placeholder="이름을 입력하세요"
            className={`block w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm ${
              errors.user_name ? 'border-red-500' : 'border-gray-100 dark:border-white/10'
            }`}
          />
          {errors.user_name && <p className="mt-1.5 text-xs text-red-500">{errors.user_name.message}</p>}
        </div>

        {/* 비밀번호 필드 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">비밀번호</label>
          <input
              {...register('user_password')}
              type="password"
              placeholder="비밀번호를 입력하세요 (8자 이상)"
              className={`block w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm ${
                  errors.user_password ? 'border-red-500' : 'border-gray-100 dark:border-white/10'
              }`}
          />
          {errors.user_password && <p className="mt-1.5 text-xs text-red-500">{errors.user_password.message}</p>}
        </div>

        {/* 비밀번호 체크필드 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">비밀번호</label>
          <input
              type="password"
              placeholder="동일한 비밀번호를 입력하세요"
              className={`block w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm ${
                  errors.user_password ? 'border-red-500' : 'border-gray-100 dark:border-white/10'
              }`}
          />
        </div>

        {/* 이메일 필드 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">이메일</label>
          <input
            type="email"
            {...register('user_email')}
            placeholder="example@email.com"
            className={`block w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border rounded-2xl transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm ${
              errors.user_email ? 'border-red-500' : 'border-gray-100 dark:border-white/10'
            }`}
          />
          {errors.user_email && <p className="mt-1.5 text-xs text-red-500">{errors.user_email.message}</p>}
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-4 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none font-bold text-sm transition-all transform active:scale-[0.98] ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.01]'
          }`}
        >
          {isLoading ? '등록 중...' : '등록하기'}
        </button>
      </form>
    </div>
  );
};
