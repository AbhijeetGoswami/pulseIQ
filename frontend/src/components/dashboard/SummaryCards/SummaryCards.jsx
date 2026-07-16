import { FiArrowUpRight, FiFileText, FiGlobe, FiGrid, FiUsers } from "react-icons/fi";

import "./SummaryCards.css";

const metrics = [
    { key: "articles", label: "Articles monitored", detail: "Latest intelligence coverage", icon: FiFileText, tone: "blue" },
    { key: "entities", label: "Entities detected", detail: "People, teams and organisations", icon: FiUsers, tone: "violet" },
    { key: "domains", label: "Active domains", detail: "Sources contributing signals", icon: FiGlobe, tone: "teal" },
    { key: "categories", label: "Categories tracked", detail: "Topics in the current snapshot", icon: FiGrid, tone: "amber" },
];

export default function SummaryCards({ summary, domains = [], categories = [], trends = [] }) {
    if (!summary) return null;

    const values = {
        articles: summary.total_articles ?? 0,
        entities: summary.unique_entities ?? 0,
        domains: domains.length,
        categories: categories.length,
    };
    const newEntities = trends.filter((trend) => trend.trend?.toLowerCase() === "new").length;
    const movements = {
        articles: `${Number(summary.total_mentions || 0).toLocaleString()} signals today`,
        entities: `${newEntities} new today`,
        domains: `${domains.length} live source${domains.length === 1 ? "" : "s"}`,
        categories: `${categories.length} active today`,
    };

    return (
        <section className="summary-section" aria-label="Snapshot summary">
            {/* <div className="summary-section-heading">
                <div>
                    <p>At a glance</p>
                    <h2>Intelligence snapshot</h2>
                </div>
                <span>Current collection</span>
            </div> */}

            <div className="summary-grid">
                {metrics.map(({ key, label, detail, icon: Icon, tone }) => (
                    <article key={key} className={`summary-card summary-card--${tone}`}>
                        <div className="summary-card-icon"><Icon aria-hidden="true" /></div>
                        <div className="summary-card-content">
                            <p>{label}</p>
                            <strong>{values[key].toLocaleString()}</strong>
                            <small>{detail}</small>
                            <span className="summary-card-movement"><FiArrowUpRight aria-hidden="true" /> {movements[key]}</span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
