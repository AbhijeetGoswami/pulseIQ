import { useEffect, useState } from "react";
import { FiClock, FiGlobe, FiSun, FiTag } from "react-icons/fi";

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

import { useTheme } from "../context/ThemeContext";

function DistributionList({ items, label, tone }) {
    const totalMentions = items.reduce((total, item) => total + Number(item.mentions || 0), 0);

    return (
        <div className={`dashboard-distribution dashboard-distribution--${tone}`}>
            {items.length ? items.map((item, index) => {
                const mentions = Number(item.mentions || 0);
                const percentage = totalMentions ? Math.round((mentions / totalMentions) * 100) : 0;

                return (
                    <div key={item.id ?? item.name} className="dashboard-distribution-row">
                        <span className="dashboard-distribution-rank">{String(index + 1).padStart(2, "0")}</span>
                        <div className="dashboard-distribution-copy">
                            <div>
                                <strong>{item.name}</strong>
                                <small>{mentions.toLocaleString()} {label}</small>
                            </div>
                            <span className="dashboard-distribution-percent">{percentage}%</span>
                        </div>
                        <div className="dashboard-distribution-bar" aria-label={`${item.name}: ${mentions} ${label}, ${percentage}%`}>
                            <span style={{ width: `${percentage}%` }} />
                        </div>
                    </div>
                );
            }) : <p className="dashboard-distribution-empty">No distribution data available.</p>}
        </div>
    );
}

export default function Dashboard() {
    const { data, loading, error } = useAttention();
    const { data: trendData, loading: trendsLoading, error: trendsError } = useTrends();
    const [now, setNow] = useState(() => Date.now());

    const {

        theme,

        toggleTheme

    } = useTheme();

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
                <div className="dashboard-top-controls">
                    <button
                        type="button"
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-pressed={theme === "midnight"}
                        aria-label={`Switch to ${theme === "midnight" ? "white" : "soft white"} theme`}
                    >
                        <FiSun aria-hidden="true" />
                        <span>{theme === "midnight" ? "Soft white" : "White"}</span>
                    </button>
                </div>

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
                        <div className="dashboard-status">
                            <div className="dashboard-status-top">
                                <span className="status-dot" aria-hidden="true" />
                                <span>Live intelligence</span>
                            </div>

                            <div className="dashboard-status-time">
                                <FiClock aria-hidden="true" />
                                <div>
                                    <small>Last updated</small>
                                    <strong>{formatDateTime(data.generated_at)}</strong>
                                    <span>{formatRelativeTime(data.generated_at, now)}</span>
                                </div>
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
                    <Panel
                        title={<span className="dashboard-distribution-title"><FiGlobe aria-hidden="true" /> Domain distribution</span>}
                        description="Coverage across contributing sources"
                    >
                        <DistributionList items={domains} label="mentions" tone="domain" />
                    </Panel>

                    <Panel
                        title={<span className="dashboard-distribution-title"><FiTag aria-hidden="true" /> Category distribution</span>}
                        description="Topics represented in this snapshot"
                    >
                        <DistributionList items={categories} label="mentions" tone="category" />
                    </Panel>
                </section>
            </div>
        </div>
    );
}
