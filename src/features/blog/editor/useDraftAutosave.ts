import { useCallback, useEffect } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { postFormSchema, type PostFormData } from '../../../schemas/postSchema';

const DRAFT_STORAGE_KEY = 'blog-draft';
const AUTOSAVE_DELAY_MS = 500;

/**
 * 새 글 작성 중 입력을 localStorage 에 자동 저장한다.
 *
 * <p>수정 모드에서는 동작하지 않는다. 서버에 원본이 있는 상태에서 로컬 초안까지
 * 복원하면, 다른 곳에서 고친 내용을 오래된 로컬 값이 조용히 덮어쓸 수 있다.
 * 아직 어디에도 저장되지 않아 잃으면 되돌릴 수 없는 새 글만 대상으로 한다.
 *
 * @param form    react-hook-form 인스턴스
 * @param enabled 새 글 작성 모드인지 여부
 */
export function useDraftAutosave(form: UseFormReturn<PostFormData>, enabled: boolean) {
  const { watch, reset } = form;

  const clearDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  }, []);

  // 저장된 초안 복원
  useEffect(() => {
    if (!enabled) return;

    const draft = readDraft();
    if (draft) {
      reset(draft);
    }
  }, [enabled, reset]);

  // 입력 자동 저장. 타이핑마다 쓰지 않도록 디바운스한다.
  useEffect(() => {
    if (!enabled) return;

    let timer: ReturnType<typeof setTimeout>;
    const subscription = watch((values) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(values));
      }, AUTOSAVE_DELAY_MS);
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [enabled, watch]);

  return { clearDraft };
}

/**
 * 저장된 초안을 읽는다.
 *
 * <p>스키마가 바뀌었거나 값이 손상된 경우 복원을 포기한다. 깨진 초안으로 폼을
 * 채우면 원인을 알기 어려운 상태가 된다.
 */
function readDraft(): PostFormData | null {
  const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
  if (!saved) return null;

  try {
    const parsed = postFormSchema.safeParse(JSON.parse(saved));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
