import axiosInstance from '../api/axiosInstance';
import {
  postSummaryPageSchema,
  type Post,
  type PostStatus,
  type PostSummaryPage,
  type PostWriteRequest,
} from '../schemas/postSchema';

/**
 * 게시글 API 클라이언트.
 *
 * 목록과 상세의 노출 범위는 서버가 토큰을 보고 판정한다. 여기에서 조회 조건을
 * 덧붙이지 않는 이유이며, 관리자에게는 임시저장 글이 함께 내려온다.
 */
export const postService = {
  /**
   * 목록 조회.
   *
   * 본문을 제외한 요약만 페이지 단위로 받는다. 조회 범위(임시저장 포함 여부)는
   * 서버가 토큰을 보고 판정하므로 여기서 조건을 덧붙이지 않는다.
   */
  getPosts: async (page = 0, size = 10): Promise<PostSummaryPage> => {
    const { data } = await axiosInstance.get('/posts', { params: { page, size } });
    return postSummaryPageSchema.parse(data);
  },

  /**
   * 검색.
   *
   * 검색어는 서버가 해석한다. 목록과 같은 요약 페이지를 돌려주므로 화면에서는
   * 같은 카드를 그대로 쓴다.
   */
  searchPosts: async (keyword: string, page = 0, size = 10): Promise<PostSummaryPage> => {
    const { data } = await axiosInstance.get('/posts/search', {
      params: { q: keyword, page, size },
    });
    return postSummaryPageSchema.parse(data);
  },

  getPostById: async (id: number): Promise<Post> => {
    const { data } = await axiosInstance.get<Post>(`/posts/${id}`);
    return data;
  },

  addPost: async (payload: PostWriteRequest): Promise<Post> => {
    const { data } = await axiosInstance.post<Post>('/posts', payload);
    return data;
  },

  updatePost: async (id: number, payload: PostWriteRequest): Promise<Post> => {
    const { data } = await axiosInstance.put<Post>(`/posts/${id}`, payload);
    return data;
  },

  /** 본문은 그대로 두고 발행 상태만 바꾼다. 목록에서의 빠른 발행에 쓰인다. */
  changeStatus: async (id: number, status: PostStatus): Promise<Post> => {
    const { data } = await axiosInstance.patch<Post>(`/posts/${id}/status`, { status });
    return data;
  },

  /**
   * 조회수 증가.
   *
   * 상세 조회와 분리된 명령이다. GET 이 매번 쓰기를 유발하면 캐시·재시도·프리페치가
   * 모두 카운트를 부풀린다.
   */
  increaseViewCount: async (id: number): Promise<void> => {
    await axiosInstance.post(`/posts/${id}/views`);
  },

  deletePost: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/posts/${id}`);
  },
};
