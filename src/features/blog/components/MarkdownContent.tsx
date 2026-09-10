import { useMemo, type CSSProperties } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { resolveAssetUrl } from '../../../api/assetUrl';
import { useTheme } from '../../../context/ThemeContext';
import { withReadableTokens, type CodeTheme } from '../utils/codeTheme';

/**
 * 코드블럭 배경.
 *
 * <p>아래 CODE_FRAME 의 배경 클래스와 같은 값이어야 한다. Tailwind 는 소스에 적힌
 * 클래스 문자열을 그대로 훑기 때문에 이 상수를 클래스 안에 끼워 넣을 수 없다.
 * 대신 두 값이 어긋나면 대비 계산이 실제 화면과 달라지므로, 화면에서 재는 검증으로
 * 어긋남을 잡는다.
 *
 * <p>불투명한 값을 쓴다. 반투명 배경은 아래에 무엇이 깔리느냐에 따라 실제 색이
 * 달라져서, 토큰 색을 맞출 기준이 사라진다.
 */
const CODE_BACKGROUND = {
  light: '#f3f4f6',
  dark: '#111111',
} as const;

/**
 * 화면 모드별 구문 색.
 *
 * 결정      : 코드블럭도 화면 모드를 따라간다.
 * 이유      : 어두운 블럭 하나로 두 모드를 버티면 어느 한쪽이 항상 어색하다.
 *             밝은 화면에서는 종이 한가운데 검은 판이 박히고, 어두운 화면에서는
 *             카드 배경과 명도가 겹쳐 블럭의 경계가 사라진다.
 * 대안      : 두 모드 모두 어두운 블럭으로 통일한다.
 * 트레이드오프: 테마 객체를 두 개 들고 있어야 하고, 모드를 바꾸면 블럭이 다시 그려진다.
 * 선택 이유  : 두 객체는 색 표에 가까워 무게가 거의 없고, 다시 그리는 시점은
 *             사용자가 직접 모드를 바꾼 순간뿐이다.
 */
const CODE_THEMES: Record<'light' | 'dark', CodeTheme> = {
  light: withReadableTokens(oneLight as CodeTheme, CODE_BACKGROUND.light),
  dark: withReadableTokens(vscDarkPlus as CodeTheme, CODE_BACKGROUND.dark),
};

/**
 * 코드블럭 테두리.
 *
 * <p>배경만으로는 모드마다 한쪽이 묻힌다. 밝은 화면에서는 카드가 흰색이라 옅은
 * 회색 배경이 거의 같은 색으로 보이고, 어두운 화면에서는 카드와 블럭이 모두
 * 검정 계열이라 경계가 없다. 그래서 배경은 카드보다 한 단계 밀어 두고(밝은 쪽은
 * 어둡게, 어두운 쪽은 더 어둡게) 테두리로 경계를 고정한다.
 *
 * <p>안쪽 여백을 여기에 둔다. 언어를 적은 블럭은 하이라이터가, 적지 않은 블럭은
 * 브라우저가 그리는데 두 경로가 같은 틀을 쓰게 하려면 여백도 한곳에 있어야 한다.
 *
 * <p>prose 의 pre 규칙은 :where() 로 감싸여 특이도가 0 이라 유틸리티가 그대로 이긴다.
 */
const CODE_FRAME = `
  my-8 overflow-x-auto rounded-2xl border font-mono
  p-5 sm:p-6
  border-gray-200 bg-[#f3f4f6] text-gray-800
  dark:border-white/10 dark:bg-[#111111] dark:text-gray-200
  [&_code]:!bg-transparent [&_code]:!border-0 [&_code]:!p-0 [&_code]:!font-normal
`;

/**
 * 문장 안의 코드.
 *
 * <p>글꼴만으로는 코드인지 알아보기 어렵다. 본문이 이미 한글이라 모양 차이가
 * 드러나지 않고, 색도 본문과 1.5:1 남짓밖에 벌어지지 않는다.
 * `@DisallowConcurrentExecution` 처럼 긴 식별자가 문장 중간에 들어오면 그냥
 * 굵은 낱말로 읽힌다.
 *
 * <p>그래서 배경을 깐다. 값은 코드블럭의 틀과 같은 계열로 맞춘다. 문장 안의
 * 코드와 블럭이 서로 다른 색이면 같은 것의 두 표기로 읽히지 않는다.
 *
 * <p>강조색은 쓰지 않는다. prose-sky 에서 링크가 그 색을 쓰고 있어, 누를 수
 * 있는 것처럼 보이게 된다.
 *
 * <p>위 CODE_FRAME 이 블럭 안에서 이 배경과 여백을 되돌린다. 코드블럭도 결국
 * code 요소라 여기서 준 칩 모양이 블럭 안까지 따라 들어간다. 그 되돌림에는
 * important 를 붙였다. 특이도로 이기려 하면 여기에 dark: 변형을 하나 더하는
 * 순간(.dark .bg-... 는 클래스 두 개다) 조용히 뒤집힌다. 실제로 그렇게 뒤집혀
 * 어두운 모드의 블럭 안 코드에만 칩 배경이 남았다.
 */
const INLINE_CODE = `
  rounded-md border px-[0.35em] py-[0.15em]
  border-gray-200 bg-[#f3f4f6] text-gray-800
  dark:border-white/10 dark:bg-white/[0.1] dark:text-gray-100
`;

/** 하이라이터가 들고 있는 자체 배경·여백·글꼴을 걷어내고 틀에 맞춘다. */
const HIGHLIGHTER_STYLE: CSSProperties = {
  margin: 0,
  padding: 0,
  background: 'transparent',
  fontSize: 'inherit',
  fontFamily: 'inherit',
};

const CODE_TAG_STYLE: CSSProperties = {
  background: 'transparent',
  fontSize: 'inherit',
  fontFamily: 'inherit',
};

/**
 * 본문 마크다운 렌더링 규칙.
 *
 * 미리보기와 상세 화면이 같은 결과를 보여야 하므로 한 곳에서 정의한다.
 * 두 화면에 각각 두면 한쪽만 고쳐져 "작성 화면과 실제 글이 다르게 보이는" 문제가 생긴다.
 */
const buildComponents = (theme: 'light' | 'dark'): Components => ({
  h1: ({ ...props }) => (
    <h1 className="text-4xl font-black text-gray-900 dark:text-white mt-12 mb-6" {...props} />
  ),
  h2: ({ ...props }) => (
    <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-10 mb-4" {...props} />
  ),
  h3: ({ ...props }) => (
    <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-8 mb-3" {...props} />
  ),

  // 업로드 이미지는 호스트 없는 경로로 저장돼 있어 렌더링 시점에 API 오리진을 붙인다.
  img: ({ src, alt, ...props }) => (
    <img
      src={resolveAssetUrl(typeof src === 'string' ? src : undefined)}
      alt={alt ?? ''}
      loading="lazy"
      className="rounded-2xl w-full"
      {...props}
    />
  ),

  // 코드블럭의 틀. 언어를 적은 블럭과 적지 않은 블럭이 이 하나를 함께 쓴다.
  pre: ({ children, ...props }) => (
    <pre className={CODE_FRAME} {...props}>
      {children}
    </pre>
  ),

  // node/ref/style 은 react-markdown 이 넘겨주지만 SyntaxHighlighter 의 타입과
  // 맞지 않는다. 아래로 흘려보내지 않도록 구조 분해에서 걷어 낸다.
  code({ className, children, node, ref, style, ...props }) {
    const match = /language-(\w+)/.exec(className || '');

    // 언어 지정이 없으면 인라인 코드로 본다.
    if (!match) {
      return (
        <code className={`${INLINE_CODE} ${className ?? ''}`} {...props}>
          {children}
        </code>
      );
    }

    return (
      <SyntaxHighlighter
        style={CODE_THEMES[theme]}
        language={match[1]}
        // pre 는 위에서 이미 틀로 그렸다. 여기서 또 만들면 틀이 겹친다.
        PreTag="div"
        customStyle={HIGHLIGHTER_STYLE}
        codeTagProps={{ style: CODE_TAG_STYLE }}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  },
});

interface MarkdownContentProps {
  children: string;
}

export const MarkdownContent = ({ children }: MarkdownContentProps) => {
  const { theme } = useTheme();
  const components = useMemo(() => buildComponents(theme), [theme]);

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
};
