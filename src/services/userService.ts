import axiosInstance from '../api/axiosInstance';
import { User } from '../schemas/userSchema';

const prefix = "http://localhost:8080/api/v1"

export const userService = {

  // 사용자 전체 목록 가져오기
  getUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get<User[]>(`${prefix}/users`);
    return response.data;
  },

  // 특정 사용자 가져오기
  getUserById: async (id: number): Promise<User> => {
    const response = await axiosInstance.get<User>(`${prefix}/users/${id}`);
    return response.data;
  },

  // 사용자 생성
  createUser: async (user: User): Promise<User> => {
    const response = await axiosInstance.post<User>(`${prefix}/users`, user);
    return response.data;
  },

  // 사용자 정보 업데이트
  updateUser: async (id: number, user: Partial<User>): Promise<User> => {
    const response = await axiosInstance.patch<User>(`${prefix}/users/${id}`, user);
    return response.data;
  },

  // 사용자 삭제
  deleteUser: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/users/${id}`);
  },
};
