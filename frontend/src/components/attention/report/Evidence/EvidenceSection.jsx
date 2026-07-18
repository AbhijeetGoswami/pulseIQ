import Panel from "../../../common/Panel/Panel";
import "./EvidenceSection.css";

export default function EvidenceSection({
    entity,
    articles,
    sourceCounts,
    reasons,
    formatNumber,
}) {
    return (
        <section className="evidence-section">

            <div className="attention-report-cards">

                <Panel title="Entity Profile">
                    <dl className="attention-report-metadata">

                        <div>
                            <dt>Entity ID</dt>
                            <dd>{entity.id ?? entity.entity_id}</dd>
                        </div>

                        <div>
                            <dt>Type</dt>
                            <dd>{entity.type || "Unknown"}</dd>
                        </div>

                        <div>
                            <dt>Sport / Domain</dt>
                            <dd>{entity.sport || "N/A"}</dd>
                        </div>

                        <div>
                            <dt>Primary Source</dt>
                            <dd>
                                {sourceCounts.length
                                    ? sourceCounts[0].source
                                    : "Coverage Feed"}
                            </dd>
                        </div>

                    </dl>
                </Panel>

                <Panel title="Snapshot KPIs">

                    <div className="kpi-grid">

                        <div>
                            <strong>{formatNumber(entity.mentions)}</strong>
                            <span>Total mentions</span>
                        </div>

                        <div>
                            <strong>
                                {Math.round(
                                    entity.attention_score ??
                                    entity.scores?.mention ??
                                    0
                                )}
                            </strong>
                            <span>Attention score</span>
                        </div>

                        <div>
                            <strong>{formatNumber(articles.length)}</strong>
                            <span>Coverage items</span>
                        </div>

                    </div>

                </Panel>

            </div>

            <Panel title="Why this entity is receiving attention">

                <ul className="attention-report-reasons">

                    {reasons.length ? (
                        reasons.map(reason => (
                            <li key={reason}>{reason}</li>
                        ))
                    ) : (
                        <li>Attention signals are still being computed.</li>
                    )}

                </ul>

            </Panel>

            <Panel title="Top Contributors">

                {sourceCounts.length ? (

                    <ol className="source-list">

                        {sourceCounts.map(source => (

                            <li key={source.source}>
                                <span>{source.source}</span>
                                <strong>{source.count} coverage items</strong>
                            </li>

                        ))}

                    </ol>

                ) : (
                    <p>No contributors available yet.</p>
                )}

            </Panel>

            <Panel title="Source Contribution">

                {sourceCounts.length ? (

                    <div className="source-pill-list">

                        {sourceCounts.map(item => (

                            <span
                                key={item.source}
                                className="source-pill"
                            >
                                {item.source} · {item.count}
                            </span>

                        ))}

                    </div>

                ) : (
                    <p>Waiting for coverage data.</p>
                )}

            </Panel>

        </section>
    );
}