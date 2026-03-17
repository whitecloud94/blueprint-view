import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, '이름은 최소 2글자 이상이어야 합니다.'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요.'),
  age: z.number().min(0, '나이는 0세 이상이어야 합니다.').max(120, '나이는 120세 이하여야 합니다.'),
});

export type User = z.infer<typeof userSchema>;
