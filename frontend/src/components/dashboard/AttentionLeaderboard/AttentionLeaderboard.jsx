import { useState } from "react";
import { FiArrowRight, FiChevronDown, FiCompass, FiZap } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import Panel from "../../common/Panel/Panel";
import { normalizeEntity } from "../../../utils/entityNormalizer";
import "./AttentionLeaderboard.css";

export default function AttentionLeaderboard({ entities = [], trends = [], limit = 5, showViewMore = true }) {
    const navigate = useNavigate();
    const [expandedEntityId, setExpandedEntityId] = useState(null);
    const leaderboard = [...entities]
        .sort((a, b) => Number(b.attention_score || 0) - Number(a.attention_score || 0))
        .slice(0, limit);

    const handleEntityClick = (entity) => {
        const normalized = normalizeEntity(entity);
        navigate(`/attention/${normalized.entity_id}`, {
            state: {
                entity: normalized,
                from: "dashboard",
            },
        });
    };

    const getEntityKey = (entity, index) => entity.entity_id ?? entity.id ?? `${entity.value}-${index}`;

    return (
        <Panel title={<span className="attention-title"><FiZap aria-hidden="true" /> Top attentions</span>} action={showViewMore ? <Link className="leaderboard-view-more" to="/attention">View all <FiArrowRight aria-hidden="true" /></Link> : null}>
            {/* <div className="attention-intro"><span>Entities ranked by attentions</span><span>Score</span></div> */}
            <div className="leaderboard-body">
                {leaderboard.length ? leaderboard.map((entity, index) => {
                    const score = Math.round(Number(entity.attention_score || 0));
                    const progress = Math.min(Math.max(score, 0), 100);
                    const entityKey = getEntityKey(entity, index);
                    const isExpanded = expandedEntityId === entityKey;
                    const trend = trends.find((item) => (item.id ?? item.entity_id) === entityKey);
                    const scoreChange = Number(trend?.score_change || 0);
                    const isFeatured = index === 0 && showViewMore;
                    const reasons = [
                        `${Number(entity.mentions || 0).toLocaleString()} mentions in the current snapshot`,
                        `${entity.sport || "Monitored"} ${entity.type || "entity"} tracked by AttenBase`,
                        `Attention score of ${score} out of 100`,
                        trend ? `${scoreChange >= 0 ? "Up" : "Down"} ${Math.abs(scoreChange).toFixed(1)} points since the previous snapshot` : "Included in the current attention leaderboard",
                    ];

                    return (
                        <article key={entityKey} className="attention-card">
                            <button type="button" className={`attention-row${isFeatured ? " attention-row--featured" : ""}`} onClick={() => setExpandedEntityId(isExpanded ? null : entityKey)} aria-expanded={isExpanded} aria-controls={`attention-details-${entityKey}`}>
                                {isFeatured ? <>
                                    <span className="attention-featured-rank">#1 Attention</span>
                                    <span className="attention-featured-entity"><strong>{entity.value}</strong><small>{[entity.type, entity.sport].filter(Boolean).join(" · ") || "Entity"}</small></span>
                                    <span className="attention-featured-score"><small>Score</small><strong>{score}</strong><em>{trend ? `${scoreChange >= 0 ? "+" : ""}${scoreChange.toFixed(1)} today` : "Current leader"}</em></span>
                                </> : <>
                                    <span className={`attention-rank${index < 3 ? " attention-rank--top" : ""}`}>{String(index + 1).padStart(2, "0")}</span>
                                    <span className="attention-entity"><strong>{entity.value}</strong><small>{[entity.type, entity.sport].filter(Boolean).join(" · ") || "Entity"}</small></span>
                                    <span className="attention-meter" aria-label={`Attention score ${score} out of 100`}><span style={{ width: `${progress}%` }} /></span>
                                    <span className="attention-score">{score}<small>/100</small></span>
                                </>}
                                <FiChevronDown className={`attention-chevron${isExpanded ? " attention-chevron--open" : ""}`} aria-hidden="true" />
                            </button>
                            {isExpanded && <div id={`attention-details-${entityKey}`} className="attention-details"><div className="attention-explanation"><strong>Why is {entity.value} drawing attention?</strong><ul>{reasons.map((reason) => <li key={reason}>✓ {reason}</li>)}</ul></div><button type="button" className="attention-explorer-action" onClick={() => handleEntityClick(entity)}>Open in Attention Report <FiCompass aria-hidden="true" /></button></div>}
                        </article>
                    );
                }) : <p className="attention-empty">No attention data is available yet.</p>}
            </div>
        </Panel>
    );
}
