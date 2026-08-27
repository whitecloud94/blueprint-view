import { MessageSquare, Pencil, Trash2 } from 'lucide-react';
import { LikeButton } from '../components/LikeButton';
import type { CommentReply } from '../../../schemas/commentSchema';

const STYLES = {
  meta: 'flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 font-mono mb-2',
  name: 'font-bold text-gray-700 dark:text-gray-300 font-sans',
  // 익명 입력이므로 마크다운으로 렌더링하지 않는다. React 기본 이스케이프에 맡기고
  // 줄바꿈만 보존한다. 마크다운을 허용하면 임의의 링크·이미지 삽입 경로가 열린다.
  content: 'text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap break-words',
  deleted: 'text-[15px] text-gray-400 dark:text-gray-600 italic',
  action: 'flex items-center gap-1 text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-accent-600 dark:hover:text-accent-400 transition-colors',
};

interface CommentItemProps {
  /** 최상위 댓글과 답글이 같은 필드를 쓰므로 답글 타입을 그대로 받는다. */
  comment: CommentReply;
  /** 답글에는 답글을 달 수 없으므로 최상위에서만 전달된다. */
  onReply?: (commentId: number) => void;
  onEdit: (commentId: number) => void;
  onDelete: (comment: CommentReply) => void;
  isAdmin: boolean;
  onError?: (message: string) => void;
}

export const CommentItem = ({ comment, onReply, onEdit, onDelete, isAdmin, onError }: CommentItemProps) => {
  const isDeleted = comment.deleted;

  return (
    <div className={comment.depth === 1 ? 'pl-6 sm:pl-10 border-l-2 border-gray-100 dark:border-white/10' : ''}>
      <div className={STYLES.meta}>
        <span className={STYLES.name}>{isDeleted ? '알 수 없음' : comment.guestName}</span>
        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
        <time dateTime={comment.createdAt}>{new Date(comment.createdAt).toLocaleDateString()}</time>
      </div>

      {isDeleted ? (
        <p className={STYLES.deleted}>삭제된 댓글입니다.</p>
      ) : (
        <p className={STYLES.content}>{comment.content}</p>
      )}

      {!isDeleted && (
        <div className="flex items-center gap-4 mt-2">
          <LikeButton
            target="comment"
            targetId={comment.commentId}
            initialCount={comment.likeCount}
            initialLiked={comment.likedByMe}
            onError={onError}
            size="sm"
          />
          {onReply && (
            <button type="button" onClick={() => onReply(comment.commentId)} className={STYLES.action}>
              <MessageSquare size={12} /> 답글
            </button>
          )}
          <button type="button" onClick={() => onEdit(comment.commentId)} className={STYLES.action}>
            <Pencil size={12} /> 수정
          </button>
          <button type="button" onClick={() => onDelete(comment)} className={STYLES.action}>
            <Trash2 size={12} /> 삭제{isAdmin && ' (관리자)'}
          </button>
        </div>
      )}
    </div>
  );
};
