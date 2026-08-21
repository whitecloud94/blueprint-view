import { useCallback, useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { GLASS_STYLES } from '../../../constants/styles';
import { commentService } from '../../../services/commentService';
import { getAxiosErrorMessage } from '../../../api/axiosInstance';
import { useIsAdmin } from '../../../store/useAuthStore';
import { useErrorActions } from '../../../store/useErrorStore';
import { ConfirmDialog } from '../../../components/common/feedback/ConfirmDialog';
import { PasswordPromptDialog } from '../../../components/common/feedback/PasswordPromptDialog';
import { CommentForm } from './CommentForm';
import { CommentEditForm } from './CommentEditForm';
import { CommentItem } from './CommentItem';
import type { Comment, CommentFormData, CommentReply } from '../../../schemas/commentSchema';

/** 비밀번호 불일치를 나타내는 서버 도메인 코드. */
const PASSWORD_MISMATCH_CODE = 'M002';

interface CommentSectionProps {
  postId: number;
  onNotify: (message: string) => void;
}

/**
 * 댓글 영역.
 *
 * <p>수정은 인라인 폼에서 내용과 비밀번호를 함께 받는다. 삭제는 되돌릴 수 없어
 * 비밀번호 확인 대화상자를 거치며, 관리자는 스팸 정리를 위해 비밀번호 없이
 * 삭제 확인만 거친다.
 *
 * <p>비밀번호 불일치는 폼이나 대화상자를 닫지 않고 자리에서 알린다. 닫으면
 * 사용자가 수정 내용부터 다시 입력해야 한다.
 */
export const CommentSection = ({ postId, onNotify }: CommentSectionProps) => {
  const isAdmin = useIsAdmin();
  const { showError } = useErrorActions();

  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CommentReply | null>(null);
  const [isProcessing, setProcessing] = useState(false);
  const [actionError, setActionError] = useState<string>();

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      setComments(await commentService.getComments(postId));
    } catch (error) {
      onNotify(getAxiosErrorMessage(error, '댓글을 불러오지 못했습니다.'));
    } finally {
      setIsLoading(false);
    }
  }, [postId, onNotify]);

  useEffect(() => {
    void fetchComments();
  }, [fetchComments]);

  const handleCreate = async (data: CommentFormData, parentId?: number) => {
    try {
      await commentService.addComment(postId, { ...data, parentId });
      setReplyTo(null);
      await fetchComments();
    } catch (error) {
      showError(error, { fallbackTitle: '댓글을 등록하지 못했습니다' });
    }
  };

  const handleUpdate = async (commentId: number, content: string, password: string) => {
    setProcessing(true);
    try {
      await commentService.updateComment(commentId, { guestPassword: password, content });
      setEditingId(null);
      setActionError(undefined);
      await fetchComments();
    } catch (error) {
      handleActionError(error, () => setEditingId(null));
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (password?: string) => {
    if (!deleteTarget) return;

    setProcessing(true);
    try {
      await commentService.deleteComment(deleteTarget.commentId, password);
      setDeleteTarget(null);
      setActionError(undefined);
      await fetchComments();
    } catch (error) {
      handleActionError(error, () => setDeleteTarget(null));
    } finally {
      setProcessing(false);
    }
  };

  /** 비밀번호 문제는 자리에서 알리고, 그 외에는 폼을 닫고 전역 대화상자로 넘긴다. */
  const handleActionError = (error: unknown, close: () => void) => {
    if (isPasswordMismatch(error)) {
      setActionError(getAxiosErrorMessage(error));
      return;
    }
    close();
    showError(error, { fallbackTitle: '요청을 처리하지 못했습니다' });
  };

  const startEditing = (commentId: number) => {
    setActionError(undefined);
    setReplyTo(null);
    setEditingId(commentId);
  };

  const requestDelete = (comment: CommentReply) => {
    setActionError(undefined);
    setDeleteTarget(comment);
  };

  const renderComment = (comment: CommentReply, onReply?: (id: number) => void) =>
    editingId === comment.commentId ? (
      <CommentEditForm
        initialContent={comment.content ?? ''}
        isProcessing={isProcessing}
        errorMessage={actionError}
        onSubmit={(content, password) => void handleUpdate(comment.commentId, content, password)}
        onCancel={() => setEditingId(null)}
      />
    ) : (
      <CommentItem
        comment={comment}
        onReply={onReply}
        onEdit={startEditing}
        onDelete={requestDelete}
        isAdmin={isAdmin}
      />
    );

  const totalCount = comments.reduce((sum, comment) => sum + 1 + comment.replies.length, 0);

  return (
    <section className={`${GLASS_STYLES.card} bg-white/80 dark:bg-gray-900/40 p-8 sm:p-10 space-y-8`}>
      <h2 className={`${GLASS_STYLES.heading} text-xl flex items-center gap-2`}>
        <MessageCircle size={20} className="text-indigo-500" aria-hidden="true" />
        댓글 {totalCount}
      </h2>

      <CommentForm onSubmit={handleCreate} onInvalid={onNotify} />

      {isLoading ? (
        <p className={GLASS_STYLES.subtext}>댓글을 불러오는 중...</p>
      ) : comments.length === 0 ? (
        <p className={GLASS_STYLES.subtext}>첫 댓글을 남겨보세요.</p>
      ) : (
        <ul className="space-y-7">
          {comments.map((comment) => (
            <li key={comment.commentId} className="space-y-5">
              {renderComment(comment, setReplyTo)}

              {replyTo === comment.commentId && (
                <div className="pl-6 sm:pl-10">
                  <CommentForm
                    parentId={comment.commentId}
                    onSubmit={handleCreate}
                    onCancel={() => setReplyTo(null)}
                    onInvalid={onNotify}
                  />
                </div>
              )}

              {comment.replies.map((reply) => (
                <div key={reply.commentId} className="pl-6 sm:pl-10">
                  {renderComment(reply)}
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}

      {/* 관리자는 비밀번호 없이 지우므로 확인만 받는다. */}
      <ConfirmDialog
        isOpen={deleteTarget !== null && isAdmin}
        title="댓글을 삭제할까요?"
        description="관리자 권한으로 삭제합니다. 답글이 달린 댓글은 자리만 남고 내용이 감춰집니다."
        confirmLabel="삭제"
        isProcessing={isProcessing}
        onConfirm={() => void handleDelete()}
        onCancel={() => setDeleteTarget(null)}
      />

      <PasswordPromptDialog
        isOpen={deleteTarget !== null && !isAdmin}
        title="댓글을 삭제할까요?"
        description="작성 시 입력한 비밀번호를 입력하세요. 삭제한 댓글은 복구할 수 없습니다."
        confirmLabel="삭제"
        isProcessing={isProcessing}
        errorMessage={actionError}
        onConfirm={(password) => void handleDelete(password)}
        onCancel={() => setDeleteTarget(null)}
      />
    </section>
  );
};

function isPasswordMismatch(error: unknown): boolean {
  const data = (error as { response?: { data?: { code?: string } } })?.response?.data;
  return data?.code === PASSWORD_MISMATCH_CODE;
}
