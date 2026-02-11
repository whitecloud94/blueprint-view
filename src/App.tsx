import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {SharedLayout} from "./components/layout/SharedLayout.tsx";
import {AnimatedRoutes} from "./components/layout/AnimatedRoutes.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <SharedLayout>
                <AnimatedRoutes />
            </SharedLayout>
        </Router>
    );
};

export default App;