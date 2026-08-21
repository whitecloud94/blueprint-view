import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { tokenStorage } from './tokenStorage';

/** 만료까지 이 시간보다 적게 남으면 미리 교체한다. */
const REFRESH_THRESHOLD_MS = 5 * 60 * 1000;

/** 갱신 요청 자체는 갱신 검사를 건너뛰어야 한다. 무한 재귀를 막는 표식. */
export const REFRESH_PATH = '/auth/refresh';

/**
 * 진행 중인 갱신 요청.
 *
 * <p>같은 순간에 여러 요청이 나가면 각자 갱신을 시도해 토큰이 연달아 재발급된다.
 * 마지막 것만 살아남고 나머지는 이미 교체된 토큰으로 요청하게 되므로, 하나의
 * 약속을 공유해 한 번만 호출한다.
 */
let inFlightRefresh: Promise<void> | null = null;

export function isRefreshRequest(config: InternalAxiosRequestConfig): boolean {
  return Boolean(config.url?.includes(REFRESH_PATH));
}

/**
 * 슬라이딩 세션.
 *
 * <p>액세스 토큰이 만료되기 전에 조용히 교체한다. 별도의 리프레시 토큰을 두지
 * 않는 이유는 그것 역시 브라우저에 보관해야 해서 XSS 노출 면적이 같은 데다,
 * 회전·폐기·저장소 관리가 따라붙기 때문이다.
 *
 * <p>한계: 요청이 전혀 없는 채로 토큰이 만료되면(예: 에디터를 열어 두고 한참
 * 타이핑만 하는 경우) 갱신 시점을 놓친다. 이때는 저장 시 401 이 나고 오류
 * 대화상자가 재로그인을 안내한다. 작성 중인 글은 초안 자동저장으로 남는다.
 */
export async function ensureFreshToken(client: AxiosInstance): Promise<void> {
  if (!shouldRefresh()) return;

  inFlightRefresh ??= client
    .post(REFRESH_PATH)
    .then(({ data }) => {
      if (typeof data?.accessToken === 'string') {
        tokenStorage.set(data.accessToken);
      }
    })
    .catch(() => {
      // 갱신 실패는 여기서 알리지 않는다. 뒤따르는 실제 요청이 401 을 받고,
      // 그 결과가 사용자에게 맥락과 함께 전달된다.
    })
    .finally(() => {
      inFlightRefresh = null;
    });

  await inFlightRefresh;
}

function shouldRefresh(): boolean {
  const expiresAt = tokenStorage.getExpiresAt();
  if (expiresAt === null) return false;

  const remaining = expiresAt - Date.now();
  // 이미 만료됐다면 갱신도 거부당한다. 헛된 왕복을 만들지 않는다.
  return remaining > 0 && remaining < REFRESH_THRESHOLD_MS;
}
