import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().optional(),
  userId: z.string().min(6, '아이디는 최소 6글자 이상이어야 합니다.').max(50),
  userPassword: z.string().min(8, '비밀번호는 최소 8글자 이상이어야 합니다.').max(255),
  userName: z.string().min(2, '이름은 최소 2글자 이상이어야 합니다.').max(100),
  userEmail: z.string().email('유효한 이메일 주소를 입력해주세요.').max(100).nullable(),
  accountStatusCode: z.string().max(10).optional(),
  loginFailCount: z.number().default(0).optional(),
  passwordModifyDate: z.string().datetime().optional(),
  lastLoginAt: z.string().datetime().optional(),
  createdAt: z.string().datetime().optional(),
  createdBy: z.string().max(50).optional(),
  updatedAt: z.string().datetime().optional(),
  updatedBy: z.string().max(50).optional(),
});

export type User = z.infer<typeof userSchema>;
