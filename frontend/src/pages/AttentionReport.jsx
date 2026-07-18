import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import ErrorCard from "../components/ErrorCard/ErrorCard";
import useAttention from "../hooks/useAttention";
import { getEntityArticles, searchEntities } from "../services/entityService";
import "./AttentionReport.css";
import HeroSection from "../components/attention/report/Hero";
import AIAnalysisCard from "../components/attention/report/AI";
import CoverageFeed from "../components/attention/report/Coverage";
import TimelineSection from "../components/attention/report/Timeline";
import MetadataFooter from "../components/common/MetadataFooter";

import {
    ReportStack,
    ReportFull,
    ReportTwoColumn,
} from "../components/common/ReportLayout";

import SnapshotMetrics from "../components/attention/report/Evidence/SnapshotMetrics";
import KeyEvidence from "../components/attention/report/Evidence/KeyEvidence";

import RelationshipNetwork from "../components/attention/report/Knowledge/RelationshipNetwork";
import RelatedEntities from "../components/attention/report/Knowledge/RelatedEntities";

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
            <HeroSection
                entity={entity}
                generatedAt={generatedAt}
                location={location}
                navigate={navigate}
                formatDateTime={formatDateTime}
                formatNumber={formatNumber}
            />

            <ReportStack>

            <ReportFull>
                <AIAnalysisCard
                    entity={entity}
                    articles={articles}
                    sourceCounts={sourceCounts}
                    formatNumber={formatNumber}
                />
            </ReportFull>

            <ReportTwoColumn
                left={
                    <SnapshotMetrics
                        entity={entity}
                        articles={articles}
                        formatNumber={formatNumber}
                    />
                }
                right={
                    <KeyEvidence
                        entity={entity}
                        reasons={reasons}
                        sourceCounts={sourceCounts}
                        formatNumber={formatNumber}
                    />
                }
            />

            <ReportTwoColumn
                left={
                    <RelationshipNetwork
                        entity={entity}
                    />
                }
                right={
                    <RelatedEntities
                        entity={entity}
                        relatedEntities={relatedEntities}
                    />
                }
            />

            <ReportFull>
                <TimelineSection />
            </ReportFull>

            <ReportFull>
                <CoverageFeed
                    articles={articles}
                    articlesLoading={articlesLoading}
                    formatDateTime={formatDateTime}
                />
            </ReportFull>

            </ReportStack>

            <MetadataFooter
                generatedAt={generatedAt}
                entity={entity}
                formatDateTime={formatDateTime}
            />
        </main>
    );
}
