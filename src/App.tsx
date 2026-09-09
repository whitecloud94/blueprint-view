import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {SharedLayout} from "./components/layout/SharedLayout.tsx";
import {AppRouter} from "./router/AppRouter.tsx";
import {ThemeProvider} from "./context/ThemeContext.tsx";
import {ErrorBoundary} from "./components/common/feedback/ErrorBoundary.tsx";
import {AppErrorDialog} from "./components/common/feedback/AppErrorDialog.tsx";
import {useAuthActions} from "./store/useAuthStore.ts";
import {onSessionExpired} from "./api/sessionEvents.ts";

const App: React.FC = () => {
    const {initialize, expireSession} = useAuthActions();

    // 저장된 토큰으로 세션을 복구한다. 앱 수명주기에 한 번만 수행한다.
    useEffect(() => {
        void initialize();
    }, [initialize]);

    // 어느 요청이든 401 을 받으면 화면의 로그인 상태도 함께 내린다. 구독을 여기
    // 한 곳에 두어 API 계층이 인증 저장소를 알지 않아도 되게 한다.
    useEffect(() => onSessionExpired(expireSession), [expireSession]);

    return (
        <ErrorBoundary>
            <ThemeProvider>
                <Router>
                    <SharedLayout>
                        <AppRouter />
                    </SharedLayout>
                    {/* 어느 화면에서 오류가 나든 같은 대화상자가 뜨도록 한 번만 마운트한다. */}
                    <AppErrorDialog />
                </Router>
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default App;