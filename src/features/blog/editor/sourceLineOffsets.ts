/**
 * 원문 줄과 미리보기 요소를 잇는 좌표표.
 *
 * <p>비율만 옮기면 두 창의 길이 비만 맞는다. 한쪽에만 긴 덩어리가 있으면(코드블럭,
 * 이미지, 표) 같은 비율이 서로 다른 내용을 가리킨다. 지금 쓰고 있는 줄이 미리보기의
 * 어디인지 보려면 줄 단위로 이어야 한다.
 */

/** 편집 창의 한 줄과 미리보기의 한 지점이 같은 내용을 가리킨다는 표시. */
export interface ScrollAnchor {
  /** 편집 창 스크롤 좌표계에서의 y. */
  editor: number;
  /** 미리보기 스크롤 좌표계에서의 y. */
  preview: number;
}

/**
 * textarea 안에서 각 원문 줄이 시작하는 y 를 잰다.
 *
 * 결정      : 같은 글자와 같은 폭을 가진 보이지 않는 사본을 만들어 잰다.
 * 이유      : textarea 는 몇 번째 줄이 어디에 그려졌는지 알려주지 않는다. 줄
 *             높이에 줄 번호를 곱하는 방법은 줄바꿈이 없을 때만 맞는데, 편집
 *             창은 폭에 맞춰 접히므로 긴 문단 하나가 여러 줄을 차지한다.
 * 대안      : 줄 높이 × 줄 번호로 어림한다.
 * 트레이드오프: 사본을 만들고 지우는 동안 레이아웃이 한 번 더 계산된다.
 * 선택 이유  : 접힌 줄을 세지 못하면 문단이 길어질수록 어긋남이 쌓인다. 재는
 *             시점을 스크롤 한 번에 한 번으로 묶으면 비용은 눈에 띄지 않는다.
 *
 * @returns 0-based 배열. index i 는 원문 i+1 번째 줄의 y.
 */
export function measureSourceLineTops(textarea: HTMLTextAreaElement): number[] {
  const styles = getComputedStyle(textarea);
  const mirror = document.createElement('div');

  // 글자가 놓이는 방식이 같아야 접히는 자리도 같다.
  const inherited = [
    'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'fontVariant',
    'letterSpacing', 'wordSpacing', 'lineHeight', 'textIndent', 'textTransform',
    'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
    'boxSizing', 'tabSize', 'overflowWrap', 'wordBreak',
  ] as const;

  for (const property of inherited) {
    mirror.style[property] = styles[property];
  }

  mirror.style.position = 'absolute';
  mirror.style.top = '0';
  mirror.style.left = '-9999px';
  mirror.style.visibility = 'hidden';
  mirror.style.pointerEvents = 'none';
  mirror.style.whiteSpace = 'pre-wrap';
  // clientWidth 는 테두리를 뺀 폭이다. box-sizing 을 그대로 물려받았으므로 그대로 쓴다.
  mirror.style.width = `${textarea.clientWidth}px`;

  const lines = textarea.value.split('\n');
  const markers = lines.map((line) => {
    const marker = document.createElement('div');
    // 빈 줄도 한 줄 높이를 차지해야 한다. 내용이 없으면 높이가 0 이 된다.
    marker.textContent = line === '' ? '​' : line;
    mirror.appendChild(marker);
    return marker;
  });

  document.body.appendChild(mirror);

  // offsetTop 은 기준 요소가 달라지면 뜻이 달라진다. 사본 자신의 위치에서 뺀다.
  const mirrorTop = mirror.getBoundingClientRect().top;
  const tops = markers.map((marker) => marker.getBoundingClientRect().top - mirrorTop);

  mirror.remove();
  return tops;
}

/**
 * 미리보기에서 원문 줄 표시를 달고 있는 요소들의 y 를 읽는다.
 *
 * <p>MarkdownContent 가 블록마다 data-source-line 을 남긴다. 그 값이 이 요소가
 * 원문 몇 번째 줄에서 시작했는지다.
 */
export function readPreviewAnchors(preview: HTMLElement): Array<{ line: number; top: number }> {
  // 스크롤 내용의 원점. 여기서 재야 스크롤 위치와 같은 좌표계가 된다.
  const origin = preview.getBoundingClientRect().top - preview.scrollTop;

  return Array.from(preview.querySelectorAll<HTMLElement>('[data-source-line]'))
    .map((element) => ({
      line: Number(element.dataset.sourceLine),
      top: element.getBoundingClientRect().top - origin,
    }))
    .filter((anchor) => Number.isFinite(anchor.line));
}

/**
 * 두 창의 좌표를 잇는 표를 만든다.
 *
 * <p>맨 앞과 맨 끝을 함께 넣는다. 첫 블록 위의 여백과 마지막 블록 아래의 여백에도
 * 기댈 지점이 있어야, 맨 위와 맨 아래가 서로 맞물린다.
 */
export function buildAnchors(
  editor: HTMLTextAreaElement,
  preview: HTMLElement,
): ScrollAnchor[] {
  const lineTops = measureSourceLineTops(editor);
  const previewAnchors = readPreviewAnchors(preview);

  const anchors: ScrollAnchor[] = [{ editor: 0, preview: 0 }];

  for (const { line, top } of previewAnchors) {
    const editorTop = lineTops[line - 1];
    if (editorTop === undefined) continue;

    // 앞선 지점보다 뒤여야 표가 한 방향으로만 늘어난다. 같은 줄에서 시작하는
    // 블록이 여럿이면(중첩 목록 등) 처음 것만 남긴다.
    const previous = anchors[anchors.length - 1];
    if (editorTop > previous.editor && top > previous.preview) {
      anchors.push({ editor: editorTop, preview: top });
    }
  }

  const editorEnd = editor.scrollHeight;
  const previewEnd = preview.scrollHeight;
  const last = anchors[anchors.length - 1];
  if (editorEnd > last.editor && previewEnd > last.preview) {
    anchors.push({ editor: editorEnd, preview: previewEnd });
  }

  return anchors;
}

/**
 * 한쪽 좌표를 반대쪽 좌표로 옮긴다.
 *
 * <p>표에 적힌 두 지점 사이는 비례로 채운다. 지점과 지점 사이에서는 어차피 같은
 * 블록 안이라, 그 안에서까지 정확할 방법도 필요도 없다.
 */
export function mapPosition(anchors: ScrollAnchor[], from: 'editor' | 'preview', value: number): number {
  const to = from === 'editor' ? 'preview' : 'editor';

  if (anchors.length < 2) {
    return value;
  }

  if (value <= anchors[0][from]) {
    return anchors[0][to];
  }

  for (let i = 1; i < anchors.length; i += 1) {
    const end = anchors[i];
    if (value > end[from]) continue;

    const start = anchors[i - 1];
    const span = end[from] - start[from];
    if (span <= 0) return start[to];

    const ratio = (value - start[from]) / span;
    return start[to] + ratio * (end[to] - start[to]);
  }

  return anchors[anchors.length - 1][to];
}
