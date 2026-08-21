import axios, { type AxiosError } from 'axios';
import { tokenStorage } from './tokenStorage';
import { toErrorMessage } from './errorPolicy';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
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
