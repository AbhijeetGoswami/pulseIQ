import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
// import Articles from "./pages/Articles";
import EntityExplorer from "./pages/EntityExplorer";
// import Metrics from "./pages/Metrics";
import NotFound from "./pages/NotFound";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Shared Application Layout */}

                <Route element={<Layout />}>

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    {/* <Route
                        path="/articles"
                        element={<Articles />}
                    /> */}

                    <Route
                        path="/entities"
                        element={<EntityExplorer />}
                    />

                    {/* <Route
                        path="/metrics"
                        element={<Metrics />}
                    /> */}

                </Route>

                {/* 404 */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;