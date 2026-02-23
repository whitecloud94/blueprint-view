import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {SharedLayout} from "./components/layout/SharedLayout.tsx";
import {AppRouter} from "./router/AppRouter.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <SharedLayout>
                <AppRouter />
            </SharedLayout>
        </Router>
    );
};

export default App;