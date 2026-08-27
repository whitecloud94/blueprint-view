import { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';

/** 글 하나에 붙일 수 있는 태그 수. 서버와 같은 값이다. */
const MAX_TAGS = 10;

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

/**
 * 태그 입력.
 *
 * <p>velog 처럼 Enter 나 쉼표로 확정하고 Backspace 로 직전 태그를 지운다.
 *
 * <p>중복 판정은 서버의 정규화 규칙(소문자, 공백→하이픈)을 흉내 내 화면에서도
 * 먼저 막는다. 서버가 최종 판정을 하지만, 입력한 태그가 조용히 사라지면
 * 사용자는 이유를 알 수 없다.
 */
export const TagInput = ({ tags, onChange }: TagInputProps) => {
  const [draft, setDraft] = useState('');

  const commit = () => {
    const name = draft.trim().replace(/^#/, '');
    if (!name) return;

    const slug = toSlug(name);
    const isDuplicate = tags.some((tag) => toSlug(tag) === slug);

    if (slug && !isDuplicate && tags.length < MAX_TAGS) {
      onChange([...tags, name]);
    }
    setDraft('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      // Enter 가 폼 제출로 이어지면 태그를 입력하다 글이 저장된다.
      event.preventDefault();
      commit();
      return;
    }

    if (event.key === 'Backspace' && !draft && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[13px] font-medium bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400"
        >
          #{tag}
          <button
            type="button"
            onClick={() => onChange(tags.filter((t) => t !== tag))}
            aria-label={`${tag} 태그 삭제`}
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <X size={12} />
          </button>
        </span>
      ))}

      <input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={commit}
        disabled={tags.length >= MAX_TAGS}
        placeholder={tags.length >= MAX_TAGS ? `태그는 최대 ${MAX_TAGS}개` : '태그를 입력하고 Enter'}
        aria-label="태그 입력"
        className="flex-1 min-w-[180px] bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-600"
      />
    </div>
  );
};

/** 서버 TagEntity.toSlug 와 같은 규칙. 중복 입력을 화면에서 먼저 막기 위한 것이다. */
function toSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
