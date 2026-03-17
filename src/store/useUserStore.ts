import { create } from 'zustand';
import { User } from '../schemas/userSchema';
import { userService } from '../services/userService';

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;

  // 액션
  fetchUsers: () => Promise<void>;
  addUser: (user: User) => Promise<void>;
  removeUser: (id: number) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const users = await userService.getUsers();
      set({ users, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || '데이터를 불러오는데 실패했습니다.', isLoading: false });
    }
  },

  addUser: async (newUser: User) => {
    set({ isLoading: true, error: null });
    try {
      const createdUser = await userService.createUser(newUser);
      set((state) => ({ 
        users: [...state.users, createdUser], 
        isLoading: false 
      }));
    } catch (err: any) {
      set({ error: err.message || '사용자 추가에 실패했습니다.', isLoading: false });
    }
  },

  removeUser: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await userService.deleteUser(id);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message || '사용자 삭제에 실패했습니다.', isLoading: false });
    }
  },
}));
