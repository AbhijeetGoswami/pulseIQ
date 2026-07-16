import { FiArrowDownRight, FiArrowUpRight, FiBarChart2 } from "react-icons/fi";
import { Link } from "react-router-dom";

import Panel from "../../common/Panel/Panel";
import { normalizeEntity } from "../../../utils/entityNormalizer";
import "./BiggestMovers.css";

export default function BiggestMovers({ trends = [] }) {
    const movers = [...trends]
        .filter((trend) => Number(trend.score_change || 0) !== 0)
        .sort((a, b) => Math.abs(Number(b.score_change || 0)) - Math.abs(Number(a.score_change || 0)))
        .slice(0, 5);
    const previousRankings = [...trends]
        .filter((trend) => Number(trend.previous_score || 0) > 0)
        .sort((a, b) => Number(b.previous_score || 0) - Number(a.previous_score || 0));

    return (
        <Panel title={<span className="movers-title"><FiBarChart2 aria-hidden="true" /> Biggest movers</span>} description="Largest attention score changes">
            <div className="movers-list">
                {movers.length ? movers.map((mover, index) => {
                    const change = Number(mover.score_change || 0);
                    const entity = normalizeEntity(mover);
                    const rising = change > 0;
                    const isFeatured = index === 0;
                    const previousRank = previousRankings.findIndex((trend) => (trend.id ?? trend.entity_id) === (mover.id ?? mover.entity_id)) + 1;
                    return (
                        <Link key={mover.id ?? `${mover.value}-${index}`} to={`/entities?id=${entity.entity_id}`} state={{ entity }} className={`mover-row${isFeatured ? " mover-row--featured" : ""}`}>
                            {isFeatured && <span className="mover-featured-rank">Top mover</span>}
                            <span className={`mover-direction mover-direction--${rising ? "up" : "down"}`}>{rising ? <FiArrowUpRight aria-hidden="true" /> : <FiArrowDownRight aria-hidden="true" />}</span>
                            <span className="mover-entity"><strong>{mover.value}</strong><small>{mover.sport || mover.type || "Entity"}{previousRank ? ` · from #${previousRank}` : ""}</small></span>
                            <strong className={rising ? "mover-change mover-change--up" : "mover-change mover-change--down"}>{rising ? "+" : ""}{change.toFixed(1)}</strong>
                        </Link>
                    );
                }) : <p className="movers-empty">No score changes are available yet.</p>}
            </div>
        </Panel>
    );
}
