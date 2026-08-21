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
    likeCount: z.number().int().nonnegative(),
    likedByMe: z.boolean().optional(),
  })
  .extend(auditFieldsSchema.shape);

export type Post = z.output<typeof postSchema>;

/**
 * 목록 항목.
 *
 * 서버가 본문을 내려주지 않는다. 목록 화면은 요약만 쓰는데 본문까지 실으면
 * 응답의 대부분이 쓰이지 않는 데이터가 되기 때문이다.
 */
export const postSummarySchema = postSchema.omit({ content: true, likedByMe: true }).extend({
  // 서버가 조회 시점에 세어 내려준다. 비정규화 카운터가 아니라 드리프트가 없다.
  commentCount: z.number().int().nonnegative(),
});

export type PostSummary = z.output<typeof postSummarySchema>;

/**
 * 페이지 응답.
 *
 * 서버 PageResponse 와 짝을 이룬다. hasNext 를 서버가 계산해 주므로 클라이언트가
 * totalPages 와 page 를 비교할 필요가 없다.
 */
export const pageResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    content: z.array(itemSchema),
    page: z.number().int().nonnegative(),
    size: z.number().int().positive(),
    totalElements: z.number().int().nonnegative(),
    totalPages: z.number().int().nonnegative(),
    hasNext: z.boolean(),
  });

export const postSummaryPageSchema = pageResponseSchema(postSummarySchema);

export type PostSummaryPage = z.output<typeof postSummaryPageSchema>;

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
