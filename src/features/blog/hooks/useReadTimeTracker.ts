import { useEffect, useRef } from 'react';
import { resolveApiUrl } from '../../../api/assetUrl';

/** 이 시간 미만은 보내지 않는다. 서버도 같은 하한으로 거르지만 헛된 요청을 줄인다. */
const MIN_REPORT_MS = 10_000;

/**
 * 글에 머문 시간을 측정해 서버에 보고한다.
 *
 * <p>목록의 "N min read" 를 글자 수 추정치가 아니라 실측 평균으로 채우기 위한 기록이다.
 *
 * <p>단순 체류 시간은 쓸 수 없다. 탭을 열어 둔 채 자리를 비우면 시간이 계속 흐른다.
 * visibilitychange 로 화면에 보이는 동안만 누적한다.
 *
 * <p>보고는 sendBeacon 을 쓴다. 페이지를 떠나는 중의 fetch 는 브라우저가 취소할 수
 * 있어 마지막 보고가 유실된다. beacon 은 문서가 사라져도 전송을 보장한다.
 *
 * <p>pagehide 만으로는 부족하다. 모바일에서 앱을 전환하면 pagehide 없이 탭이
 * 폐기되는 경우가 있어, 화면에서 벗어나는 시점(hidden)에도 보고한다.
 */
export function useReadTimeTracker(postId: number | undefined) {
  const visibleSinceRef = useRef<number | null>(null);
  const accumulatedRef = useRef(0);
  const reportedRef = useRef(0);

  useEffect(() => {
    if (postId === undefined) return;

    // 글이 바뀌면 누적을 초기화한다.
    accumulatedRef.current = 0;
    reportedRef.current = 0;
    visibleSinceRef.current = document.visibilityState === 'visible' ? Date.now() : null;

    const accumulate = () => {
      if (visibleSinceRef.current === null) return;
      accumulatedRef.current += Date.now() - visibleSinceRef.current;
      visibleSinceRef.current = null;
    };

    const report = () => {
      accumulate();

      const duration = accumulatedRef.current;
      // 이미 보고한 값보다 늘어난 게 없으면 보내지 않는다. hidden 과 pagehide 가
      // 연달아 발생하면 같은 값을 두 번 보내게 된다.
      if (duration < MIN_REPORT_MS || duration <= reportedRef.current) return;

      reportedRef.current = duration;
      navigator.sendBeacon(
        resolveApiUrl(`/posts/${postId}/reads`),
        // sendBeacon 의 Blob 은 Content-Type 을 그대로 전달한다. 서버가 JSON 으로 읽는다.
        new Blob([JSON.stringify({ durationMs: duration })], { type: 'application/json' }),
      );
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        visibleSinceRef.current = Date.now();
      } else {
        report();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', report);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', report);
      // 다른 화면으로 이동할 때도 보고한다. SPA 라 pagehide 가 발생하지 않는다.
      report();
    };
  }, [postId]);
}
