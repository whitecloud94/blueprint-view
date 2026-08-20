import axiosInstance from '../api/axiosInstance';
import {
  authUserSchema,
  loginResponseSchema,
  type AuthUser,
  type LoginResponse,
  type SignInInput,
} from '../schemas/authSchema';

/**
 * 인증 API 클라이언트.
 *
 * 응답을 zod 로 파싱해 서버 계약이 어긋나면 화면이 아니라 여기서 먼저 실패하게 한다.
 */
export const authService = {
  login: async (input: SignInInput): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post('/auth/login', input);
    return loginResponseSchema.parse(data);
  },

  /**
   * 현재 사용자 조회.
   *
   * 권한은 토큰 안의 클레임이 아니라 이 응답을 신뢰한다. 서버가 DB 의 현재 role 을
   * 다시 읽어 주므로, 권한이 회수된 뒤에도 남아 있는 토큰으로 관리자 화면이
   * 보이는 일을 막는다.
   */
  getCurrentUser: async (): Promise<AuthUser> => {
    const { data } = await axiosInstance.get('/auth/me');
    return authUserSchema.parse(data);
  },
};
