import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { verifyOtp } from "../services/authApi";
import "./Login.css";

export default function VerifyOtp() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const email = location.state?.email;
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!email) return <Navigate to="/login" replace />;

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await verifyOtp(email, otp);
            login(response.access_token, response.user);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.detail || "Invalid verification code.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="login-page">
            <section className="login-card" aria-label="Verify your sign in">
                <aside className="login-brand">
                    <div className="login-brand-mark"><span className="login-mark-icon"><img src="/logo.png" alt="" /></span><span>AttenBase</span></div>
                    <div className="login-brand-copy">
                        <span className="eyebrow">Secure verification</span>
                        <h2>Your workspace is almost ready.</h2>
                        <p>One quick confirmation helps keep your organization’s intelligence secure.</p>
                    </div>
                    <span className="login-brand-footer">Protected with two-step verification</span>
                </aside>

                <div className="login-content">
                    <div className="login-logo"><span className="login-mark-icon"><img src="/logo.png" alt="AttenBase" /></span></div>
                    <h1 className="login-title">Check your email</h1>
                    <p className="otp-info">We sent a 6-digit verification code to<br /><span className="otp-email">{email}</span></p>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="otp">Verification code</label>
                            <input id="otp" type="text" inputMode="numeric" autoComplete="one-time-code" className="form-control otp-input" placeholder="000000" value={otp} maxLength={6} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))} required />
                        </div>

                        {error && <div className="alert login-alert" role="alert">{error}</div>}

                        <button type="submit" className="btn w-100 login-btn" disabled={loading}>{loading ? "Verifying…" : "Verify and continue"}</button>
                    </form>

                    <div className="resend-row"><a href="#resend" className="resend-link" onClick={(event) => event.preventDefault()}>Didn’t receive a code? Resend OTP</a></div>
                    <Link to="/login" className="back-link"><FiArrowLeft /> Back to sign in</Link>
                    <div className="login-footer">© {new Date().getFullYear()} AttenBase</div>
                </div>
            </section>
        </main>
    );
}
