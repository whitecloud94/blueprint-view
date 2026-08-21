import { useCallback, useEffect, useState } from 'react';
import { postService } from '../../../services/postService';
import { tagService } from '../../../services/tagService';
import type { TagSummary } from '../../../schemas/postSchema';

/** 사이드바 탐색에 필요한 데이터. */
export interface BlogNavigation {
  tags: TagSummary[];
  /**
   * 전체 글 수.
   *
   * 태그 건수의 합이 아니다. 글 하나에 태그가 여럿 달리면 중복으로 세어지고,
   * 태그가 없는 글은 아예 빠진다. 목록 API 가 알려 주는 총계를 그대로 쓴다.
   */
  totalPostCount: number;
}

export type BlogNavigationState =
  | { status: 'loading' }
  | { status: 'ready'; data: BlogNavigation }
  | { status: 'failed' };

/**
 * 조회 결과를 잠시 들고 있는 시간.
 *
 * 라우터가 화면 전환마다 트리를 다시 그려서 사이드바도 매번 새로 붙는다. 그때마다
 * 조회하면 글 하나 열어 보는 동안에도 스켈레톤이 반복해서 깜빡인다.
 *
 * 발행·삭제 시점에 캐시를 지우는 방식도 있지만, 그러려면 글을 바꾸는 모든 화면이
 * 사이드바의 존재를 알아야 한다. 짧은 유효 시간을 두면 그 결합 없이 스스로 맞춰진다.
 * 대신 방금 발행한 글의 건수가 최대 이 시간만큼 늦게 반영된다.
 */
const CACHE_TTL_MS = 60_000;

let cache: { loadedAt: number; data: BlogNavigation } | null = null;
let inFlight: Promise<BlogNavigation> | null = null;

const readFreshCache = (): BlogNavigation | null =>
  cache && Date.now() - cache.loadedAt < CACHE_TTL_MS ? cache.data : null;

const load = async (): Promise<BlogNavigation> => {
  // 서로 의존하지 않는 두 조회라 병렬로 보낸다.
  const [tags, firstPage] = await Promise.all([
    tagService.getTags(),
    // 총계만 필요하므로 가장 작은 페이지를 요청한다.
    postService.getPosts(0, 1),
  ]);

  return { tags, totalPostCount: firstPage.totalElements };
};

const fetchNavigation = (force: boolean): Promise<BlogNavigation> => {
  if (!force) {
    const fresh = readFreshCache();
    if (fresh) {
      return Promise.resolve(fresh);
    }
  }

  // 사이드바가 동시에 두 번 붙어도 조회는 한 번만 나가게 한다.
  inFlight ??= load()
    .then((data) => {
      cache = { loadedAt: Date.now(), data };
      return data;
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
};

const initialState = (): BlogNavigationState => {
  const fresh = readFreshCache();
  return fresh ? { status: 'ready', data: fresh } : { status: 'loading' };
};

/**
 * 사이드바 탐색 데이터.
 *
 * <p>태그 건수는 발행글만 센다(서버 기준). 반면 전체 글 수는 목록 API 를 따르므로
 * 관리자에게는 임시저장 글이 포함된다. 기준이 어긋난 것처럼 보이지만, 각 항목을
 * 눌렀을 때 실제로 보이는 목록의 개수와는 서로 맞는다.
 */
export const useBlogNavigation = () => {
  const [state, setState] = useState<BlogNavigationState>(initialState);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isActive = true;

    fetchNavigation(attempt > 0)
      .then((data) => {
        if (isActive) setState({ status: 'ready', data });
      })
      .catch(() => {
        if (isActive) setState({ status: 'failed' });
      });

    return () => {
      // 화면을 빠르게 옮기면 응답이 사라진 컴포넌트로 돌아온다.
      isActive = false;
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((count) => count + 1), []);

  return { state, retry };
};
