import { useEffect, useMemo, useState, Suspense, lazy } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiClock } from "react-icons/fi";
import Panel from "../components/common/Panel/Panel";
import Loader from "../components/Loader/Loader";
import ErrorCard from "../components/ErrorCard/ErrorCard";
import useAttention from "../hooks/useAttention";
import { getEntityArticles, searchEntities } from "../services/entityService";
import "./AttentionReport.css";

const RelationshipGraph = lazy(() => import("../components/attention/RelationshipGraph"));

const formatDateTime = (value) => {
    if (!value) return "Unknown";

    try {
        return new Date(value).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    } catch {
        return value;
    }
};

const formatNumber = (value) => {
    if (value == null || Number.isNaN(Number(value))) return "—";
    return Number(value).toLocaleString();
};

const findEntity = (snapshot, entityId) => {
    if (!snapshot?.attention) return null;

    const entities = snapshot.attention.entities?.length
        ? snapshot.attention.entities
        : Object.values(snapshot.attention.entity_types || {}).flat();

    return entities.find(
        (item) =>
            item.id === entityId ||
            item.entity_id === entityId ||
            String(item.value).toLowerCase() === String(entityId).toLowerCase(),
    );
};

const buildReasonList = (entity, attention) => {
    const reasons = [];

    if (entity.mentions != null) {
        reasons.push(`${formatNumber(entity.mentions)} mentions in the latest snapshot`);
    }

    if (entity.attention_score != null) {
        reasons.push(`Attention score of ${Math.round(entity.attention_score)}`);
    }

    if (entity.sport) {
        reasons.push(`Active in ${entity.sport}`);
    }

    if (entity.type) {
        reasons.push(`Tracked as a ${entity.type}`);
    }

    const category = attention.categories?.find((item) => item.name === entity.sport);
    if (category) {
        reasons.push(`${category.mentions.toLocaleString()} mentions for ${category.name} overall`);
    }

    return reasons;
};

export default function AttentionReport() {
    const { entityId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { data, loading, error } = useAttention();
    const [entity, setEntity] = useState(null);
    const [articles, setArticles] = useState([]);
    const [articlesLoading, setArticlesLoading] = useState(true);
    const [detailError, setDetailError] = useState(null);

    useEffect(() => {
        if (loading || !data) return;

        const matchedEntity = findEntity(data, entityId);

        if (matchedEntity) {
            setEntity(matchedEntity);
            setDetailError(null);
            return;
        }

        searchEntities(entityId)
            .then((result) => {
                if (result.length > 0) {
                    setEntity(result[0]);
                } else {
                    setDetailError("Entity not found in the latest attention snapshot.");
                }
            })
            .catch((err) => {
                console.error(err);
                setDetailError("Unable to resolve entity details.");
            });
    }, [loading, data, entityId]);

    useEffect(() => {
        if (!entity) {
            setArticles([]);
            setArticlesLoading(false);
            return;
        }

        setArticlesLoading(true);
        setDetailError(null);

        getEntityArticles(entity.id ?? entity.entity_id ?? entityId)
            .then((result) => {
                setArticles(result || []);
            })
            .catch((err) => {
                console.error(err);
                setDetailError("Unable to load latest coverage.");
                setArticles([]);
            })
            .finally(() => {
                setArticlesLoading(false);
            });
    }, [entity, entityId]);

    const snapshot = data?.attention;
    const reportLoading = loading || articlesLoading;

    const sourceCounts = useMemo(() => {
        const counts = {};
        articles.forEach((article) => {
            const source = article.source || "Unknown";
            counts[source] = (counts[source] || 0) + 1;
        });
        return Object.entries(counts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([source, count]) => ({ source, count }));
    }, [articles]);

    const relatedEntities = useMemo(() => {
        if (!snapshot || !entity) return [];
        const allEntities = snapshot.entities?.length
            ? snapshot.entities
            : Object.values(snapshot.entity_types || {}).flat();

        return allEntities
            .filter((item) => item.id !== entity.id && item.entity_id !== entity.entity_id && item.sport === entity.sport)
            .slice(0, 5);
    }, [snapshot, entity]);

    const reasons = buildReasonList(entity || {}, snapshot || {});
    const generatedAt = data?.generated_at || snapshot?.generated_at;

    if (loading) return <Loader />;
    if (error) return <ErrorCard error={error} />;
    if (detailError) return <ErrorCard error={{ message: detailError }} />;
    if (!entity) return <ErrorCard error={{ message: "No attention report is available for this entity." }} />;

    return (
        <main className="attention-report-page">
            <section className="attention-report-header">
                <button type="button" className="attention-report-back" onClick={() => {
                    const from = location.state?.from;
                    if (from === "attention") {
                        navigate("/attention");
                    } else if (from === "dashboard") {
                        navigate("/");
                    } else {
                        navigate(-1);
                    }
                }}>
                    <FiArrowLeft aria-hidden="true" /> Back
                </button>
                <div className="attention-report-title">
                    <p className="attention-report-eyebrow">Attention Intelligence Report</p>
                    <h1>{entity.value}</h1>
                    <p className="attention-report-tagline">A deep investigation into why this entity is drawing attention and which sources are driving it.</p>
                </div>
                <div className="attention-report-stats">
                    <div>
                        <strong>{formatNumber(entity.attention_score ?? entity.scores?.mention ?? 0)}</strong>
                        <span>Attention Score</span>
                    </div>
                    <div>
                        <strong>{formatNumber(entity.mentions)}</strong>
                        <span>Mentions</span>
                    </div>
                    <div>
                        <strong>{formatNumber(articles.length)}</strong>
                        <span>Latest Coverage</span>
                    </div>
                    <div>
                        <strong>{formatDateTime(generatedAt)}</strong>
                        <span>Snapshot Updated</span>
                    </div>
                </div>
            </section>

            <section className="attention-report-grid">
                <Panel title="Executive summary">
                    <p>
                        {entity.value} is currently in focus because it appears repeatedly in the latest attention snapshot and is associated with significant media activity. This report pulls together the top indicators, sources, and recent coverage that explain why this entity is on the radar.
                    </p>
                </Panel>

                <div className="attention-report-cards">
                    <Panel title="Entity profile">
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
                                <dt>Data source</dt>
                                <dd>{sourceCounts.length ? sourceCounts[0].source : "Coverage feed"}</dd>
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
                                <strong>{Math.round(entity.attention_score ?? entity.scores?.mention ?? 0)}</strong>
                                <span>Attention score</span>
                            </div>
                            <div>
                                <strong>{formatNumber(articles.length)}</strong>
                                <span>Latest coverage items</span>
                            </div>
                        </div>
                    </Panel>
                </div>

                <Panel title="Why this entity is receiving attention">
                    <ul className="attention-report-reasons">
                        {reasons.length ? reasons.map((reason) => <li key={reason}>{reason}</li>) : <li>Attention signals are still being computed.</li>}
                    </ul>
                </Panel>

                <Panel title="Top contributors">
                    {sourceCounts.length ? (
                        <ol className="source-list">
                            {sourceCounts.map((source) => (
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

                <Panel title="Source contribution">
                    {sourceCounts.length ? (
                        <div className="source-pill-list">
                            {sourceCounts.map((item) => (
                                <span key={item.source} className="source-pill">
                                    {item.source} · {item.count}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p>Waiting for coverage data.</p>
                    )}
                </Panel>

                <Panel title="Related entities">
                    {relatedEntities.length ? (
                        <ul className="related-entities-list">
                            {relatedEntities.map((item) => (
                                <li key={item.id ?? item.entity_id}>{item.value} · {item.type || "Entity"}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Related entities are not available for this snapshot.</p>
                    )}
                </Panel>

                <Panel title="Topic cloud">
                    <div className="topic-cloud">
                        {[entity.sport, entity.type, entity.value].filter(Boolean).map((topic) => (
                            <span key={topic} className="topic-chip">{topic}</span>
                        ))}
                        <span className="topic-chip">Latest coverage</span>
                        <span className="topic-chip">Mentions</span>
                    </div>
                </Panel>

                <Panel title="Attention timeline">
                    <div className="timeline-placeholder">
                        <FiClock aria-hidden="true" /> Timeline snapshots are available in the attention engine, and this view will be enhanced in a future release.
                    </div>
                </Panel>

                <Suspense fallback={<Panel title="Relationship network"><p>Loading network view…</p></Panel>}>
                    <RelationshipGraph />
                </Suspense>

                <Panel title="Latest coverage">
                    {articlesLoading ? (
                        <Loader />
                    ) : articles.length ? (
                        <div className="coverage-grid">
                            {articles.slice(0, 8).map((article) => (
                                <article key={article.article_id} className="coverage-card">
                                    <div className="coverage-card-header">
                                        <span className="coverage-source">{article.source || "Source"}</span>
                                        <time>{formatDateTime(article.published_at)}</time>
                                    </div>
                                    <h3>{article.title}</h3>
                                    <a href={article.link} target="_blank" rel="noreferrer">Read article</a>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <p>No coverage articles are available for this entity yet.</p>
                    )}
                </Panel>
            </section>

            <footer className="attention-report-footer">
                <div>
                    <strong>Snapshot generated</strong>
                    <p>{formatDateTime(generatedAt)}</p>
                </div>
                <div>
                    <strong>Report source</strong>
                    <p>Attention snapshot + entity coverage lookup</p>
                </div>
                <div>
                    <strong>Entity metadata</strong>
                    <p>{entity.id ?? entity.entity_id}</p>
                </div>
            </footer>
        </main>
    );
}
