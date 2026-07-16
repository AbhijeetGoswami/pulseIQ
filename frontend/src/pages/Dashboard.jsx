import { useEffect, useRef, useState } from "react";
import { FiRss, FiSearch, FiTag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import ErrorCard from "../components/ErrorCard/ErrorCard";
import Panel from "../components/common/Panel/Panel";
import SummaryCards from "../components/dashboard/SummaryCards/SummaryCards";
import AttentionLeaderboard from "../components/dashboard/AttentionLeaderboard/AttentionLeaderboard";
import TrendLeaderboard from "../components/dashboard/TrendLeaderboard/TrendLeaderboard";
import SnapshotSummary from "../components/dashboard/SnapshotSummary/SnapshotSummary";
import BiggestMovers from "../components/dashboard/BiggestMovers/BiggestMovers";
import AiHighlights from "../components/dashboard/AiHighlights/AiHighlights";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton/DashboardSkeleton";
import useAttention from "../hooks/useAttention";
import useTrends from "../hooks/useTrends";
import useTopSources from "../hooks/useTopSources";
import "./Dashboard.css";

const sportIcons = {
    football: "⚽",
    baseball: "⚾",
    basketball: "🏀",
    golf: "⛳",
    "ice hockey": "🏒",
    cricket: "🏏",
    "formula 1": "🏎️",
    rugby: "🏉",
    tennis: "🎾",
};

function DistributionList({ items, label, tone, nameKey = "name", valueKey = "mentions", detail }) {
    const total = items.reduce((totalValue, item) => totalValue + Number(item[valueKey] || 0), 0);

    return (
        <div className={`dashboard-distribution dashboard-distribution--${tone}`}>
            {items.length ? items.map((item, index) => {
                const value = Number(item[valueKey] || 0);
                const percentage = total ? Math.round((value / total) * 100) : 0;
                const name = item[nameKey];

                return (
                    <div key={item.id ?? name} className="dashboard-distribution-row">
                        <span className="dashboard-distribution-rank">{String(index + 1).padStart(2, "0")}</span>
                        <div className="dashboard-distribution-copy">
                            <div>
                                <strong>{tone === "category" && <span className="dashboard-category-icon" aria-hidden="true">{sportIcons[String(name).toLowerCase()] || "🏅"}</span>}{name}</strong>
                                <small>{detail ? detail(item, value) : `${value.toLocaleString()} ${label}`}</small>
                            </div>
                            <span className="dashboard-distribution-percent">{percentage}%</span>
                        </div>
                        <div className="dashboard-distribution-bar" aria-label={`${name}: ${value} ${label}, ${percentage}%`}>
                            <span style={{ width: `${percentage}%` }} />
                        </div>
                    </div>
                );
            }) : <p className="dashboard-distribution-empty">No distribution data available.</p>}
        </div>
    );
}

export default function Dashboard() {
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const [search, setSearch] = useState("");
    const [timeRange, setTimeRange] = useState("Today");
    const { data, loading, error } = useAttention();
    const { data: trendData, loading: trendsLoading, error: trendsError } = useTrends();
    const topSources = useTopSources();
    useEffect(() => {
        const handleShortcut = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                searchRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handleShortcut);
        return () => window.removeEventListener("keydown", handleShortcut);
    }, []);

    if (loading || trendsLoading) return <DashboardSkeleton />;
    if (error || trendsError || !data?.attention) return <ErrorCard />;

    const attention = data.attention;
    const domains = attention.domains || [];
    const categories = attention.categories || [];
    const topCategories = [...categories]
        .sort((a, b) => Number(b.mentions || 0) - Number(a.mentions || 0))
        .slice(0, 5);

    return (
        <div className="dashboard">
            <div className="dashboard-content">
                <div className="dashboard-utility-bar">
                    <label className="dashboard-search"><FiSearch aria-hidden="true" /><input ref={searchRef} value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && search.trim()) navigate(`/entities?q=${encodeURIComponent(search.trim())}`); }} placeholder="Search entities" aria-label="Search entities" /><kbd>Ctrl K</kbd></label>
                    <label className="dashboard-time-filter">Snapshot period<select value={timeRange} onChange={(event) => setTimeRange(event.target.value)}><option>Last Hour</option><option>Today</option><option>7 Days</option><option>30 Days</option><option>Custom</option></select></label>
                </div>
                <SnapshotSummary generatedAt={data.generated_at} summary={attention.summary} categories={categories} trends={trendData?.trends || []} />

                <SummaryCards
                    summary={attention.summary}
                    domains={domains}
                    categories={categories}
                    trends={trendData?.trends || []}
                />

                <section className="dashboard-main" aria-label="Attention and trend leaders">
                    <AttentionLeaderboard entities={attention.entities || []} trends={trendData?.trends || []} />
                    <TrendLeaderboard trends={trendData?.trends || []} />
                    <BiggestMovers trends={trendData?.trends || []} />
                </section>

                <AiHighlights categories={categories} trends={trendData?.trends || []} sources={topSources} />

                <section className="dashboard-bottom" aria-label="Distribution summaries">
                    <Panel
                        title={<span className="dashboard-distribution-title"><FiRss aria-hidden="true" /> Top sources</span>}
                        description="Publishers contributing the most articles"
                    >
                        <DistributionList items={topSources} label="articles" tone="source" nameKey="source" valueKey="article_count" detail={(source, value) => `${value.toLocaleString()} articles · ${source.category_count} categories`} />
                    </Panel>

                    <Panel
                        title={<span className="dashboard-distribution-title"><FiTag aria-hidden="true" /> Category distribution</span>}
                        description="Topics represented in this snapshot"
                    >
                        <DistributionList items={topCategories} label="mentions" tone="category" />
                    </Panel>
                </section>
            </div>
        </div>
    );
}
