import { useEffect } from 'react';
import { postService } from '../../../services/postService';

const VIEWED_POSTS_KEY = 'viewed-posts';

/**
 * 상세 화면 진입 시 조회수를 올린다.
 *
 * <p>같은 방문자가 새로고침하거나 뒤로가기로 돌아올 때마다 세는 것을 막기 위해
 * 세션 단위로 기록해 둔다. sessionStorage 를 쓰는 이유는 탭을 닫으면 초기화되어
 * "한 번의 방문"이라는 단위와 맞기 때문이다.
 *
 * <p>클라이언트 억제라 우회할 수 있다. 개인 블로그의 조회수는 참고 지표이고,
 * 정확도를 위해 IP 추적이나 별도 집계 테이블을 둘 만한 값은 아니라고 판단했다.
 *
 * <p>실패는 무시한다. 조회수는 본문 열람과 무관한 부가 정보다.
 */
export function useViewCount(postId: number | undefined, isPublished: boolean) {
  useEffect(() => {
    if (postId === undefined || !isPublished || hasViewed(postId)) return;

    markViewed(postId);
    void postService.increaseViewCount(postId).catch(() => undefined);
  }, [postId, isPublished]);
}

function readViewedPosts(): number[] {
  try {
    const saved = sessionStorage.getItem(VIEWED_POSTS_KEY);
    const parsed: unknown = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is number => typeof id === 'number') : [];
  } catch {
    return [];
  }
}

function hasViewed(postId: number): boolean {
  return readViewedPosts().includes(postId);
}

function markViewed(postId: number): void {
  try {
    sessionStorage.setItem(VIEWED_POSTS_KEY, JSON.stringify([...readViewedPosts(), postId]));
  } catch {
    // 저장소를 못 쓰는 환경(프라이빗 모드 등)에서는 중복 집계를 감수한다.
  }
}
