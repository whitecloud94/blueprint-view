import { z } from 'zod';

/**
 * 댓글.
 *
 * 삭제된 댓글은 작성자와 본문이 내려오지 않는다. 답글이 남아 있어 자리만 지키는
 * 상태이며, 화면은 deleted 로 판단한다.
 */
const commentBaseSchema = z.object({
  commentId: z.number().int().positive(),
  parentId: z.number().int().positive().nullish(),
  depth: z.number().int().min(0).max(1),
  guestName: z.string().nullish(),
  content: z.string().nullish(),
  deleted: z.boolean(),
  likeCount: z.number().int().nonnegative(),
  likedByMe: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string().nullish(),
});

/** 답글. 깊이가 1로 제한돼 있어 답글은 다시 답글을 갖지 않는다. */
export type CommentReply = z.output<typeof commentBaseSchema>;

export const commentSchema = commentBaseSchema.extend({
  replies: z.array(commentBaseSchema).default([]),
});

export type Comment = z.output<typeof commentSchema>;

export const commentTreeSchema = z.array(commentSchema);

/** 댓글/답글 작성 폼. */
export const commentFormSchema = z.object({
  guestName: z
    .string()
    .min(2, '닉네임은 2자 이상이어야 합니다.')
    .max(50, '닉네임은 최대 50자입니다.'),
  guestPassword: z
    .string()
    .min(4, '비밀번호는 4자 이상이어야 합니다.')
    .max(72, '비밀번호는 최대 72자입니다.'),
  content: z
    .string()
    .min(1, '내용을 입력해주세요.')
    .max(1000, '댓글은 최대 1000자까지 가능합니다.'),
});

export type CommentFormData = z.infer<typeof commentFormSchema>;

/** 수정/삭제 시 본인 확인용 비밀번호. */
export const commentPasswordSchema = z.object({
  guestPassword: z.string().min(1, '비밀번호를 입력해주세요.').max(72),
});

export type CommentPasswordData = z.infer<typeof commentPasswordSchema>;
