import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


export default function ProtectedRoute({ children }) {

    const {
        loading,
        isAuthenticated
    } = useAuth();

    const location = useLocation();

    // Wait until authentication state is restored
    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
            >
                <div className="text-center">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                    <div className="mt-3">
                        Restoring session...
                    </div>
                </div>
            </div>
        );
    }

    // User is not authenticated
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // User authenticated
    return children;
}