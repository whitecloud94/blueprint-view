import { z } from 'zod';

export const userSchema = z.object({
  user_id: z.string().min(6, '아이디는 최소 6글자 이상이어야 합니다.'),
  user_name: z.string().min(2, '이름은 최소 2글자 이상이어야 합니다.'),
  user_password: z.string().min(8, '비밀번호는 최소 8글자 이상이어야 합니다.'),
  user_email: z.email('유효한 이메일 주소를 입력해주세요.'),
});

export type User = z.infer<typeof userSchema>;
