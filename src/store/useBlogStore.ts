import { create } from 'zustand';
import { BlogPostData } from '../schemas/blog';

interface BlogState {
  formData: BlogPostData;
  currentTag: string;
  setFormData: (data: Partial<BlogPostData>) => void;
  setCurrentTag: (tag: string) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  reset: () => void;
}

const initialState: BlogPostData = {
  title: '',
  content: '',
  tags: [],
  relatedProjectId: null,
};

export const useBlogStore = create<BlogState>((set) => ({
  formData: initialState,
  currentTag: '',
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  setCurrentTag: (tag) => set({ currentTag: tag }),
  addTag: (tag) =>
    set((state) => {
      if (state.formData.tags.includes(tag)) return state;
      if (state.formData.tags.length >= 10) return state;
      return {
        formData: {
          ...state.formData,
          tags: [...state.formData.tags, tag],
        },
      };
    }),
  removeTag: (tag) =>
    set((state) => ({
      formData: {
        ...state.formData,
        tags: state.formData.tags.filter((t) => t !== tag),
      },
    })),
  reset: () => set({ formData: initialState, currentTag: '' }),
}));
