import { FiArrowUpRight, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";

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

export default function TrendLeaderboard({ trends = [] }) {
    return (
        <Panel title={<span className="trend-title"><FiTrendingUp aria-hidden="true" /> Trending now</span>}>
            <div className="trend-intro">
                <span>Topics currently trending</span>
                <span>Movement</span>
            </div>

            <div className="trend-list">
                {trends.length ? trends.slice(0, 7).map((trend, index) => {
                    const state = trend.trend?.toLowerCase() || "stable";
                    const label = trendLabels[state] || state;
                    const entity = normalizeEntity(trend);

                    return (
                        <Link
                            key={trend.id ?? `${trend.value}-${index}`}
                            to={`/entities?id=${entity.entity_id}`}
                            state={{ entity }}
                            className="trend-row"
                        >
                            <span className="trend-rank">{String(index + 1).padStart(2, "0")}</span>
                            <span className={`trend-badge trend-badge--${state}`}>{label}</span>
                            <span className="trend-entity">
                                <strong>{trend.value}</strong>
                                {/* <small>Attention signal</small> */}
                            </span>
                            {/* <span className="trend-movement">{label}</span> */}
                            <FiArrowUpRight className="trend-arrow" aria-hidden="true" />
                        </Link>
                    );
                }) : (
                    <p className="trend-empty">No trend changes are available yet.</p>
                )}
            </div>
        </Panel>
    );
}
