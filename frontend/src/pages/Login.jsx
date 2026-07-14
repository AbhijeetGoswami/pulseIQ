import { useState } from "react";
import { FiLock, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { login } from "../services/authApi";
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(email, password);
            navigate("/verify-otp", { state: { email } });
        } catch (err) {
            setError(err.response?.data?.detail || "Invalid email or password.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="login-page">
            <section className="login-card" aria-label="Sign in to AttenBase">
                <aside className="login-brand">
                    <div className="login-brand-mark"><span className="login-mark-icon"><img src="/logo.png" alt="" /></span><span>AttenBase</span></div>
                    <div className="login-brand-copy">
                        <span className="eyebrow">Intelligence workspace</span>
                        <h2>See what deserves attention.</h2>
                        <p>Turn the signals across your coverage into clear, actionable intelligence.</p>
                    </div>
                    <span className="login-brand-footer">Secure access for your team</span>
                </aside>

                <div className="login-content">
                    <div className="login-logo"><span className="login-mark-icon"><img src="/logo.png" alt="AttenBase" /></span></div>
                    <h1 className="login-title">Welcome back</h1>
                    <p className="login-subtitle">Sign in to continue to your intelligence workspace.</p>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email">Email address</label>
                            <div className="input-wrap"><FiMail /><input id="email" type="email" className="form-control" placeholder="name@company.com" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrap"><FiLock /><input id="password" type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></div>
                        </div>

                        {error && <div className="alert login-alert" role="alert">{error}</div>}

                        <button type="submit" className="btn w-100 login-btn" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
                    </form>

                    <div className="login-divider"><span>OR CONTINUE WITH</span></div>
                    <button type="button" className="google-btn" disabled>Continue with Google <small>Coming soon</small></button>
                    <div className="login-footer">© {new Date().getFullYear()} AttenBase</div>
                </div>
            </section>
        </main>
    );
}
