import { z } from 'zod';

export const postSchema = z.object({
  post_id: z.number().optional(),
  title_name: z.string().min(1, '제목을 입력해주세요.').max(300, '제목은 최대 300자까지 가능합니다.').nullable(),
  content: z.string().min(1, '내용을 입력해주세요.').nullable(),
  excerpt: z.string().max(200, '요약은 최대 200자까지 가능합니다.').nullable(),
  writer: z.string().min(1, '작성자는 필수입니다.').max(100).default('admin').nullable(),
  board_status_code: z.string().max(10).default('01').nullable(),
  view_count: z.number().default(0).nullable(),
  like_count: z.number().default(0).nullable(),
  created_at: z.string().datetime().optional(),
  created_by: z.string().max(50).optional(),
  updated_at: z.string().datetime().optional(),
  updated_by: z.string().max(50).optional(),
});
export type Post = z.infer<typeof postSchema>;
export type PostInput = z.input<typeof postSchema>;
