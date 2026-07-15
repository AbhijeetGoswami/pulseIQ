import { FiArrowUpRight, FiZap } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Panel from "../../common/Panel/Panel";
import { normalizeEntity } from "../../../utils/entityNormalizer";
import "./AttentionLeaderboard.css";

export default function AttentionLeaderboard({ entities = [] }) {
    const navigate = useNavigate();
    const leaderboard = [...entities]
        .sort((a, b) => Number(b.attention_score || 0) - Number(a.attention_score || 0))
        .slice(0, 5);

    const handleEntityClick = (entity) => {
        const normalized = normalizeEntity(entity);
        navigate(`/entities?id=${normalized.entity_id}`, { state: { entity: normalized } });
    };

    return (
        <Panel title={<span className="attention-title"><FiZap aria-hidden="true" /> Top attentions</span>}>
            <div className="attention-intro">
                <span>Entities drawing the most attention right now</span>
                <span>Score</span>
            </div>

            <div className="leaderboard-body">
                {leaderboard.length ? leaderboard.map((entity, index) => {
                    const score = Math.round(Number(entity.attention_score || 0));
                    const progress = Math.min(Math.max(score, 0), 100);

                    return (
                        <button
                            key={entity.id ?? `${entity.value}-${index}`}
                            type="button"
                            className="attention-row"
                            onClick={() => handleEntityClick(entity)}
                        >
                            <span className={`attention-rank${index < 3 ? " attention-rank--top" : ""}`}>
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <span className="attention-entity">
                                <strong>{entity.value}</strong>
                                <small>{[entity.type, entity.sport].filter(Boolean).join(" · ") || "Entity"}</small>
                            </span>

                            <span className="attention-meter" aria-label={`Attention score ${score} out of 100`}>
                                <span style={{ width: `${progress}%` }} />
                            </span>

                            <span className="attention-score">{score}<small>/100</small></span>
                            <FiArrowUpRight className="attention-arrow" aria-hidden="true" />
                        </button>
                    );
                }) : (
                    <p className="attention-empty">No attention data is available yet.</p>
                )}
            </div>
        </Panel>
    );
}
