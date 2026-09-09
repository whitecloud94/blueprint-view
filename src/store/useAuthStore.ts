import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { getAxiosErrorMessage } from '../api/axiosInstance';
import { tokenStorage } from '../api/tokenStorage';
import { authService } from '../services/authService';
import type { AuthUser, SignInInput } from '../schemas/authSchema';

/**
 * 인증 상태 저장소.
 *
 * 결정      : 세션(토큰 + 사용자)을 Zustand 로 관리한다.
 * 이유      : 앱 전역이 동기적으로 읽어야 하는 단일 값이고, 갱신 시점이 로그인/
 *             로그아웃/기동 복구 세 가지로 명확하다.
 * 대안      : TanStack Query 로 /auth/me 를 서버 상태로 관리.
 * 트레이드오프: 사용자 정보가 서버 데이터인데 클라이언트 스토어에 들어간다.
 * 선택 이유  : 라우트 가드와 네비게이션이 렌더 시점에 곧바로 값을 필요로 해서
 *             비동기 캐시보다 동기 스토어가 단순하다. 목록/상세 같은 실제 서버
 *             상태를 여기에 넣지 않는다는 경계는 유지한다.
 *
 * user.role 은 화면 제어용 힌트다. 이 값을 조작해도 서버가 매 요청 JWT 를 검증해
 * 권한을 판정하므로 실제로 할 수 있는 일은 달라지지 않는다.
 */
type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  status: AuthStatus;
  user: AuthUser | null;
  error: string | null;
}

interface AuthActions {
  /** 앱 시작 시 1회 호출. 저장된 토큰이 아직 유효한지 서버에 확인한다. */
  initialize: () => Promise<void>;
  signIn: (input: SignInInput) => Promise<void>;
  signOut: () => void;
  /** 서버가 세션을 거부했을 때. 사용자가 요청한 로그아웃과 구분한다. */
  expireSession: () => void;
  resetError: () => void;
}

const initialState: AuthState = {
  status: 'idle',
  user: null,
  error: null,
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...initialState,

  resetError: () => set({ error: null }),

  initialize: async () => {
    if (!tokenStorage.get()) {
      set({ status: 'unauthenticated', user: null });
      return;
    }

    set({ status: 'loading' });
    try {
      // 토큰이 남아 있어도 만료됐거나 권한이 회수됐을 수 있다. 로컬 값을 믿지
      // 않고 서버에 현재 상태를 물어본다.
      const user = await authService.getCurrentUser();
      set({ status: 'authenticated', user, error: null });
    } catch {
      // 기동 시점의 실패는 사용자가 요청한 동작이 아니므로 오류 문구를 띄우지 않는다.
      tokenStorage.clear();
      set({ status: 'unauthenticated', user: null });
    }
  },

  signIn: async (input) => {
    set({ status: 'loading', error: null });
    try {
      const { accessToken, user } = await authService.login(input);
      tokenStorage.set(accessToken);
      set({ status: 'authenticated', user, error: null });
    } catch (error) {
      tokenStorage.clear();
      set({
        status: 'unauthenticated',
        user: null,
        error: getAxiosErrorMessage(error, '로그인에 실패했습니다.'),
      });
      throw error;
    }
  },

  signOut: () => {
    // 서버가 상태를 들고 있지 않으므로(무상태 JWT) 토큰 폐기로 충분하다.
    tokenStorage.clear();
    set({ status: 'unauthenticated', user: null, error: null });
  },

  /**
   * 401 을 받아 세션이 끝났을 때 화면 상태를 맞춘다.
   *
   * <p>토큰은 이미 응답 인터셉터가 버렸다. 여기서는 화면이 실제 권한과 어긋나
   * 보이지 않게 하는 일만 한다. error 는 건드리지 않는다. 무슨 일이 있었는지는
   * 그 요청을 시작한 화면이 오류 대화상자로 이미 알리고 있다.
   *
   * <p>로그인 상태였을 때만 바꾼다. 비로그인 방문자의 요청에서도 401 은 나올 수
   * 있고, 그때마다 상태를 다시 쓰면 의미 없는 리렌더가 생긴다.
   */
  expireSession: () =>
    set((state) =>
      state.status === 'authenticated' ? { status: 'unauthenticated', user: null } : state,
    ),
}));

export const useAuthStatus = () => useAuthStore((state) => state.status);
export const useCurrentUser = () => useAuthStore((state) => state.user);
export const useAuthError = () => useAuthStore((state) => state.error);
export const useIsAdmin = () => useAuthStore((state) => state.user?.role === 'ADMIN');

/** 세션 확인이 끝났는지 여부. 가드가 판정을 미뤄야 하는 시점을 구분한다. */
export const useIsAuthResolved = () =>
  useAuthStore((state) => state.status === 'authenticated' || state.status === 'unauthenticated');

export const useAuthActions = () =>
  useAuthStore(
    useShallow((state) => ({
      initialize: state.initialize,
      signIn: state.signIn,
      signOut: state.signOut,
      expireSession: state.expireSession,
      resetError: state.resetError,
    })),
  );
