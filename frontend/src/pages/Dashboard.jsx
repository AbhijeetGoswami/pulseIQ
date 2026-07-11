import Loader from "../components/Loader/Loader";
import ErrorCard from "../components/ErrorCard/ErrorCard";
import Panel from "../components/common/Panel/Panel";

import SummaryCards from "../components/dashboard/SummaryCards/SummaryCards";
import AttentionLeaderboard from "../components/dashboard/AttentionLeaderboard/AttentionLeaderboard";
import TrendLeaderboard from "../components/dashboard/TrendLeaderboard/TrendLeaderboard";

import useAttention from "../hooks/useAttention";
import useTrends from "../hooks/useTrends";

import "./Dashboard.css";

export default function Dashboard() {

    const {
        data,
        loading,
        error
    } = useAttention();

    const {
        data: trendData,
        loading: trendsLoading,
        error: trendsError
    } = useTrends();

    if (loading || trendsLoading) {
        return <Loader />;
    }

    if (error || trendsError) {
        return <ErrorCard />;
    }

    const attention = data.attention;

    return (

        <div className="dashboard">

            <div className="dashboard-content">

                <header className="dashboard-header">

                    <div>

                        <h1>PulseIQ Dashboard</h1>

                        <p>
                            Executive overview of the latest intelligence snapshot
                        </p>

                    </div>

                    <div className="dashboard-status">

                        <span className="status-dot" />

                        LIVE

                    </div>

                </header>

                <SummaryCards
                    summary={attention.summary}
                    domains={attention.domains}
                    categories={attention.categories}
                />

                <section className="dashboard-main">

                    <AttentionLeaderboard
                        entities={attention.entities}
                    />

                    <TrendLeaderboard
                        trends={trendData?.trends || []}
                    />

                </section>

                <section className="dashboard-bottom">

                    <Panel title="🌍 Domain Distribution">

                        <div className="dashboard-list">

                            {
                                attention.domains.map(domain => (

                                    <div
                                        key={domain.id}
                                        className="dashboard-list-item"
                                    >

                                        <div>

                                            <strong>{domain.name}</strong>

                                            <small>
                                                {domain.mentions} mentions
                                            </small>

                                        </div>

                                        <div className="mini-bar">

                                            <div
                                                style={{
                                                    width: `${Math.min(domain.mentions * 8, 100)}%`
                                                }}
                                            />

                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                    </Panel>

                    <Panel title="🏆 Category Distribution">

                        <div className="dashboard-list">

                            {
                                attention.categories.map(category => (

                                    <div
                                        key={category.id}
                                        className="dashboard-list-item"
                                    >

                                        <div>

                                            <strong>{category.name}</strong>

                                            <small>
                                                {category.mentions} entities
                                            </small>

                                        </div>

                                        <div className="mini-bar">

                                            <div
                                                style={{
                                                    width: `${Math.min(category.mentions * 12, 100)}%`
                                                }}
                                            />

                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                    </Panel>

                </section>

            </div>

        </div>

    );
}