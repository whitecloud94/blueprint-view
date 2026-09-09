import { useEffect, type RefObject } from 'react';

/**
 * Tab 순서에 들어오는 요소들.
 *
 * <p>disabled 는 선택자에서 걸러내고, 화면에 그려지지 않은 것은 아래에서 크기로
 * 다시 거른다. 접힌 영역 안의 버튼까지 순서에 넣으면 보이지 않는 곳으로 포커스가
 * 사라진다.
 */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * 모달 안에 포커스를 가둔다.
 *
 * 결정      : Tab 을 직접 가로채 순환시킨다.
 * 이유      : 모달은 배경 위에 떠 있을 뿐 DOM 상으로는 형제라, 브라우저의 기본
 *             Tab 순서는 모달을 지나 배경으로 계속 넘어간다. 화면에는 가려져
 *             보이지 않는 버튼에 포커스가 가면 키보드 사용자는 자기가 어디에
 *             있는지 알 수 없다.
 * 대안      : 배경 요소에 inert 를 건다.
 * 트레이드오프: inert 는 배경 전체를 한 번에 비활성화해 더 확실하지만, 모달이
 *             무엇을 배경으로 보는지(포털 형제 전부) 이 훅이 알아야 한다.
 * 선택 이유  : 지금 필요한 것은 모달 하나의 Tab 순환뿐이고, 그 판단에 필요한
 *             정보가 컨테이너 안에 모두 있다.
 *
 * <p>활성화되면 컨테이너로 포커스를 옮기고, 해제되면 열기 직전에 포커스를 갖고
 * 있던 요소로 되돌린다. 되돌릴 곳이 이미 사라졌으면 아무것도 하지 않는다.
 *
 * <p>포커스 이동에는 preventScroll 을 쓴다. 모달은 배경 스크롤을 잠근 채 열리므로,
 * 포커스를 따라 화면이 움직이면 닫은 뒤 엉뚱한 위치로 돌아간다.
 *
 * @param containerRef 포커스를 가둘 요소. tabIndex={-1} 이어야 자신도 포커스를 받는다.
 * @param isActive     false 면 아무것도 하지 않는다.
 */
export const useFocusTrap = (
  containerRef: RefObject<HTMLElement | null>,
  isActive = true,
) => {
  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    container.focus({ preventScroll: true });

    // 목록을 미리 만들어 두지 않는다. 관련 글처럼 나중에 도착해 붙는 내용이 있어
    // Tab 을 누른 시점의 화면을 기준으로 삼아야 한다.
    const getFocusable = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
        .filter((el) => el.getClientRects().length > 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        // 누를 것이 없으면 컨테이너에 붙잡아 둔다. 밖으로 내보내면 돌아올 길이 없다.
        event.preventDefault();
        container.focus({ preventScroll: true });
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const isOutside = !active || !container.contains(active);

      if (event.shiftKey) {
        // 컨테이너 자신에 포커스가 있을 때의 역방향은 브라우저 기본값으로 두면
        // 모달 앞쪽, 즉 배경으로 나간다.
        if (isOutside || active === first || active === container) {
          event.preventDefault();
          last.focus({ preventScroll: true });
        }
        return;
      }

      if (isOutside || active === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      // 되돌릴 요소가 그사이 사라졌을 수 있다(목록이 다시 그려지는 경우).
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [containerRef, isActive]);
};
