import { Fragment } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import routes from './config/routes';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
    const {projectName} = useSelector((state) => state.app)
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    <Route
                        path="*"
                        element={
                            projectName !== null ? (
                                <Navigate to={routes.activesprint} replace />
                            ) : (
                                <Navigate to={routes.login} replace />
                            )
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
