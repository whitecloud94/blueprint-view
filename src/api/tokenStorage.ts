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

  /**
   * 토큰 만료 시각.
   *
   * <p>페이로드의 exp 를 읽을 뿐 서명을 검증하지 않는다. 검증은 서버의 일이고,
   * 여기서 필요한 것은 "언제 갱신할지" 판단뿐이다. 조작된 exp 로 갱신을 앞당기거나
   * 미루더라도 서버가 거부하므로 권한에는 영향이 없다.
   *
   * @returns 만료 시각(ms). 토큰이 없거나 형식이 다르면 null
   */
  getExpiresAt: (): number | null => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) return null;

    const payload = decodePayload(token);
    return typeof payload?.exp === 'number' ? payload.exp * 1000 : null;
  },
};

function decodePayload(token: string): { exp?: number } | null {
  const segments = token.split('.');
  if (segments.length !== 3) return null;

  try {
    // JWT 는 base64url 이라 표준 base64 로 바꿔야 atob 가 읽는다.
    const base64 = segments[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}
