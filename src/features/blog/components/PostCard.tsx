import { ArrowUpRight, Briefcase, Calendar, Clock, Eye, Heart, MessageCircle, Send } from 'lucide-react';
import { GLASS_STYLES } from '../../../constants/styles';
import { TagChip } from './TagChip';
import { formatReadTime } from '../utils/readTime';
import { useNavigate } from 'react-router-dom';
import type { PostSummary } from '../../../schemas/postSchema';

export interface PostCardProps {
  post: PostSummary;
  relatedProjectId?: number;
  /** 관리자에게만 전달된다. 없으면 발행 버튼을 노출하지 않는다. */
  onPublish?: (postId: number) => void;
}

export const PostCard = ({ post, relatedProjectId, onPublish }: PostCardProps) => {
  const navigate = useNavigate();
  const postId = post.postId ?? 0;
  const date = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : new Date().toLocaleDateString();
  // 아무도 읽지 않은 글에는 읽기 시간을 표시하지 않는다.
  const readTime = formatReadTime(post.averageReadMs);

  const handleProjectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/#projects');
  };

  const handleCardClick = () => {
    navigate(`/blog/${postId}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className={`${GLASS_STYLES.card} ${GLASS_STYLES.cardHover} p-6 sm:p-8 group cursor-pointer relative overflow-hidden`}
    >
      {relatedProjectId && (
        <button
          type="button"
          onClick={handleProjectClick}
          className="absolute top-0 right-0 px-4 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl flex items-center gap-1.5 hover:bg-indigo-700 transition-colors z-10"
        >
          <Briefcase size={12} />
          View Project
        </button>
      )}

      <div className="flex items-center gap-3 text-xs text-gray-400 mb-4 font-mono">
        {/* 임시저장 글은 관리자에게만 내려오므로, 뱃지가 보이면 곧 관리자 화면이다. */}
        {post.status === 'DRAFT' && (
          <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 font-black tracking-wider">
            임시저장
          </span>
        )}
        {post.status === 'DRAFT' && onPublish && (
          <button
            type="button"
            onClick={(e) => {
              // 카드 전체가 상세로 이동하는 클릭 영역이라 전파를 막는다.
              e.stopPropagation();
              onPublish(post.postId ?? 0);
            }}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-600 text-white font-black tracking-wider hover:bg-indigo-700 transition-colors"
          >
            <Send size={10} /> 발행
          </button>
        )}
        <span className="flex items-center gap-1">
          <Calendar size={12} /> {date}
        </span>
        {readTime && (
          <>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1" title="방문자들의 평균 읽기 시간">
              <Clock size={12} /> {readTime}
            </span>
          </>
        )}
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <span className="flex items-center gap-1" title="조회수">
          <Eye size={12} /> {post.viewCount ?? 0}
        </span>
        <span className="flex items-center gap-1" title="댓글 수">
          <MessageCircle size={12} /> {post.commentCount}
        </span>
        {/* 목록에서는 개수만 보여준다. 누르는 것은 글을 읽은 뒤가 자연스럽다. */}
        <span className="flex items-center gap-1" title="좋아요 수">
          <Heart size={12} /> {post.likeCount}
        </span>
      </div>

      <h2 className={`${GLASS_STYLES.heading} text-2xl mb-3 group-hover:text-indigo-600 transition-colors`}>
        {post.titleName}
      </h2>
      <p className={`${GLASS_STYLES.subtext} leading-relaxed mb-6 line-clamp-2`}>
        {post.excerpt ?? ''}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagChip key={tag.slug} tag={tag} />
          ))}
        </div>
        <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
          <ArrowUpRight size={16} />
        </div>
      </div>
    </article>
  );
};
