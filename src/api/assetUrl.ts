import axiosInstance from './axiosInstance';

/** 백엔드가 서빙하는 업로드 이미지 경로의 접두사. 서버의 ImageStorageService 와 짝을 이룬다. */
const UPLOAD_PATH_PREFIX = '/uploads/';

/**
 * 본문에 저장된 이미지 경로를 실제 요청 가능한 URL 로 바꾼다.
 *
 * <p>업로드 응답은 호스트 없는 경로(/uploads/...)만 돌려준다. 절대 URL 을 본문에
 * 저장하면 로컬에서 쓴 글에 localhost 주소가 박혀 공개 사이트에서 깨지기 때문이다.
 * 호스트 결정은 이렇게 렌더링 시점으로 미룬다.
 *
 * <p>업로드 경로가 아닌 외부 이미지 주소는 그대로 통과시킨다.
 */
export function resolveAssetUrl(src?: string): string | undefined {
  if (!src || !src.startsWith(UPLOAD_PATH_PREFIX)) {
    return src;
  }
  return `${getApiOrigin()}${src}`;
}

function getApiOrigin(): string {
  const baseUrl = axiosInstance.defaults.baseURL ?? '';

  try {
    // baseURL 이 상대 경로일 수도 있어 현재 오리진을 기준으로 해석한다.
    return new URL(baseUrl, window.location.origin).origin;
  } catch {
    return window.location.origin;
  }
}
