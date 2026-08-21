import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { toAppError, type AppError } from '../api/errorPolicy';

interface ShowErrorOptions {
  /** 분류할 수 없는 오류에 쓸 제목. */
  fallbackTitle?: string;
  /** 재시도 동선. 지정하면 대화상자에 '다시 시도' 버튼이 생긴다. */
  onRetry?: () => void;
}

interface ErrorState {
  error: AppError | null;
  onRetry: (() => void) | null;
}

interface ErrorActions {
  showError: (error: unknown, options?: ShowErrorOptions) => void;
  clearError: () => void;
}

/**
 * 작업을 중단시킨 오류를 앱 전역에 한 곳으로 모은다.
 *
 * <p>토스트와 역할이 다르다. 토스트는 "고치면 되는" 것(제목 미입력, 이미지 한 장
 * 실패)에, 이 저장소는 "하려던 일이 실패해서 결정이 필요한" 것(저장 실패, 삭제
 * 실패, 세션 만료)에 쓴다. 판단 기준을 화면마다 다시 세우지 않도록 통로를 하나만 둔다.
 */
export const useErrorStore = create<ErrorState & ErrorActions>((set) => ({
  error: null,
  onRetry: null,

  showError: (error, options) =>
    set({
      error: toAppError(error, options?.fallbackTitle),
      onRetry: options?.onRetry ?? null,
    }),

  clearError: () => set({ error: null, onRetry: null }),
}));

export const useAppError = () => useErrorStore((state) => state.error);
export const useErrorRetry = () => useErrorStore((state) => state.onRetry);

export const useErrorActions = () =>
  useErrorStore(
    useShallow((state) => ({
      showError: state.showError,
      clearError: state.clearError,
    })),
  );
