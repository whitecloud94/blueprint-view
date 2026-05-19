import { z } from 'zod';
import { auditFieldsSchema } from './auditSchema';

export const userSchema = z
  .object({
    id: z.number().optional(),
    userId: z.string().min(6, '아이디는 최소 6글자 이상이어야 합니다.').max(50),
    userPassword: z.string().min(8).max(255).optional(),
    userName: z.string().min(2, '이름은 최소 2글자 이상이어야 합니다.').max(100),
    userEmail: z.string().email('유효한 이메일 주소를 입력해주세요.').max(100).optional(),
    accountStatusCode: z.string().max(10).optional(),
    loginFailCount: z.number().optional(),
    passwordModifyDate: z.string().optional(),
    lastLoginAt: z.string().optional(),
  })
  .extend(auditFieldsSchema.shape);

export type User = z.output<typeof userSchema>;

export const userRegisterSchema = z.object({
  userId: z.string().min(6, '아이디는 최소 6글자 이상이어야 합니다.').max(50),
  userPassword: z.string().min(8, '비밀번호는 최소 8글자 이상이어야 합니다.').max(255),
  userName: z.string().min(2, '이름은 최소 2글자 이상이어야 합니다.').max(100),
  userEmail: z.string().email('유효한 이메일 주소를 입력해주세요.').max(100),
});

export type UserRegister = z.output<typeof userRegisterSchema>;

export const userRegisterFormSchema = userRegisterSchema
  .extend({
    confirmPassword: z.string().min(8, '비밀번호 확인을 입력해주세요.').max(255),
  })
  .refine((data) => data.userPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type UserRegisterFormData = z.infer<typeof userRegisterFormSchema>;

export const userResponseSchema = userSchema.omit({ userPassword: true });

export type UserResponse = z.output<typeof userResponseSchema>;
