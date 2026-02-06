import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link as LinkIcon } from 'lucide-react';
import { PROJECTS } from '../../../data';

interface PreviewPaneProps {
  title: string;
  content: string;
  tags: string[];
  relatedProjectId: number | null;
  className?: string;
  showLiveBadge?: boolean;
}

const PreviewPanel = ({
  title,
  content,
  tags,
  relatedProjectId,
  className = '',
  showLiveBadge = false,
}: PreviewPaneProps) => {
  return (
    <div className={`flex flex-col overflow-hidden ${className}`}>
      {showLiveBadge && (
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 shrink-0">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Live Preview</h2>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-8 sm:p-12 custom-scrollbar">
        <div className="max-w-3xl mx-auto">
          {relatedProjectId && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-wider mb-6">
              <LinkIcon size={12} />
              Related Project: {PROJECTS.find((p) => p.id === relatedProjectId)?.title}
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {title || 'Untitled Post'}
          </h1>
          <div className="flex gap-2 mb-10">
            {tags.map((tag) => (
              <span key={tag} className="text-sm font-bold text-indigo-500">
                #{tag}
              </span>
            ))}
          </div>
          <div className="prose prose-indigo prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
            {content ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-4xl font-black text-gray-900 mt-12 mb-6" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-3xl font-black text-gray-900 mt-10 mb-4" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-2xl font-black text-gray-900 mt-8 mb-3" {...props} />
                  ),
                  code({ node, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
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
                      <code className={className} {...props}>
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

export default React.memo(PreviewPanel);
