import axiosInstance from '../api/axiosInstance';
import {
  postSummaryPageSchema,
  tagSummarySchema,
  type PostSummaryPage,
  type TagSummary,
} from '../schemas/postSchema';
import { z } from 'zod';

/** 태그 API 클라이언트. */
export const tagService = {
  /** 발행글이 있는 태그를 글 수 내림차순으로 가져온다. */
  getTags: async (): Promise<TagSummary[]> => {
    const { data } = await axiosInstance.get('/tags');
    return z.array(tagSummarySchema).parse(data);
  },

  getPostsByTag: async (slug: string, page = 0, size = 10): Promise<PostSummaryPage> => {
    const { data } = await axiosInstance.get(`/posts/tags/${encodeURIComponent(slug)}`, {
      params: { page, size },
    });
    return postSummaryPageSchema.parse(data);
  },
};
