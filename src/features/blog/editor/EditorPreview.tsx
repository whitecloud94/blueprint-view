import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useFormContext, useWatch } from 'react-hook-form';
import type { PostFormData } from '../../../schemas/postSchema';

interface PreviewPaneProps {
  className?: string;
  showLiveBadge?: boolean;
}

const EditorPreview = ({ className = '', showLiveBadge = false }: PreviewPaneProps) => {
  const { control } = useFormContext<PostFormData>();
  const titleName = useWatch({ control, name: 'titleName' });
  const content = useWatch({ control, name: 'content' });

  return (
    <div className={`flex flex-col overflow-hidden ${className}`}>
      {showLiveBadge && (
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 shrink-0">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Live Preview</h2>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-8 sm:p-12 custom-scrollbar">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {titleName || 'Untitled Post'}
          </h1>
          <div className="prose prose-indigo prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
            {content ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ ...props }) => (
                    <h1 className="text-4xl font-black text-gray-900 mt-12 mb-6" {...props} />
                  ),
                  h2: ({ ...props }) => (
                    <h2 className="text-3xl font-black text-gray-900 mt-10 mb-4" {...props} />
                  ),
                  h3: ({ ...props }) => (
                    <h3 className="text-2xl font-black text-gray-900 mt-8 mb-3" {...props} />
                  ),
                  code({ className: codeClassName, children, ...props }) {
                    const match = /language-(\w+)/.exec(codeClassName || '');
                    const isInline = !match;
                    return !isInline ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={codeClassName} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            ) : (
              <p className="text-gray-300 italic">Preview will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EditorPreview);
