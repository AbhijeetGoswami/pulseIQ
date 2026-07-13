import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    getCurrentUser,
    logout as apiLogout
} from "../services/authApi";


const AuthContext = createContext();


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const [token, setToken] = useState(
        localStorage.getItem("access_token")
    );


    /**
     * Restore authentication after refresh.
     */
    useEffect(() => {

        async function restoreSession() {

            if (!token) {

                setLoading(false);

                return;

            }

            try {

                const currentUser =
                    await getCurrentUser();

                setUser(currentUser);

            } catch (error) {

                console.error(
                    "Failed to restore session",
                    error
                );

                localStorage.removeItem(
                    "access_token"
                );

                setToken(null);

                setUser(null);

            } finally {

                setLoading(false);

            }

        }

        restoreSession();

    }, [token]);


    /**
     * Called after OTP verification.
     */
    function login(jwtToken, currentUser) {

        localStorage.setItem(
            "access_token",
            jwtToken
        );

        setToken(jwtToken);

        setUser(currentUser);

    }


    /**
     * Logout.
     */
    async function logout() {

        try {

            if (token) {

                await apiLogout();

            }

        } catch (error) {

            console.warn(
                "Logout request failed",
                error
            );

        } finally {

            localStorage.removeItem(
                "access_token"
            );

            setToken(null);

            setUser(null);

        }

    }


    const value = {

        user,

        token,

        loading,

        login,

        logout,

        isAuthenticated: !!token

    };


    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

}


export function useAuth() {

    return useContext(AuthContext);

}