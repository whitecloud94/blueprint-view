type SessionExpiredListener = () => void;

const listeners = new Set<SessionExpiredListener>();

/**
 * 세션이 끊긴 사실을 앱에 알리는 통로.
 *
 * 결정      : API 계층은 이벤트만 발행하고, 인증 상태는 구독하는 쪽이 바꾼다.
 * 이유      : axiosInstance 가 인증 저장소를 직접 부르면 저장소 → authService →
 *             axiosInstance → 저장소로 순환 참조가 생긴다. 번들러가 처리하더라도
 *             import 순서에 따라 초기화가 어긋나는 취약한 구조가 남는다.
 * 대안      : 저장소를 axiosInstance 에서 직접 import 한다.
 * 트레이드오프: 통로가 하나 늘어 흐름이 한 단계 간접적이 된다.
 * 선택 이유  : 방향이 한쪽(API → 앱)뿐이라 간접 비용이 작고, API 계층이 화면과
 *             상태를 모르는 경계가 그대로 유지된다.
 */
export function onSessionExpired(listener: SessionExpiredListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** 401 을 받아 토큰을 버린 직후 호출한다. */
export function notifySessionExpired(): void {
  listeners.forEach((listener) => listener());
}
