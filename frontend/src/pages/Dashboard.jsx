import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

import Loader from "../components/Loader/Loader";
import ErrorCard from "../components/ErrorCard/ErrorCard";
import Panel from "../components/common/Panel/Panel";
import SummaryCards from "../components/dashboard/SummaryCards/SummaryCards";
import AttentionLeaderboard from "../components/dashboard/AttentionLeaderboard/AttentionLeaderboard";
import TrendLeaderboard from "../components/dashboard/TrendLeaderboard/TrendLeaderboard";
import useAttention from "../hooks/useAttention";
import useTrends from "../hooks/useTrends";
import { formatDateTime, formatRelativeTime } from "../utils/time";

import "./Dashboard.css";

function DistributionList({ items, label }) {
    const peakMentions = Math.max(...items.map(({ mentions }) => mentions), 1);

    return (
        <div className="dashboard-list">
            {items.map((item) => (
                <div key={item.id} className="dashboard-list-item">
                    <div>
                        <strong>{item.name}</strong>
                        <small>{item.mentions} {label}</small>
                    </div>

                    <div className="mini-bar" aria-label={`${item.name}: ${item.mentions} ${label}`}>
                        <div style={{ width: `${(item.mentions / peakMentions) * 100}%` }} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function Dashboard() {
    const { data, loading, error } = useAttention();
    const { data: trendData, loading: trendsLoading, error: trendsError } = useTrends();
    const [now, setNow] = useState(() => Date.now());
    const [theme, setTheme] = useState("current");

    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (loading || trendsLoading) return <Loader />;
    if (error || trendsError || !data?.attention) return <ErrorCard />;

    const attention = data.attention;
    const domains = attention.domains || [];
    const categories = attention.categories || [];

    return (
        <div className={`dashboard dashboard--${theme}`}>
            <div className="dashboard-content">
                <header className="dashboard-header">
                    <div className="dashboard-brand">
                        <img
                            className="dashboard-brand-logo"
                            src="/logo.png"
                            alt="AttenBase_Logo"
                        />

                        <div>
                            <h1>AttenBase Dashboard</h1>
                            <p>Your window to attention intelligence snapshots in realtime</p>
                        </div>
                    </div>

                    <div className="dashboard-header-actions">
                        <button
                            type="button"
                            className="theme-toggle"
                            onClick={() => setTheme((activeTheme) => activeTheme === "current" ? "midnight" : "current")}
                            aria-pressed={theme === "midnight"}
                            aria-label={`Switch to ${theme === "current" ? "Midnight" : "Current"} theme`}
                        >
                            {theme === "midnight" ? <FiMoon aria-hidden="true" /> : <FiSun aria-hidden="true" />}
                            <span>{theme === "midnight" ? "Midnight" : "Current"}</span>
                        </button>

                        <div className="dashboard-status">
                            <div className="dashboard-status-top">
                                <span className="status-dot" />
                                <span>LIVE</span>
                            </div>

                            <div className="dashboard-status-time">
                                <small>Last updated</small>
                                <strong>{formatDateTime(data.generated_at)}</strong>
                                <span>{formatRelativeTime(data.generated_at, now)}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <SummaryCards
                    summary={attention.summary}
                    domains={domains}
                    categories={categories}
                />

                <section className="dashboard-main" aria-label="Attention and trend leaders">
                    <AttentionLeaderboard entities={attention.entities || []} />
                    <TrendLeaderboard trends={trendData?.trends || []} />
                </section>

                <section className="dashboard-bottom" aria-label="Distribution summaries">
                    <Panel title="Domain distribution">
                        <DistributionList items={domains} label="mentions" />
                    </Panel>

                    <Panel title="Category distribution">
                        <DistributionList items={categories} label="mentions" />
                    </Panel>
                </section>
            </div>
        </div>
    );
}
