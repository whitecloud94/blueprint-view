import axios, { type AxiosError } from 'axios';
import { tokenStorage } from './tokenStorage';

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
 * 서버 오류 응답을 사용자에게 보여줄 문구로 바꾼다.
 *
 * 백엔드는 { code, message, status } 형태의 ErrorResponse 를 내려준다.
 */
export function getAxiosErrorMessage(error: unknown, fallback = '요청 처리 중 오류가 발생했습니다.'): string {
  if (axios.isAxiosError(error)) {
    // 서버에 닿지 못한 경우(응답 자체가 없음)는 원문 대신 조치 가능한 안내를 준다.
    if (!error.response) {
      return '서버에 연결할 수 없습니다. 백엔드가 실행 중인지 확인해주세요.';
    }
    const data = error.response.data as { message?: string } | undefined;
    return data?.message ?? error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}

export default axiosInstance;
