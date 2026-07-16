import { FiFileText, FiGrid, FiTrendingUp, FiUsers, FiZap } from "react-icons/fi";

import "./SnapshotSummary.css";

function timeAgo(value) {
    if (!value) return "Updated recently";
    const minutes = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 60000));
    if (minutes < 1) return "Updated just now";
    if (minutes < 60) return `Updated ${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    const hours = Math.floor(minutes / 60);
    return `Updated ${hours} hour${hours === 1 ? "" : "s"} ago`;
}

export default function SnapshotSummary({ generatedAt, summary, categories, trends }) {
    const hottestCategory = [...categories].sort((a, b) => Number(b.mentions || 0) - Number(a.mentions || 0))[0];
    const biggestMover = [...trends].sort((a, b) => Math.abs(Number(b.score_change || 0)) - Math.abs(Number(a.score_change || 0)))[0];
    const newEntities = trends.filter((trend) => trend.trend?.toLowerCase() === "new").length;
    const moverChange = Number(biggestMover?.score_change || 0);

    return (
        <section className="snapshot-summary" aria-label="Attention snapshot">
            <header>
                <div>
                    <p><FiZap aria-hidden="true" /> Attention snapshot</p>
                    <span><i aria-hidden="true" /> Live · {timeAgo(generatedAt).replace("Updated ", "")}</span>
                </div>
            </header>
            <div className="snapshot-summary-items">
                <span><FiFileText aria-hidden="true" /> {Number(summary?.total_articles || 0).toLocaleString()} articles processed</span>
                <span><FiUsers aria-hidden="true" /> {newEntities} new entities</span>
                <span><FiGrid aria-hidden="true" /> {categories.length} categories active</span>
                <span><FiTrendingUp aria-hidden="true" /> Biggest mover: {biggestMover ? `${biggestMover.value} (${moverChange >= 0 ? "+" : ""}${moverChange.toFixed(1)})` : "No change detected"}</span>
                <span><FiZap aria-hidden="true" /> Hottest category: {hottestCategory?.name || "No category data"}</span>
            </div>
        </section>
    );
}
