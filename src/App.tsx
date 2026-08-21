import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {SharedLayout} from "./components/layout/SharedLayout.tsx";
import {AppRouter} from "./router/AppRouter.tsx";
import {ThemeProvider} from "./context/ThemeContext.tsx";
import {ErrorBoundary} from "./components/common/feedback/ErrorBoundary.tsx";
import {AppErrorDialog} from "./components/common/feedback/AppErrorDialog.tsx";
import {useAuthActions} from "./store/useAuthStore.ts";

const App: React.FC = () => {
    const {initialize} = useAuthActions();

    // 저장된 토큰으로 세션을 복구한다. 앱 수명주기에 한 번만 수행한다.
    useEffect(() => {
        void initialize();
    }, [initialize]);

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