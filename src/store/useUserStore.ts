import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { getAxiosErrorMessage } from '../api/axiosInstance';
import type { UserRegister, UserResponse } from '../schemas/userSchema';
import { userService } from '../services/userService';

interface UserState {
  users: UserResponse[];
  isLoading: boolean;
  error: string | null;
}

interface UserActions {
  fetchUsers: () => Promise<void>;
  addUser: (user: UserRegister) => Promise<void>;
  resetError: () => void;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
};

export const useUserStore = create<UserState & UserActions>((set) => ({
  ...initialState,

  resetError: () => set({ error: null }),

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const users = await userService.getUsers();
      set({ users, isLoading: false });
    } catch (error) {
      set({ error: getAxiosErrorMessage(error), isLoading: false });
    }
  },

  addUser: async (newUser) => {
    set({ isLoading: true, error: null });
    try {
      const createdUser = await userService.createUser(newUser);
      set((state) => ({
        users: [...state.users, createdUser],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: getAxiosErrorMessage(error), isLoading: false });
      throw error;
    }
  },
}));

export const useUserList = () => useUserStore((state) => state.users);
export const useUserLoading = () => useUserStore((state) => state.isLoading);
export const useUserError = () => useUserStore((state) => state.error);
export const useUserActions = () =>
  useUserStore(
    useShallow((state) => ({
      fetchUsers: state.fetchUsers,
      addUser: state.addUser,
      resetError: state.resetError,
    })),
  );
