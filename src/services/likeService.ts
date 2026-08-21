import axiosInstance from '../api/axiosInstance';

/**
 * 좋아요 토글 결과.
 *
 * 개수를 서버가 센 값으로 받는다. 클라이언트가 스스로 ±1 하면 다른 방문자의
 * 변경과 어긋난다.
 */
export interface LikeResult {
  liked: boolean;
  likeCount: number;
}

/**
 * 좋아요 API 클라이언트.
 *
 * 익명 방문자도 누를 수 있다. 중복 판정에 쓰이는 visitor_id 쿠키는 서버가 발급하며,
 * axios 인스턴스의 withCredentials 설정으로 함께 전송된다.
 */
export const likeService = {
  togglePostLike: async (postId: number): Promise<LikeResult> => {
    const { data } = await axiosInstance.post<LikeResult>(`/posts/${postId}/likes`);
    return data;
  },

  toggleCommentLike: async (commentId: number): Promise<LikeResult> => {
    const { data } = await axiosInstance.post<LikeResult>(`/comments/${commentId}/likes`);
    return data;
  },
};
