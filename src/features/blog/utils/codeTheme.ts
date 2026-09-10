import type { CSSProperties } from 'react';

/**
 * 구문 강조 테마. 토큰 이름 → 스타일.
 *
 * <p>react-syntax-highlighter 의 스타일 선언은 `CSSProperties | Record<string, CSSProperties>`
 * 인데 컴포넌트는 후자만 받는다. 실제 값은 항상 토큰별 스타일 맵이므로 좁혀서 쓴다.
 */
export type CodeTheme = Record<string, CSSProperties>;

/** 본문 크기의 글자에 요구되는 대비(WCAG AA). 코드도 읽으라고 쓴 글이라 같은 기준을 쓴다. */
const MIN_CONTRAST = 4.5;

/** 계산 오차와 브라우저 반올림을 감안한 여유. */
const TARGET_CONTRAST = 4.6;

interface Hsl {
  h: number;
  s: number;
  l: number;
}

/**
 * 테마의 모든 토큰이 주어진 배경에서 읽히도록 명도를 조정한다.
 *
 * 결정      : 색을 하나씩 고르지 않고, 대비 기준에 맞을 때까지 명도만 옮긴다.
 * 이유      : 널리 쓰이는 구문 테마 상당수가 본문 기준 대비를 충족하지 않는다.
 *             oneLight 만 해도 문자열 3.07:1, 함수 3.87:1, 클래스 3.93:1 이다.
 *             안 보인다는 말이 나온 자리가 정확히 여기다.
 * 대안      : 문제되는 토큰을 하나씩 골라 값을 박아 둔다.
 * 트레이드오프: 자동 조정은 원 테마가 의도한 색조에서 조금 벗어난다.
 * 선택 이유  : 색상과 채도는 그대로 두고 명도만 옮기므로 "초록 문자열, 파란
 *             함수" 같은 색 언어는 유지된다. 손으로 고르면 테마를 바꿀 때마다
 *             다시 재야 하고, 빠뜨린 토큰은 조용히 안 보인 채로 남는다.
 *
 * <p>배경이 밝으면 어둡게, 어두우면 밝게 옮긴다. 기준에 닿지 못하면 그 방향
 * 끝값(검정 또는 흰색)에서 멈춘다.
 *
 * @param theme      원본 테마
 * @param background 이 테마가 놓일 배경색(#rrggbb)
 */
export function withReadableTokens(theme: CodeTheme, background: string): CodeTheme {
  const backgroundRgb = parseColor(background);
  if (!backgroundRgb) {
    return theme;
  }

  const darken = luminance(backgroundRgb) > 0.5;
  const adjusted: CodeTheme = {};

  for (const [token, style] of Object.entries(theme)) {
    const color = typeof style.color === 'string' ? style.color : undefined;
    const rgb = color ? parseColor(color) : null;

    adjusted[token] =
      rgb && contrast(rgb, backgroundRgb) < MIN_CONTRAST
        ? { ...style, color: shiftUntilReadable(rgb, backgroundRgb, darken) }
        : style;
  }

  return adjusted;
}

/** 색상·채도는 두고 명도만 한 걸음씩 옮긴다. */
function shiftUntilReadable(color: Rgb, background: Rgb, darken: boolean): string {
  const { h, s } = rgbToHsl(color);
  const step = darken ? -1 : 1;

  for (let l = rgbToHsl(color).l; l >= 0 && l <= 100; l += step) {
    const candidate = hslToRgb({ h, s, l });
    if (contrast(candidate, background) >= TARGET_CONTRAST) {
      return `hsl(${round(h)}, ${round(s)}%, ${round(l)}%)`;
    }
  }

  // 그 색조로는 기준에 닿지 못한다. 배경 반대쪽 끝으로 보낸다.
  return darken ? '#000000' : '#ffffff';
}

interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** `#rgb`, `#rrggbb`, `hsl(h, s%, l%)` 를 읽는다. 구문 테마가 쓰는 표기는 이 셋이다. */
function parseColor(value: string): Rgb | null {
  const input = value.trim();

  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(input);
  if (hex) {
    const digits =
      hex[1].length === 3
        ? hex[1]
            .split('')
            .map((d) => d + d)
            .join('')
        : hex[1];
    return {
      r: parseInt(digits.slice(0, 2), 16),
      g: parseInt(digits.slice(2, 4), 16),
      b: parseInt(digits.slice(4, 6), 16),
    };
  }

  const hsl = /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/i.exec(input);
  if (hsl) {
    return hslToRgb({ h: Number(hsl[1]), s: Number(hsl[2]), l: Number(hsl[3]) });
  }

  return null;
}

function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const [red, green, blue] = [r / 255, g / 255, b / 255];
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  const l = (max + min) / 2;

  if (delta === 0) {
    return { h: 0, s: 0, l: l * 100 };
  }

  const s = delta / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === red) {
    h = 60 * (((green - blue) / delta) % 6);
  } else if (max === green) {
    h = 60 * ((blue - red) / delta + 2);
  } else {
    h = 60 * ((red - green) / delta + 4);
  }

  return { h: (h + 360) % 360, s: s * 100, l: l * 100 };
}

function hslToRgb({ h, s, l }: Hsl): Rgb {
  const saturation = s / 100;
  const lightness = l / 100;
  const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lightness - c / 2;

  const [r, g, b] =
    h < 60
      ? [c, x, 0]
      : h < 120
        ? [x, c, 0]
        : h < 180
          ? [0, c, x]
          : h < 240
            ? [0, x, c]
            : h < 300
              ? [x, 0, c]
              : [c, 0, x];

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function luminance({ r, g, b }: Rgb): number {
  const channel = (value: number) => {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a: Rgb, b: Rgb): number {
  const [brighter, darker] = [luminance(a), luminance(b)].sort((left, right) => right - left);
  return (brighter + 0.05) / (darker + 0.05);
}

const round = (value: number) => Math.round(value * 10) / 10;
