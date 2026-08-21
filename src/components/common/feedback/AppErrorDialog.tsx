import { useNavigate } from 'react-router-dom';
import { PlugZap, ShieldAlert, TriangleAlert } from 'lucide-react';
import { DIALOG_BUTTON_STYLES, Dialog, type DialogTone } from './Dialog';
import { useAppError, useErrorActions, useErrorRetry } from '../../../store/useErrorStore';

/**
 * 작업을 중단시킨 오류를 알리는 전역 대화상자.
 *
 * <p>App 에 한 번만 마운트되고, 어느 계층에서든 showError 로 띄운다. 화면마다
 * 대화상자를 따로 두면 문구와 버튼 구성이 조금씩 달라져 일관성이 무너진다.
 */
export const AppErrorDialog = () => {
  const navigate = useNavigate();
  const error = useAppError();
  const onRetry = useErrorRetry();
  const { clearError } = useErrorActions();

  if (!error) {
    return null;
  }

  const handleRetry = () => {
    clearError();
    onRetry?.();
  };

  const handleSignIn = () => {
    clearError();
    navigate('/login');
  };

  return (
    <Dialog
      isOpen
      icon={resolveIcon(error.code)}
      tone={resolveTone(error.code)}
      title={error.title}
      description={error.description}
      // 사용자가 문의할 때 이 값을 전달하면 서버 로그에서 해당 요청을 바로 찾을 수 있다.
      meta={error.traceId ? `오류 코드 ${error.code} · ${error.traceId}` : undefined}
      onClose={clearError}
      actions={
        <>
          <button type="button" onClick={clearError} className={DIALOG_BUTTON_STYLES.secondary}>
            닫기
          </button>

          {error.requiresAuth ? (
            <button type="button" onClick={handleSignIn} className={DIALOG_BUTTON_STYLES.primary}>
              로그인
            </button>
          ) : (
            onRetry &&
            error.retryable && (
              <button type="button" onClick={handleRetry} className={DIALOG_BUTTON_STYLES.primary}>
                다시 시도
              </button>
            )
          )}
        </>
      }
    />
  );
};

function resolveIcon(code: string) {
  if (code === 'NETWORK') return PlugZap;
  if (code.startsWith('A') || code === 'HTTP_401' || code === 'HTTP_403') return ShieldAlert;
  return TriangleAlert;
}

function resolveTone(code: string): DialogTone {
  if (code === 'NETWORK') return 'neutral';
  return 'warning';
}
