import { useState } from "react";

import {
    useLocation,
    useNavigate,
    Navigate
} from "react-router-dom";

import { verifyOtp } from "../services/authApi";

import { useAuth } from "../context/AuthContext";

import "./Login.css";

export default function VerifyOtp() {

    const navigate = useNavigate();

    const location = useLocation();

    const { login } = useAuth();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    // Prevent direct navigation
    if (!email) {
        return <Navigate to="/login" replace />;
    }

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await verifyOtp(
                email,
                otp
            );

            login(
                response.access_token,
                response.user
            );

            navigate("/");

        } catch (err) {

            setError(
                err.response?.data?.detail ||
                "Invalid verification code."
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-logo">

                    <img
                        src="/logo.png"
                        alt="AttenBase Logo"
                    />

                </div>

                <h2 className="login-title">

                    Verify OTP

                </h2>

                <p className="otp-info">

                    Enter the verification code sent to

                    <br />

                    <span className="otp-email">
                        {email}
                    </span>

                </p>

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >

                    <div className="mb-3">

                        <input

                            type="text"

                            className="form-control otp-input"

                            placeholder="------"

                            value={otp}

                            maxLength={6}

                            onChange={(e) => setOtp(e.target.value)}

                            required

                        />

                    </div>

                    {
                        error && (

                            <div className="alert alert-danger">

                                {error}

                            </div>

                        )
                    }

                    <button

                        type="submit"

                        className="btn btn-success w-100 login-btn"

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Verifying..."

                                : "Verify OTP"

                        }

                    </button>

                </form>

                <a
                    href="#"
                    className="resend-link"
                    onClick={(e) => e.preventDefault()}
                >
                    Resend OTP
                </a>

                <div className="login-footer">

                    © {new Date().getFullYear()} AttenBase

                </div>

            </div>

        </div>

    );

}