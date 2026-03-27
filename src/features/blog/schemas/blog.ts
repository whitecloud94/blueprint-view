import { z } from 'zod';

export const blogPostSchema = z.object({
  titleName: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(300, '제목은 최대 300자까지 가능합니다.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  excerpt: z.string().max(200, '요약은 최대 200자까지 가능합니다.').optional(),
});

export type BlogPostData = z.infer<typeof blogPostSchema>;
