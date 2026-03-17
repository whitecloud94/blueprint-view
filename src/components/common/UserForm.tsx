import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, User } from '../../schemas/userSchema';
import { useUserStore } from '../../store/useUserStore';

export const UserForm: React.FC = () => {
  const { addUser, isLoading } = useUserStore();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 20,
    },
  });

  const onSubmit = async (data: User) => {
    await addUser(data);
    alert('사용자가 등록되었습니다!');
    reset();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">사용자 등록</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 이름 필드 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">이름</label>
          <input
            {...register('name')}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* 이메일 필드 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">이메일</label>
          <input
            type="email"
            {...register('email')}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* 나이 필드 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">나이</label>
          <input
            type="number"
            {...register('age', { valueAsNumber: true })}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
              errors.age ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age.message}</p>}
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? '등록 중...' : '등록하기'}
        </button>
      </form>
    </div>
  );
};
