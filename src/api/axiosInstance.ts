import axios, { type AxiosError } from 'axios';
import { tokenStorage } from './tokenStorage';
import { toErrorMessage } from './errorPolicy';
import { ensureFreshToken, isRefreshRequest } from './tokenRefresh';

/**
 * API 기본 주소.
 *
 * 프로덕션 기본값을 코드에 둔다. 배포 플랫폼의 환경 변수에만 의존하면, 값이
 * 비어 있을 때 조용히 localhost 로 빌드돼 방문자 브라우저가 자기 PC 를 호출한다.
 * (실제로 배포된 번들에 http://localhost:8080 이 박혀 있던 원인이다.)
 *
 * VITE_API_BASE_URL 은 스테이징 등에서 덮어쓰기 위한 선택 값으로만 남긴다.
 */
const DEFAULT_API_BASE_URL = import.meta.env.PROD
  ? 'https://api.dk-lab.dev/api/v1'
  : 'http://localhost:8080/api/v1';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
  // 익명 방문자 식별 쿠키를 주고받기 위해 필요하다. 서버가 발급한 visitor_id 로
  // 좋아요 중복을 판정하는데, 이 옵션이 없으면 교차 출처 요청에 쿠키가 실리지 않는다.
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  // 갱신과 헤더 부착을 한 인터셉터에 둔다. 나누면 axios 가 요청 인터셉터를
  // 등록 역순으로 실행해, 갱신되기 전의 토큰이 헤더에 실린다.
  if (!isRefreshRequest(config)) {
    await ensureFreshToken(axiosInstance);
  }

  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // 401 은 토큰이 만료됐거나 폐기됐다는 뜻이다. 쓸모없는 토큰을 계속 들고 있으면
    // 이후 모든 요청이 같은 이유로 실패한다.
    if (error.response?.status === 401) {
      tokenStorage.clear();
    }
    return Promise.reject(error);
  },
);

/**
 * 오류를 사용자에게 보여줄 한 줄 문구로 바꾼다.
 *
 * 분류와 문구 결정은 errorPolicy 가 담당한다. 이 함수는 기존 호출부를 위한
 * 얇은 통로이며, 예외의 원문 메시지가 화면에 노출되지 않도록 보장한다.
 */
export function getAxiosErrorMessage(error: unknown, fallback?: string): string {
  return toErrorMessage(error, fallback);
}

export default axiosInstance;
