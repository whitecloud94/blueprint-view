import { Component, type ErrorInfo, type ReactNode } from 'react';
import { TriangleAlert } from 'lucide-react';
import { ERROR_ACTION_STYLES, ErrorState } from './ErrorState';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * 렌더링 중 발생한 예외를 잡아 화면을 유지한다.
 *
 * <p>바운더리가 없으면 하위 어디서든 예외가 나는 순간 React 가 트리 전체를 언마운트해
 * 완전히 빈 화면이 남는다. 방문자 입장에서는 사이트가 죽은 것과 구분되지 않는다.
 *
 * <p>클래스 컴포넌트인 이유는 componentDidCatch 에 대응하는 훅이 없어서다.
 *
 * <p>복구 동선으로 '다시 시도' 대신 이동/새로고침을 둔 것도 의도적이다. 상태를
 * 되돌려 같은 트리를 다시 그리면 같은 예외가 반복되는 경우가 많다.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 오류 수집 도구를 붙이기 전까지는 콘솔이 유일한 단서다.
    console.error('처리되지 않은 렌더링 오류:', error, errorInfo.componentStack);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#F3F3F3] dark:bg-[#121212]">
        <ErrorState
          icon={TriangleAlert}
          code="500"
          label="UNEXPECTED ERROR"
          title="화면을 표시하지 못했습니다"
          description="예기치 않은 오류가 발생했습니다. 새로고침해도 같은 문제가 반복되면 잠시 후 다시 시도해주세요."
          actions={
            <>
              <button
                type="button"
                onClick={() => window.location.assign('/')}
                className={ERROR_ACTION_STYLES.primary}
              >
                홈으로
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className={ERROR_ACTION_STYLES.secondary}
              >
                새로고침
              </button>
            </>
          }
        />
      </div>
    );
  }
}
