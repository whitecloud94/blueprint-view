import { z } from 'zod';
import { auditFieldsSchema } from './auditSchema';

/** 서버 PostStatus enum 과 짝을 이룬다. */
export const postStatusSchema = z.enum(['DRAFT', 'PUBLISHED']);

export type PostStatus = z.infer<typeof postStatusSchema>;

/** 폼 입력과 저장 요청이 공유하는 본문 필드. 검증 문구가 갈라지지 않도록 한 곳에 둔다. */
const postContentShape = {
  titleName: z.string().min(1, '제목을 입력해주세요.').max(300, '제목은 최대 300자까지 가능합니다.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  excerpt: z.string().max(200, '요약은 최대 200자까지 가능합니다.').optional(),
};

export const postSchema = z
  .object({
    ...postContentShape,
    // 요약을 비운 채 저장하면 서버가 null 을 돌려준다. 입력(undefined)과
    // 응답(null)을 모두 받도록 이 필드만 넓힌다.
    excerpt: z.string().max(200).nullish(),
    postId: z.number().optional(),
    writer: z.string().min(1).max(100),
    status: postStatusSchema,
    viewCount: z.number().optional(),
    likeCount: z.number().optional(),
  })
  .extend(auditFieldsSchema.shape);

export type Post = z.output<typeof postSchema>;

/**
 * 게시글 작성/수정 요청.
 *
 * writer 를 담지 않는다. 작성자는 서버가 인증된 토큰의 주체에서 결정하며,
 * 클라이언트가 보낸 값은 무시된다.
 */
export const postWriteRequestSchema = z.object({
  ...postContentShape,
  status: postStatusSchema,
});

export type PostWriteRequest = z.output<typeof postWriteRequestSchema>;

/** 에디터 폼 입력값. 발행 상태는 폼이 아니라 어느 버튼을 눌렀는지로 결정된다. */
export const postFormSchema = z.object(postContentShape);

export type PostFormData = z.infer<typeof postFormSchema>;
