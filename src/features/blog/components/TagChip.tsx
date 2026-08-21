import { useNavigate } from 'react-router-dom';
import type { Tag } from '../../../schemas/postSchema';

interface TagChipProps {
  tag: Tag;
  /** 글 수를 함께 보여줄 때(사이드바 등). */
  count?: number;
  isActive?: boolean;
  size?: 'sm' | 'md';
}

/**
 * 태그 칩.
 *
 * <p>표시는 원본 이름, 이동은 slug 로 한다. "Spring Boot" 와 "spring boot" 가
 * 같은 곳으로 가야 하기 때문이다.
 *
 * <p>카드 안에서도 쓰이므로 클릭 전파를 막는다. 그러지 않으면 태그를 눌러도
 * 카드의 상세 이동이 함께 실행된다.
 */
export const TagChip = ({ tag, count, isActive = false, size = 'sm' }: TagChipProps) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        navigate(`/blog/tags/${tag.slug}`);
      }}
      className={`inline-flex items-center gap-1 rounded-lg font-medium transition-colors ${
        size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'
      } ${
        isActive
          ? 'bg-indigo-600 text-white'
          : 'text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200'
      }`}
    >
      #{tag.name}
      {count !== undefined && <span className="opacity-60">{count}</span>}
    </button>
  );
};
