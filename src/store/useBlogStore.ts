import { create } from 'zustand';
import { BlogPostData } from '../features/blog/schemas/blog';

interface BlogState {
  formData: BlogPostData;
  setFormData: (data: Partial<BlogPostData>) => void;
  reset: () => void;
}

const initialState: BlogPostData = {
  titleName: '',
  content: '',
  excerpt: '',
};

export const useBlogStore = create<BlogState>((set) => ({
  formData: initialState,
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  reset: () => set({ formData: initialState }),
}));
