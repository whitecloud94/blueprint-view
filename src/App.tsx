import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {SharedLayout} from "./components/layout/SharedLayout.tsx";
import {AppRouter} from "./router/AppRouter.tsx";
import {ThemeProvider} from "./context/ThemeContext.tsx";

const App: React.FC = () => {
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