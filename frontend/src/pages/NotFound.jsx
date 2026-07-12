import { FiArrowLeft, FiClock, FiCompass } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./NotFound.css";

export default function NotFound() {
    return (
        <main className="not-found">
            <section className="not-found-card" aria-labelledby="not-found-title">
                <div className="not-found-brand">
                    <img src="/brand.png" alt="AttenBase" />
                    <span>AttenBase</span>
                </div>

                <div className="not-found-illustration">
                    <img src="/work-in-progress.png" alt="Module under construction" />
                </div>

                <span className="not-found-eyebrow"><FiClock aria-hidden="true" /> Coming soon</span>
                <h1 id="not-found-title">This module is still taking shape.</h1>
                <p>
                    We’re building the next layer of attention intelligence here.
                    The dashboard remains available while this workspace is prepared.
                </p>

                <div className="not-found-actions">
                    <Link to="/" className="not-found-primary">
                        <FiArrowLeft aria-hidden="true" /> Back to dashboard
                    </Link>
                    <Link to="/entities" className="not-found-secondary">
                        <FiCompass aria-hidden="true" /> Explore entities
                    </Link>
                </div>

                <span className="not-found-note">PulseIQ intelligence platform</span>
            </section>
        </main>
    );
}
