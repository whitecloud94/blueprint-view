import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().optional(),
  user_id: z.string().min(6, '아이디는 최소 6글자 이상이어야 합니다.').max(50),
  user_password: z.string().min(8, '비밀번호는 최소 8글자 이상이어야 합니다.').max(255),
  user_name: z.string().min(2, '이름은 최소 2글자 이상이어야 합니다.').max(100),
  user_email: z.string().email('유효한 이메일 주소를 입력해주세요.').max(100).nullable(),
  account_status_code: z.string().max(10).optional(),
  login_fail_count: z.number().default(0).optional(),
  password_modify_date: z.string().datetime().optional(),
  last_login_at: z.string().datetime().optional(),
  created_at: z.string().datetime().optional(),
  created_by: z.string().max(50).optional(),
  updated_at: z.string().datetime().optional(),
  updated_by: z.string().max(50).optional(),
});

export type User = z.infer<typeof userSchema>;
