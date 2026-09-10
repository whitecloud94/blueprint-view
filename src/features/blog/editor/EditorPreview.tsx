import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { MarkdownContent } from '../components/MarkdownContent';
import type { PostFormData } from '../../../schemas/postSchema';

interface PreviewPaneProps {
  className?: string;
  showLiveBadge?: boolean;
  /** 실제로 스크롤되는 요소를 바깥에 알린다. 편집 창과 위치를 맞추는 데 쓴다. */
  scrollRef?: (element: HTMLDivElement | null) => void;
}

const EditorPreview = ({ className = '', showLiveBadge = false, scrollRef }: PreviewPaneProps) => {
  const { control } = useFormContext<PostFormData>();
  const titleName = useWatch({ control, name: 'titleName' });
  const content = useWatch({ control, name: 'content' });

  return (
    <div className={`flex flex-col overflow-hidden ${className}`}>
      {showLiveBadge && (
        <div className="p-6 border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.02] shrink-0">
          <h2 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            Live Preview
          </h2>
        </div>
      )}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 sm:p-12 custom-scrollbar">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
            {titleName || 'Untitled Post'}
          </h1>
          <div className="prose prose-sky prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white">
            {content ? (
              // withSourceLines: 블록마다 원문 줄 번호를 남긴다. 편집 창과 스크롤을 맞출 때 쓰인다.
              <MarkdownContent withSourceLines>{content}</MarkdownContent>
            ) : (
              <p className="text-gray-300 dark:text-gray-600 italic">Preview will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EditorPreview);
