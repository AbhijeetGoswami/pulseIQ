import ReportSection from "../../../common/ReportSection";

export default function SnapshotMetrics({
    entity,
    articles,
    formatNumber,
}) {
    return (
        <ReportSection
            title="Snapshot Metrics"
            description="Current attention snapshot."
        >
            <div className="metric-list">

                <div className="metric-item">
                    <span>Attention Score</span>
                    <strong>{Math.round(entity.attention_score ?? 0)}</strong>
                </div>

                <div className="metric-item">
                    <span>Mentions</span>
                    <strong>{formatNumber(entity.mentions)}</strong>
                </div>

                <div className="metric-item">
                    <span>Articles</span>
                    <strong>{formatNumber(articles.length)}</strong>
                </div>

                <div className="metric-item">
                    <span>Entity Type</span>
                    <strong>{entity.type ?? "Unknown"}</strong>
                </div>

                <div className="metric-item">
                    <span>Sport</span>
                    <strong>{entity.sport ?? "Unknown"}</strong>
                </div>

            </div>
        </ReportSection>
    );
}