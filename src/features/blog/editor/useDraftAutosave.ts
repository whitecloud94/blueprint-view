import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';
import type { UseFormReturn } from 'react-hook-form';
import { postFormSchema, type PostFormData } from '../../../schemas/postSchema';

const KEY_PREFIX = 'blog-draft';
const AUTOSAVE_DELAY_MS = 500;

/**
 * 초안을 붙들고 있는 기간.
 *
 * <p>발행하지 않고 떠난 글은 조용히 쌓인다. 한 번 지나간 초안을 몇 달 뒤에
 * 되살려 주는 것은 도움이 되기보다 놀랍고, 그동안 localStorage 를 차지한다.
 */
const DRAFT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const draftRecordSchema = z.object({
  values: postFormSchema,
  /** 태그는 폼 필드가 아니라 별도 상태라, 초안에 따로 담지 않으면 사라진다. */
  tags: z.array(z.string()),
  /** 마지막 자동저장 시각. 사용자에게 "언제 쓰던 내용인지" 알려줄 때 쓴다. */
  savedAt: z.string(),
  /** 아래 셋은 수정 모드에만 있다. 새 글은 원본이 없다. */
  postId: z.number().optional(),
  loadedAt: z.string().optional(),
  /**
   * 초안을 쓰기 시작할 때 원본의 최종 수정 시각.
   *
   * <p>불러온 시각(loadedAt)이 아니라 이 값으로 원본이 바뀌었는지 판정한다.
   * 서버가 준 값끼리 비교해야 브라우저 시계가 틀어져 있어도 결과가 같다.
   */
  sourceUpdatedAt: z.string().optional(),
});

export type DraftRecord = z.output<typeof draftRecordSchema>;

/**
 * 초안이 어느 글에 속하는지.
 *
 * <p>수정 글은 원본을 받아 오기 전까지 정해지지 않는다. 그때까지 target 을 null 로
 * 두면 훅은 읽지도 쓰지도 않는다.
 */
export type DraftTarget =
  | { mode: 'create' }
  | { mode: 'edit'; postId: number; loadedAt: string; sourceUpdatedAt?: string };

interface UseDraftAutosaveParams {
  form: UseFormReturn<PostFormData>;
  /** null 이면 아직 대상이 정해지지 않은 상태(원본 로딩 중). */
  target: DraftTarget | null;
  tags: string[];
  /** 초안을 복원할 때 태그를 되돌려 놓는다. */
  onRestoreTags: (tags: string[]) => void;
}

/**
 * 작성 중인 글을 localStorage 에 자동 저장한다.
 *
 * 결정      : 새 글은 조용히 복원하고, 기존 글 수정은 복원 여부를 묻는다.
 * 이유      : 새 글은 초안이 유일본이라 되돌릴 것이 없다. 반면 수정 중인 글은
 *             서버에 원본이 있고, 그사이 다른 곳에서 고쳤을 수도 있다. 낡은
 *             로컬 값이 최신 원본을 조용히 덮어쓰면 무엇이 사라졌는지조차
 *             알 수 없다.
 * 대안      : 수정 모드에서도 자동 복원한다 / 수정 모드는 저장하지 않는다.
 * 트레이드오프: 묻는 만큼 화면이 하나 늘고, 사용자가 판단해야 한다.
 * 선택 이유  : 판단에 필요한 정보(언제 쓰던 것인지, 그사이 원본이 바뀌었는지)를
 *             함께 보여줄 수 있어, 묻는 비용보다 잃는 비용이 크다.
 *
 * <p>남는 데이터를 만들지 않는다. 복원/버리기 중 무엇을 고르든 그 기록은 즉시
 * 지우고, 저장에 성공해도 지운다. 내용이 원본과 같아지면(고쳤다가 되돌린 경우)
 * 남길 것이 없으므로 역시 지운다. 기간이 지난 기록은 읽는 순간 버린다.
 */
export function useDraftAutosave({ form, target, tags, onRestoreTags }: UseDraftAutosaveParams) {
  const { watch, reset, getValues } = form;

  /** 복원 여부를 물어야 하는 초안. 답을 받기 전까지 자동저장을 멈춘다. */
  const [pendingDraft, setPendingDraft] = useState<DraftRecord | null>(null);
  const [isResolved, setIsResolved] = useState(false);

  const storageKey = useMemo(() => toStorageKey(target), [target]);

  // 태그와 저장 대상은 콜백 안에서 최신값이 필요하지만, 바뀔 때마다 구독을 다시
  // 걸 이유는 없다.
  const tagsRef = useRef(tags);
  tagsRef.current = tags;
  const targetRef = useRef(target);
  targetRef.current = target;

  /**
   * 판단이 끝난 시점의 내용.
   *
   * <p>지금 내용이 이것과 같으면 저장할 것이 없다는 뜻이다. 글을 열어 보기만 해도
   * 초안이 생기는 것과, 고쳤다가 되돌렸는데 초안이 남는 것을 한 번에 막는다.
   */
  const baselineRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const snapshot = useCallback(
    () => JSON.stringify({ values: getValues(), tags: tagsRef.current }),
    [getValues],
  );

  const clearDraft = useCallback(() => {
    if (storageKey) localStorage.removeItem(storageKey);
  }, [storageKey]);

  const writeDraft = useCallback(() => {
    const current = targetRef.current;
    const key = toStorageKey(current);
    if (!key || !current) return;

    if (snapshot() === baselineRef.current) {
      // 원본과 같아졌다. 남겨 두면 다음에 열 때 의미 없는 복원을 묻게 된다.
      localStorage.removeItem(key);
      return;
    }

    const record: DraftRecord = {
      values: getValues(),
      tags: tagsRef.current,
      savedAt: new Date().toISOString(),
      ...(current.mode === 'edit'
        ? {
            postId: current.postId,
            loadedAt: current.loadedAt,
            sourceUpdatedAt: current.sourceUpdatedAt,
          }
        : {}),
    };

    localStorage.setItem(key, JSON.stringify(record));
  }, [getValues, snapshot]);

  // 타이핑마다 쓰지 않도록 미룬다.
  const scheduleWrite = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(writeDraft, AUTOSAVE_DELAY_MS);
  }, [writeDraft]);

  const markResolved = useCallback(() => {
    baselineRef.current = snapshot();
    setIsResolved(true);
  }, [snapshot]);

  // 대상이 정해지면 저장된 초안을 한 번 읽는다.
  useEffect(() => {
    if (!storageKey || !target) return;

    setIsResolved(false);
    setPendingDraft(null);

    const saved = readDraft(storageKey);

    if (!saved) {
      markResolved();
      return;
    }

    if (target.mode === 'create') {
      // 새 글의 초안은 유일본이다. 물어볼 것 없이 되돌려 놓는다.
      reset(saved.values);
      onRestoreTags(saved.tags);
      localStorage.removeItem(storageKey);
      baselineRef.current = JSON.stringify({ values: saved.values, tags: saved.tags });
      setIsResolved(true);
      return;
    }

    setPendingDraft(saved);
    // 답을 받기 전까지 isResolved 는 false 다. 그동안 자동저장이 돌면 원본 값이
    // 초안을 덮어써, 사용자가 고르기도 전에 고를 것이 사라진다.
  }, [storageKey, target, reset, onRestoreTags, markResolved]);

  // 폼 입력 감시.
  useEffect(() => {
    if (!isResolved || !storageKey) return;

    const subscription = watch(() => scheduleWrite());
    return () => {
      subscription.unsubscribe();
      clearTimeout(timerRef.current);
    };
  }, [isResolved, storageKey, watch, scheduleWrite]);

  // 태그는 폼 밖에 있어 watch 가 잡지 못한다.
  useEffect(() => {
    if (!isResolved || !storageKey) return;
    scheduleWrite();
    return () => clearTimeout(timerRef.current);
  }, [tags, isResolved, storageKey, scheduleWrite]);

  const restorePendingDraft = useCallback(() => {
    if (!pendingDraft) return;

    reset(pendingDraft.values);
    onRestoreTags(pendingDraft.tags);
    clearDraft();
    setPendingDraft(null);
    // 기준선은 복원한 내용이다. 이 상태에서 더 고치면 다시 쌓이기 시작한다.
    baselineRef.current = JSON.stringify({
      values: pendingDraft.values,
      tags: pendingDraft.tags,
    });
    setIsResolved(true);
  }, [pendingDraft, reset, onRestoreTags, clearDraft]);

  const discardPendingDraft = useCallback(() => {
    clearDraft();
    setPendingDraft(null);
    markResolved();
  }, [clearDraft, markResolved]);

  return { pendingDraft, restorePendingDraft, discardPendingDraft, clearDraft };
}

function toStorageKey(target: DraftTarget | null): string | null {
  if (!target) return null;
  return target.mode === 'create' ? KEY_PREFIX : `${KEY_PREFIX}:${target.postId}`;
}

/**
 * 저장된 초안을 읽는다.
 *
 * <p>스키마가 바뀌었거나 값이 손상된 경우, 기간이 지난 경우 모두 복원을 포기하고
 * 기록을 지운다. 깨진 초안으로 폼을 채우면 원인을 알기 어려운 상태가 되고, 읽을
 * 수 없는 기록을 남겨 두면 영영 지워지지 않는다.
 */
function readDraft(storageKey: string): DraftRecord | null {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return null;

  const drop = () => {
    localStorage.removeItem(storageKey);
    return null;
  };

  try {
    const parsed = draftRecordSchema.safeParse(JSON.parse(saved));
    if (!parsed.success) return drop();

    const savedAt = Date.parse(parsed.data.savedAt);
    if (Number.isNaN(savedAt) || Date.now() - savedAt > DRAFT_TTL_MS) return drop();

    return parsed.data;
  } catch {
    return drop();
  }
}
