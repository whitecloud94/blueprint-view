import React from 'react';
import { Tag as TagIcon, X, Link as LinkIcon, ChevronDown } from 'lucide-react';
import { PROJECTS } from '../../../data';

interface EditorPaneProps {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  currentTag: string;
  setCurrentTag: (tag: string) => void;
  relatedProjectId: number | null;
  setRelatedProjectId: (id: number | null) => void;
  className?: string;
  isCompact?: boolean;
}

const EditorPanel = ({
  title,
  setTitle,
  content,
  setContent,
  tags,
  setTags,
  currentTag,
  setCurrentTag,
  relatedProjectId,
  setRelatedProjectId,
  className = '',
  isCompact = false,
}: EditorPaneProps) => {
  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      const next = currentTag.trim();
      const isValid = /^[a-zA-Z0-9-_]{1,20}$/.test(next);
      if (!isValid) {
        alert('태그는 영문/숫자, 하이픈(-), 언더스코어(_)만 허용하며 최대 20자입니다.');
        return;
      }
      if (tags.length >= 10) {
        alert('태그는 최대 10개까지 추가할 수 있습니다.');
        return;
      }
      if (!tags.includes(next)) {
        setTags([...tags, next]);
      }
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className={`flex flex-col overflow-hidden ${className}`}>
      <div className={`${isCompact ? 'p-6' : 'p-8'} space-y-6 shrink-0 border-b border-gray-100`}>
        <input
          type="text"
          placeholder="Enter post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full ${
            isCompact ? 'text-2xl' : 'text-4xl'
          } font-black bg-transparent border-none outline-none placeholder:text-gray-300 text-gray-900`}
        />

        <div className="flex flex-wrap gap-4 items-center">
          {/* 프로젝트 연동 */}
          <div className="relative group">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
              <LinkIcon size={14} />
              <select
                value={relatedProjectId || ''}
                onChange={(e) => setRelatedProjectId(Number(e.target.value) || null)}
                className="bg-transparent outline-none cursor-pointer appearance-none pr-6"
              >
                <option value="">No Related Project</option>
                {PROJECTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2 pointer-events-none" />
            </div>
          </div>

          {/* 태그 입력 */}
          <div className="flex flex-wrap gap-2 items-center flex-1">
            <div className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg border border-indigo-100">
              <TagIcon size={14} />
              <input
                type="text"
                placeholder="Add tag..."
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleAddTag}
                className="bg-transparent outline-none text-sm font-bold w-20 placeholder:text-indigo-300"
              />
            </div>
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-bold text-gray-600 shadow-sm"
              >
                #{tag}
                <button onClick={() => removeTag(tag)} className="hover:text-red-500">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto ${isCompact ? 'p-6' : 'px-8 pb-8'} custom-scrollbar`}>
        <textarea
          placeholder="Write your story using Markdown..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full bg-transparent border-none outline-none resize-none text-lg leading-relaxed text-gray-700 placeholder:text-gray-300 min-h-[400px] font-mono"
        />
      </div>
    </div>
  );
};

export default React.memo(EditorPanel);
