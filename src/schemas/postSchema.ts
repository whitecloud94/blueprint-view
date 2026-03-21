import { z } from 'zod';

export const postSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(100, '제목은 최대 100자까지 가능합니다.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  writer: z.string().min(1, 'Writer is required'),
});

export type Post = z.infer<typeof postSchema>;