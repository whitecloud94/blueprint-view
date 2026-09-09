import { useEffect } from 'react';

/**
 * 따라간 쪽이 다시 상대를 미는 것을 막는 시간.
 *
 * <p>scrollTop 을 코드로 바꿔도 브라우저는 사용자가 굴린 것과 같은 scroll 이벤트를
 * 낸다. 구분할 방법이 없으므로, 한쪽이 끄는 동안에는 반대 방향을 잠시 잠근다.
 * 관성 스크롤이 이어지는 사이에 잠금이 풀리지 않을 만큼은 길어야 하고, 손을
 * 바꿔 반대 창을 굴렸을 때 걸리적거리지 않을 만큼은 짧아야 한다.
 */
const HANDOVER_DELAY_MS = 150;

/**
 * 두 스크롤 영역의 위치를 비율로 맞춘다.
 *
 * 결정      : 스크롤 비율(scrollTop / 최대 스크롤)을 그대로 옮긴다.
 * 이유      : 원문의 몇 번째 줄이 미리보기의 어느 요소인지는 마크다운을 렌더링해
 *             봐야 알 수 있고, 그 대응을 유지하려면 렌더 결과에서 줄 번호를
 *             역추적하는 장치가 필요하다.
 * 대안      : 줄 번호와 렌더된 요소를 대응시켜 구간별로 맞춘다.
 * 트레이드오프: 비율 방식은 한쪽에만 있는 덩어리(코드 블록, 이미지)를 지나갈 때
 *             두 창이 조금씩 어긋난다.
 * 선택 이유  : 어긋나도 "같은 부근"은 유지되고, 글을 쓰는 동안 필요한 것은 그
 *             정도다. 정확한 대응이 필요해지면 그때 줄 매핑으로 바꾼다.
 *
 * @param first     한쪽 스크롤 영역. 아직 붙지 않았으면 null.
 * @param second    반대쪽 스크롤 영역.
 * @param isEnabled 두 창이 함께 보일 때만 켠다.
 */
export function useScrollSync(
  first: HTMLElement | null,
  second: HTMLElement | null,
  isEnabled: boolean,
) {
  useEffect(() => {
    if (!isEnabled || !first || !second) return;

    /** 지금 스크롤을 끌고 있는 쪽. 반대쪽의 이벤트는 따라간 결과이므로 무시한다. */
    let driver: HTMLElement | null = null;
    let handoverTimer: ReturnType<typeof setTimeout> | undefined;

    const sync = (source: HTMLElement, target: HTMLElement) => () => {
      if (driver && driver !== source) return;

      driver = source;
      clearTimeout(handoverTimer);
      handoverTimer = setTimeout(() => {
        driver = null;
      }, HANDOVER_DELAY_MS);

      const sourceRange = source.scrollHeight - source.clientHeight;
      const targetRange = target.scrollHeight - target.clientHeight;
      // 한쪽이 넘치지 않으면 맞출 위치가 없다. 0 으로 나누는 것도 함께 막는다.
      if (sourceRange <= 0 || targetRange <= 0) return;

      target.scrollTop = (source.scrollTop / sourceRange) * targetRange;
    };

    const onFirstScroll = sync(first, second);
    const onSecondScroll = sync(second, first);

    first.addEventListener('scroll', onFirstScroll, { passive: true });
    second.addEventListener('scroll', onSecondScroll, { passive: true });

    return () => {
      first.removeEventListener('scroll', onFirstScroll);
      second.removeEventListener('scroll', onSecondScroll);
      clearTimeout(handoverTimer);
    };
  }, [first, second, isEnabled]);
}
