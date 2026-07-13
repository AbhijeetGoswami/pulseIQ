import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/authApi";

import "./Login.css";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await login(email, password);

            navigate("/verify-otp", {
                state: { email }
            });

        } catch (err) {
            setError(
                err.response?.data?.detail ||
                "Invalid email or password."
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

                <h1 className="login-title">
                    AttenBase
                </h1>

                <p className="login-subtitle">
                    Continuous Intelligence Platform
                </p>

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >

                    <div className="mb-3">

                        <label>Email Address</label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Password</label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        className="btn btn-primary w-100 login-btn"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Signing In..."
                                : "Sign In"
                        }
                    </button>

                </form>

                <div className="login-divider">
                    <span>OR</span>
                </div>

                <button
                    type="button"
                    className="google-btn w-100"
                    disabled
                >
                    Continue with Google
                    <small>(Coming Soon)</small>
                </button>

                <div className="login-footer">
                    © {new Date().getFullYear()} AttenBase
                </div>

            </div>

        </div>
    );
}