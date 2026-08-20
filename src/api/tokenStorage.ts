/**
 * 액세스 토큰 보관소.
 *
 * <p>localStorage 를 쓰는 이유는 SPA 가 새로고침 후에도 세션을 이어가야 하고,
 * 백엔드가 별도 도메인이라 HttpOnly 쿠키를 쓰려면 SameSite/CORS 설정이 함께
 * 필요하기 때문이다. 대신 XSS 가 발생하면 토큰이 그대로 노출되므로, 토큰 수명을
 * 짧게 유지하고(기본 1시간) 서버가 매 요청 권한을 다시 판정한다.
 *
 * 키 문자열이 여러 파일에 흩어지지 않도록 접근 경로를 여기로 모은다.
 */
const ACCESS_TOKEN_KEY = 'accessToken';

export const tokenStorage = {
  get: (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY),
  set: (token: string): void => localStorage.setItem(ACCESS_TOKEN_KEY, token),
  clear: (): void => localStorage.removeItem(ACCESS_TOKEN_KEY),
};
