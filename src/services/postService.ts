import axiosInstance from '../api/axiosInstance';
import type { Post, PostStatus, PostWriteRequest } from '../schemas/postSchema';

/**
 * 게시글 API 클라이언트.
 *
 * 목록과 상세의 노출 범위는 서버가 토큰을 보고 판정한다. 여기에서 조회 조건을
 * 덧붙이지 않는 이유이며, 관리자에게는 임시저장 글이 함께 내려온다.
 */
export const postService = {
  getPosts: async (): Promise<Post[]> => {
    const { data } = await axiosInstance.get<Post[]>('/posts');
    return data;
  },

  getPostById: async (id: number): Promise<Post> => {
    const { data } = await axiosInstance.get<Post>(`/posts/${id}`);
    return data;
  },

  addPost: async (payload: PostWriteRequest): Promise<Post> => {
    const { data } = await axiosInstance.post<Post>('/posts', payload);
    return data;
  },

  updatePost: async (id: number, payload: PostWriteRequest): Promise<Post> => {
    const { data } = await axiosInstance.put<Post>(`/posts/${id}`, payload);
    return data;
  },

  /** 본문은 그대로 두고 발행 상태만 바꾼다. 목록에서의 빠른 발행에 쓰인다. */
  changeStatus: async (id: number, status: PostStatus): Promise<Post> => {
    const { data } = await axiosInstance.patch<Post>(`/posts/${id}/status`, { status });
    return data;
  },

  deletePost: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/posts/${id}`);
  },
};
