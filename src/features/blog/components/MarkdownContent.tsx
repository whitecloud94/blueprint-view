import type { CSSProperties } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { resolveAssetUrl } from '../../../api/assetUrl';

/**
 * 하이라이터 테마 타입 보정.
 *
 * react-syntax-highlighter 의 스타일 선언은 `CSSProperties | Record<string, CSSProperties>`
 * 인데 컴포넌트는 후자만 받는다. 실제 값은 항상 토큰별 스타일 맵이므로 좁혀서 넘긴다.
 */
const CODE_THEME = vscDarkPlus as Record<string, CSSProperties>;

/**
 * 본문 마크다운 렌더링 규칙.
 *
 * 미리보기와 상세 화면이 같은 결과를 보여야 하므로 한 곳에서 정의한다.
 * 두 화면에 각각 두면 한쪽만 고쳐져 "작성 화면과 실제 글이 다르게 보이는" 문제가 생긴다.
 */
const MARKDOWN_COMPONENTS: Components = {
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

  // node/ref/style 은 react-markdown 이 넘겨주지만 SyntaxHighlighter 의 타입과
  // 맞지 않는다. 아래로 흘려보내지 않도록 구조 분해에서 걷어 낸다.
  code({ className, children, node, ref, style, ...props }) {
    const match = /language-(\w+)/.exec(className || '');

    // 언어 지정이 없으면 인라인 코드로 본다.
    if (!match) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    return (
      <SyntaxHighlighter style={CODE_THEME} language={match[1]} PreTag="div" {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  },
};

interface MarkdownContentProps {
  children: string;
}

export const MarkdownContent = ({ children }: MarkdownContentProps) => (
  <ReactMarkdown remarkPlugins={[remarkGfm]} components={MARKDOWN_COMPONENTS}>
    {children}
  </ReactMarkdown>
);
