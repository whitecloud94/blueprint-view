import { z } from 'zod';
import { auditFieldsSchema } from './auditSchema';

/** 서버 PostStatus enum 과 짝을 이룬다. */
export const postStatusSchema = z.enum(['DRAFT', 'PUBLISHED']);

export type PostStatus = z.infer<typeof postStatusSchema>;

export const postSchema = z
  .object({
    postId: z.number().optional(),
    titleName: z.string().min(1, '제목을 입력해주세요.').max(300),
    content: z.string().min(1, '내용을 입력해주세요.'),
    excerpt: z.string().max(200, '요약은 최대 200자까지 가능합니다.').optional(),
    writer: z.string().min(1).max(100),
    status: postStatusSchema,
    viewCount: z.number().optional(),
    likeCount: z.number().optional(),
  })
  .extend(auditFieldsSchema.shape);

export type Post = z.output<typeof postSchema>;

/**
 * 게시글 저장 요청.
 *
 * writer 를 담지 않는다. 작성자는 서버가 인증된 토큰의 주체에서 결정하며,
 * 클라이언트가 보낸 값은 무시된다.
 */
export const postSaveRequestSchema = z.object({
  titleName: z.string().min(1, '제목을 입력해주세요.').max(300),
  content: z.string().min(1, '내용을 입력해주세요.'),
  excerpt: z.string().max(200, '요약은 최대 200자까지 가능합니다.').optional(),
  status: postStatusSchema,
});

export type PostSaveRequest = z.output<typeof postSaveRequestSchema>;

export const postSaveResponseSchema = postSchema.pick({
  postId: true,
  titleName: true,
  content: true,
  excerpt: true,
  writer: true,
  status: true,
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
