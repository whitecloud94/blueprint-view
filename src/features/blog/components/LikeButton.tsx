import { useState } from 'react';
import { Heart } from 'lucide-react';
import { likeService } from '../../../services/likeService';
import { getAxiosErrorMessage } from '../../../api/axiosInstance';

type LikeTarget = 'post' | 'comment';

interface LikeButtonProps {
  target: LikeTarget;
  targetId: number;
  initialCount: number;
  initialLiked: boolean;
  /** 실패를 알릴 통로. 좋아요는 부가 동작이라 토스트로 충분하다. */
  onError?: (message: string) => void;
  size?: 'sm' | 'md';
}

/**
 * 좋아요 토글 버튼.
 *
 * <p>개수를 스스로 ±1 하지 않고 서버가 센 값으로 교체한다. 그 사이 다른 방문자가
 * 눌렀다면 클라이언트 계산과 실제 값이 어긋난다.
 *
 * <p>연타를 막기 위해 요청 중에는 비활성화한다. 서버도 복합 PK 로 중복을 막지만,
 * 화면이 깜빡이는 것을 줄이는 편이 낫다.
 */
export const LikeButton = ({
  target,
  targetId,
  initialCount,
  initialLiked,
  onError,
  size = 'md',
}: LikeButtonProps) => {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(initialLiked);
  const [isPending, setPending] = useState(false);

  const handleClick = async () => {
    setPending(true);
    try {
      const result =
        target === 'post'
          ? await likeService.togglePostLike(targetId)
          : await likeService.toggleCommentLike(targetId);

      setLiked(result.liked);
      setCount(result.likeCount);
    } catch (error) {
      onError?.(getAxiosErrorMessage(error, '좋아요를 처리하지 못했습니다.'));
    } finally {
      setPending(false);
    }
  };

  const iconSize = size === 'sm' ? 12 : 16;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={liked}
      aria-label={liked ? '좋아요 취소' : '좋아요'}
      className={`inline-flex items-center gap-1.5 rounded-full border transition-all active:scale-95 disabled:opacity-50 ${
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-4 py-2 text-sm'
      } ${
        liked
          ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-500 font-bold'
          : 'bg-white/60 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-red-200 hover:text-red-500'
      }`}
    >
      <Heart size={iconSize} fill={liked ? 'currentColor' : 'none'} aria-hidden="true" />
      {count}
    </button>
  );
};
