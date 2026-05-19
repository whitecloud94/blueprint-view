import axiosInstance from '../api/axiosInstance';
import type { Post, PostSaveRequest, PostSaveResponse } from '../schemas/postSchema';

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
};
