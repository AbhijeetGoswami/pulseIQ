import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Articles from "./pages/Articles";
import EntityExplorer from "./pages/EntityExplorer";
import NotFound from "./pages/NotFound";

import "./App.css";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <div className="app-root">
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/articles" element={<Articles />} />
                        <Route path="/entities" element={<EntityExplorer />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
