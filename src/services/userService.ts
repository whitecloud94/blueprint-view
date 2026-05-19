import axiosInstance from '../api/axiosInstance';
import type { UserRegister, UserResponse } from '../schemas/userSchema';

export const userService = {
  getUsers: async (): Promise<UserResponse[]> => {
    const { data } = await axiosInstance.get<UserResponse[]>('/users');
    return data;
  },

  getUserById: async (userId: string): Promise<UserResponse> => {
    const { data } = await axiosInstance.get<UserResponse>(`/users/${userId}`);
    return data;
  },

  createUser: async (user: UserRegister): Promise<UserResponse> => {
    const { data } = await axiosInstance.post<UserResponse>('/users', user);
    return data;
  },

  updateUser: async (userId: string, user: Partial<UserResponse>): Promise<UserResponse> => {
    const { data } = await axiosInstance.patch<UserResponse>(`/users/${userId}`, user);
    return data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await axiosInstance.delete(`/users/${userId}`);
  },
};
