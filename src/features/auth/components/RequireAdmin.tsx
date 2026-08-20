import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { LoadingBar } from '../../../components/common/LoadingBar';
import { GLASS_STYLES } from '../../../constants/styles';
import { useAuthStatus, useIsAdmin, useIsAuthResolved } from '../../../store/useAuthStore';

/**
 * 관리자 전용 라우트 가드.
 *
 * 이 가드는 UX 장치다. 실제 권한 통제는 Supabase 의 RLS 정책이 담당하므로,
 * 사용자가 개발자 도구로 이 컴포넌트를 우회하더라도 글을 저장할 수 없다.
 * 가드의 목적은 "권한 없는 사용자가 쓸 수 없는 화면에 들어가 작업하다가
 * 저장 단계에서야 거절당하는" 경험을 막는 것이다.
 */
export const RequireAdmin = () => {
  const location = useLocation();
  const isResolved = useIsAuthResolved();
  const status = useAuthStatus();
  const isAdmin = useIsAdmin();

  // 세션 확인 전에는 판정을 내리지 않는다. 새로고침 직후 잠깐 미인증 상태로
  // 보이는 시점에 로그인 화면으로 튕기는 것을 막는다.
  if (!isResolved) {
    return <LoadingBar />;
  }

  if (status === 'unauthenticated') {
    // 로그인 후 원래 가려던 곳으로 되돌려 보내기 위해 위치를 넘긴다.
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!isAdmin) {
    return <ForbiddenNotice />;
  }

  return <Outlet />;
};

const ForbiddenNotice = () => (
  <div className="w-full flex justify-center px-4 py-20">
    <div className={`${GLASS_STYLES.card} max-w-[480px] w-full p-10 flex flex-col items-center gap-4 text-center`}>
      <ShieldAlert size={40} className="text-indigo-500" aria-hidden="true" />
      <h1 className={`${GLASS_STYLES.heading} text-2xl`}>접근 권한이 없습니다</h1>
      <p className={GLASS_STYLES.subtext}>이 페이지는 관리자만 사용할 수 있습니다.</p>
    </div>
  </div>
);
