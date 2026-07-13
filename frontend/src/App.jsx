import { useEffect } from "react";
import {
    BrowserRouter,
    Route,
    Routes,
    useLocation
} from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Articles from "./pages/Articles";
import EntityExplorer from "./pages/EntityExplorer";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

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

                    {/* -------------------------
                        Public Routes
                    -------------------------- */}

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/verify-otp"
                        element={<VerifyOtp />}
                    />


                    {/* -------------------------
                        Protected Routes
                    -------------------------- */}

                    <Route
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    >

                        <Route
                            path="/"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/articles"
                            element={<Articles />}
                        />

                        <Route
                            path="/entities"
                            element={<EntityExplorer />}
                        />

                    </Route>


                    {/* -------------------------
                        404
                    -------------------------- */}

                    <Route
                        path="*"
                        element={<NotFound />}
                    />

                </Routes>

            </div>

        </BrowserRouter>

    );

}

export default App;
