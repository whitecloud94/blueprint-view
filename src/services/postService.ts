import axiosInstance from "../api/axiosInstance.ts";
import {Post} from "../schemas/postSchema.ts";

const prefix = "http://localhost:8080/api/v1"

export const postService = {
    getPosts: async (): Promise<Post[]> => {
        const response = await axiosInstance.get<Post[]>(`${prefix}/posts`);
        return response.data;
    },

    getPostById: async (id: number): Promise<Post> => {
        const response = await axiosInstance.get<Post>(`${prefix}/posts/${id}`);
        return response.data;
    },

    addPost: async (post: Post): Promise<Post> => {
        const response = await axiosInstance.post<Post>(`${prefix}/posts`, post);
        return response.data;
    }
};

