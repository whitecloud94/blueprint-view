import axiosInstance from '../api/axiosInstance';
import type {
  Post,
  PostSaveRequest,
  PostSaveResponse,
  PostStatus,
} from '../schemas/postSchema';

export const postService = {
  getPosts: async (): Promise<Post[]> => {
    const { data } = await axiosInstance.get<Post[]>('/posts');
    return data;
  },

  getPostById: async (id: number): Promise<Post> => {
    const { data } = await axiosInstance.get<Post>(`/posts/${id}`);
    return data;
  },

  addPost: async (payload: PostSaveRequest): Promise<PostSaveResponse> => {
    const { data } = await axiosInstance.post<PostSaveResponse>('/posts', payload);
    return data;
  },

  /**
   * 발행 상태 전환.
   *
   * 목록/상세의 노출 범위는 서버가 판정하므로, 여기서는 상태만 보낸다.
   */
  changeStatus: async (postId: number, status: PostStatus): Promise<Post> => {
    const { data } = await axiosInstance.patch<Post>(`/posts/${postId}/status`, { status });
    return data;
  },
};
