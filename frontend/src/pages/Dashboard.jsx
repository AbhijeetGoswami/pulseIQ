import { FiGlobe, FiTag } from "react-icons/fi";

import Loader from "../components/Loader/Loader";
import ErrorCard from "../components/ErrorCard/ErrorCard";
import Panel from "../components/common/Panel/Panel";
import SummaryCards from "../components/dashboard/SummaryCards/SummaryCards";
import AttentionLeaderboard from "../components/dashboard/AttentionLeaderboard/AttentionLeaderboard";
import TrendLeaderboard from "../components/dashboard/TrendLeaderboard/TrendLeaderboard";
import useAttention from "../hooks/useAttention";
import useTrends from "../hooks/useTrends";
import "./Dashboard.css";

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
    if (loading || trendsLoading) return <Loader />;
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
                        <DistributionList items={topCategories} label="mentions" tone="category" />
                    </Panel>
                </section>
            </div>
        </div>
    );
}
