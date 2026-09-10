import { useEffect, useRef } from 'react';
import { buildAnchors, mapPosition, type ScrollAnchor } from './sourceLineOffsets';

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
 * 편집 창과 미리보기를 지금 쓰고 있는 내용 기준으로 맞춘다.
 *
 * 결정      : 원문 줄과 미리보기 블록을 이어 그 사이만 비례로 채운다.
 * 이유      : 길이 비만 맞추면 두 창의 총 길이만 같아진다. 한쪽에만 긴 덩어리가
 *             있으면(코드블럭, 이미지, 표) 같은 비율이 서로 다른 내용을 가리킨다.
 *             글이 길어질수록 어긋남이 쌓여, 아래쪽을 쓰는 동안 미리보기는 엉뚱한
 *             곳을 보여준다.
 * 대안      : 스크롤 비율을 그대로 옮긴다.
 * 트레이드오프: 좌표표를 만들어야 하고, 그러려면 편집 창의 줄 위치를 재야 한다.
 * 선택 이유  : 이 창을 나란히 두는 이유가 "지금 쓰는 줄이 어떻게 보이는지"를 보는
 *             것이다. 그 하나를 못 하면 두 창을 띄울 이유가 없다.
 *
 * <p>표는 스크롤이 시작될 때만 다시 만든다. 프레임마다 만들면 재는 비용이 그대로
 * 스크롤에 얹히고, 한 번 굴리는 동안에는 내용이 바뀌지 않는다.
 *
 * @param editor    본문 textarea. 실제로 스크롤되는 요소다.
 * @param preview   미리보기의 스크롤 영역.
 * @param isEnabled 두 창이 함께 보일 때만 켠다.
 */
export function useScrollSync(
  editor: HTMLTextAreaElement | null,
  preview: HTMLElement | null,
  isEnabled: boolean,
) {
  const anchorsRef = useRef<ScrollAnchor[] | null>(null);
  /** 표를 만들 때의 미리보기 높이. 이 값이 달라졌다면 표가 낡았다는 뜻이다. */
  const measuredHeightRef = useRef(0);

  useEffect(() => {
    if (!isEnabled || !editor || !preview) return;

    /** 지금 스크롤을 끌고 있는 쪽. 반대쪽의 이벤트는 따라간 결과이므로 무시한다. */
    let driver: HTMLElement | null = null;
    let handoverTimer: ReturnType<typeof setTimeout> | undefined;

    const sync = (source: HTMLElement, target: HTMLElement, from: 'editor' | 'preview') => () => {
      if (driver && driver !== source) return;

      // 표를 다시 만들어야 하는 두 경우.
      // 하나는 새로 시작된 스크롤이다. 그동안 글이 바뀌었을 수 있다.
      // 다른 하나는 굴리는 도중에 미리보기 높이가 달라진 경우다. 본문 이미지는
      // 화면에 들어와야 불러오므로, 내려가는 동안 아래쪽이 계속 늘어난다.
      if (!driver || preview.scrollHeight !== measuredHeightRef.current) {
        anchorsRef.current = buildAnchors(editor, preview);
        measuredHeightRef.current = preview.scrollHeight;
      }

      driver = source;
      clearTimeout(handoverTimer);
      handoverTimer = setTimeout(() => {
        driver = null;
      }, HANDOVER_DELAY_MS);

      const targetRange = target.scrollHeight - target.clientHeight;
      // 반대쪽이 넘치지 않으면 맞출 위치가 없다.
      if (targetRange <= 0) return;

      const anchors = anchorsRef.current;
      const mapped = anchors ? mapPosition(anchors, from, source.scrollTop) : source.scrollTop;

      target.scrollTop = Math.max(0, Math.min(mapped, targetRange));
    };

    const onEditorScroll = sync(editor, preview, 'editor');
    const onPreviewScroll = sync(preview, editor, 'preview');

    editor.addEventListener('scroll', onEditorScroll, { passive: true });
    preview.addEventListener('scroll', onPreviewScroll, { passive: true });

    return () => {
      editor.removeEventListener('scroll', onEditorScroll);
      preview.removeEventListener('scroll', onPreviewScroll);
      clearTimeout(handoverTimer);
      anchorsRef.current = null;
      measuredHeightRef.current = 0;
    };
  }, [editor, preview, isEnabled]);
}
