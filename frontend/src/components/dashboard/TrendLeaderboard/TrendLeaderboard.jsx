import { useState } from "react";
import { FiArrowRight, FiChevronDown, FiCompass, FiTrendingUp } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import Panel from "../../common/Panel/Panel";
import { normalizeEntity } from "../../../utils/entityNormalizer";
import "./TrendLeaderboard.css";

const trendLabels = {
    new: "New",
    rising: "Rising",
    falling: "Falling",
    disappeared: "Faded",
    stable: "Stable",
};

export default function TrendLeaderboard({ trends = [], limit = 7, showViewMore = true }) {
    const navigate = useNavigate();
    const [expandedTrendId, setExpandedTrendId] = useState(null);
    const getTrendKey = (trend, index) => trend.entity_id ?? trend.id ?? `${trend.value}-${index}`;

    const openInExplorer = (trend) => {
        const entity = normalizeEntity(trend);
        navigate(`/entities?id=${entity.entity_id}`, { state: { entity } });
    };

    return (
        <Panel title={<span className="trend-title"><FiTrendingUp aria-hidden="true" /> Trending now</span>} action={showViewMore ? <Link className="leaderboard-view-more leaderboard-view-more--trend" to="/trends">View all <FiArrowRight aria-hidden="true" /></Link> : null}>
            {/* <div className="trend-intro">
                <span>Topics currently trending</span>
                <span>Movement</span>
            </div> */}

            <div className="trend-list">
                {trends.length ? trends.slice(0, limit).map((trend, index) => {
                    const state = trend.trend?.toLowerCase() || "stable";
                    const label = trendLabels[state] || state;
                    const trendKey = getTrendKey(trend, index);
                    const isExpanded = expandedTrendId === trendKey;
                    const isFeatured = index === 0 && showViewMore;
                    const scoreChange = Number(trend.score_change || 0);

                    return (
                        <article key={trendKey} className="trend-card">
                            <button
                                type="button"
                                className={`trend-row${isFeatured ? " trend-row--featured" : ""}`}
                                onClick={() => setExpandedTrendId(isExpanded ? null : trendKey)}
                                aria-expanded={isExpanded}
                                aria-controls={`trend-details-${trendKey}`}
                            >
                                {isFeatured ? <>
                                    <span className="trend-featured-rank">#1 Trending</span>
                                    <span className="trend-featured-entity"><strong>{trend.value}</strong><small>{[trend.type, trend.sport].filter(Boolean).join(" · ") || "Topic"}</small></span>
                                    <span className="trend-featured-change"><small>Movement</small><strong>{scoreChange >= 0 ? "+" : ""}{scoreChange.toFixed(1)}</strong><em>{label}</em></span>
                                </> : <>
                                    <span className="trend-rank">{String(index + 1).padStart(2, "0")}</span>
                                    <span className={`trend-badge trend-badge--${state}`}>{label}</span>
                                    <span className="trend-entity"><strong>{trend.value}</strong></span>
                                </>}
                                <FiChevronDown className={`trend-chevron${isExpanded ? " trend-chevron--open" : ""}`} aria-hidden="true" />
                            </button>

                            {isExpanded && (
                                <div id={`trend-details-${trendKey}`} className="trend-details">
                                    <p>Explore this topic’s related coverage and signals.</p>
                                    <button type="button" className="trend-explorer-action" onClick={() => openInExplorer(trend)}>
                                        Open in Explorer <FiCompass aria-hidden="true" />
                                    </button>
                                </div>
                            )}
                        </article>
                    );
                }) : <p className="trend-empty">No trend changes are available yet.</p>}
            </div>
        </Panel>
    );
}
