import { z } from 'zod';
import { auditFieldsSchema } from './auditSchema';

export const postSchema = z
  .object({
    postId: z.number().optional(),
    titleName: z.string().min(1, '제목을 입력해주세요.').max(300),
    content: z.string().min(1, '내용을 입력해주세요.'),
    excerpt: z.string().max(200, '요약은 최대 200자까지 가능합니다.').optional(),
    writer: z.string().min(1).max(100),
    boardStatusCode: z.string().max(10),
    viewCount: z.number().optional(),
    likeCount: z.number().optional(),
  })
  .extend(auditFieldsSchema.shape);

export type Post = z.output<typeof postSchema>;

export const postSaveRequestSchema = z.object({
  titleName: z.string().min(1, '제목을 입력해주세요.').max(300),
  content: z.string().min(1, '내용을 입력해주세요.'),
  excerpt: z.string().max(200, '요약은 최대 200자까지 가능합니다.').optional(),
  writer: z.string().min(1).max(100).default('admin'),
  boardStatusCode: z.string().max(10).default('01'),
});

export type PostSaveRequest = z.output<typeof postSaveRequestSchema>;

export const postSaveResponseSchema = postSchema.pick({
  postId: true,
  titleName: true,
  content: true,
  excerpt: true,
  writer: true,
  boardStatusCode: true,
  createdAt: true,
  createdBy: true,
});

export type PostSaveResponse = z.output<typeof postSaveResponseSchema>;

export const postFormSchema = z.object({
  titleName: z.string().min(1, '제목을 입력해주세요.').max(300),
  content: z.string().min(1, '내용을 입력해주세요.'),
  excerpt: z.string().max(200, '요약은 최대 200자까지 가능합니다').optional(),
});

export type PostFormData = z.infer<typeof postFormSchema>;
