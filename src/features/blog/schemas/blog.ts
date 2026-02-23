import { z } from 'zod';

export const blogPostSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(100, '제목은 최대 100자까지 가능합니다.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  tags: z.array(z.string()).max(10, '태그는 최대 10개까지 추가할 수 있습니다.'),
  relatedProjectId: z.number().nullable(),
});

export type BlogPostData = z.infer<typeof blogPostSchema>;
