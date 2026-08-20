import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {SharedLayout} from "./components/layout/SharedLayout.tsx";
import {AppRouter} from "./router/AppRouter.tsx";
import {ThemeProvider} from "./context/ThemeContext.tsx";
import {useAuthActions} from "./store/useAuthStore.ts";

const App: React.FC = () => {
    const {initialize} = useAuthActions();

    // 저장된 토큰으로 세션을 복구한다. 앱 수명주기에 한 번만 수행한다.
    useEffect(() => {
        void initialize();
    }, [initialize]);

    return (
        <ThemeProvider>
            <Router>
                <SharedLayout>
                    <AppRouter />
                </SharedLayout>
            </Router>
        </ThemeProvider>
    );
};

export default App;