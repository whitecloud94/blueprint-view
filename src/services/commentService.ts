import axiosInstance from '../api/axiosInstance';
import { commentTreeSchema, type Comment, type CommentFormData } from '../schemas/commentSchema';

/**
 * 댓글 API 클라이언트.
 *
 * 익명 댓글이라 인증 헤더 없이 호출된다. 본인 확인은 작성 시 입력한 비밀번호로 한다.
 */
export const commentService = {
  getComments: async (postId: number): Promise<Comment[]> => {
    const { data } = await axiosInstance.get(`/posts/${postId}/comments`);
    return commentTreeSchema.parse(data) as Comment[];
  },

  addComment: async (
    postId: number,
    payload: CommentFormData & { parentId?: number },
  ): Promise<void> => {
    await axiosInstance.post(`/posts/${postId}/comments`, payload);
  },

  updateComment: async (
    commentId: number,
    payload: { guestPassword: string; content: string },
  ): Promise<void> => {
    await axiosInstance.put(`/comments/${commentId}`, payload);
  },

  /**
   * 댓글 삭제.
   *
   * 비밀번호를 본문에 싣는다. 쿼리 파라미터로 보내면 접근 로그와 브라우저 기록에
   * 그대로 남는다. 관리자는 비밀번호 없이 호출할 수 있다.
   */
  deleteComment: async (commentId: number, guestPassword?: string): Promise<void> => {
    await axiosInstance.delete(`/comments/${commentId}`, {
      data: { guestPassword: guestPassword ?? null },
    });
  },
};
