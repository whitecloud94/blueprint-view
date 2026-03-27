import { z } from 'zod';

export const postSchema = z.object({
  postId: z.number().optional(),
  titleName: z.string().min(1, '제목을 입력해주세요.').max(300, '제목은 최대 300자까지 가능합니다.').nullable(),
  content: z.string().min(1, '내용을 입력해주세요.').nullable(),
  excerpt: z.string().max(200, '요약은 최대 200자까지 가능합니다.').nullable(),
  writer: z.string().min(1, '작성자는 필수입니다.').max(100).default('admin').nullable(),
  boardStatusCode: z.string().max(10).default('01').nullable(),
  viewCount: z.number().default(0).nullable(),
  likeCount: z.number().default(0).nullable(),
  createdAt: z.string().datetime().optional(),
  createdBy: z.string().max(50).optional(),
  updatedAt: z.string().datetime().optional(),
  updatedBy: z.string().max(50).optional(),
});
export type Post = z.infer<typeof postSchema>;
export type PostInput = z.input<typeof postSchema>;
