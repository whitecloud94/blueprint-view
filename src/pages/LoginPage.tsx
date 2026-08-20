import { Navigate, useLocation } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { LoginForm } from '../features/auth/components/LoginForm';
import { LoadingBar } from '../components/common/LoadingBar';
import { useAuthStatus, useIsAuthResolved } from '../store/useAuthStore';

interface LocationState {
  from?: { pathname: string };
}

export default function LoginPage() {
  const location = useLocation();
  const isResolved = useIsAuthResolved();
  const status = useAuthStatus();

  if (!isResolved) {
    return <LoadingBar />;
  }

  // 이미 로그인한 사용자가 로그인 화면에 머무를 이유가 없다.
  if (status === 'authenticated') {
    const redirectTo = (location.state as LocationState | null)?.from?.pathname ?? '/blog';
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <PageTransition direction="none">
      <div className="w-full flex justify-center px-4 py-10">
        <LoginForm />
      </div>
    </PageTransition>
  );
}
