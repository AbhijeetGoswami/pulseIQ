import RankBadge from "./RankBadge";
import EntityMetadata from "./EntityMetadata";
import AttentionScore from "./AttentionScore";
import TrendBadge from "./TrendBadge";
import AttentionStats from "./AttentionStats";
import AttentionReason from "./AttentionReason";
import AttentionActions from "./AttentionActions";

import ExpandableSection from "./common/ExpandableSection";

export default function EntityCard({
    entity,
    rank,
    metadata,
    mentions,
    onClick,
}) {
    return (
        <div className="entity-card">

            <div className="entity-card-header">

                <RankBadge rank={rank} />

                <div className="entity-card-main">

                    <EntityMetadata
                        name={entity.value}
                        metadata={metadata}
                    />

                </div>

                <div className="entity-card-side">

                    <AttentionScore
                        value={entity.attention_score}
                    />

                    <TrendBadge
                        trend={entity.trend}
                    />

                </div>

            </div>

            <ExpandableSection
                title="Entity Intelligence"
            >

                <AttentionReason
                    score={entity.attention_score}
                    mentions={mentions}
                    articles={entity.article_count}
                    trend={entity.trend}
                    entityType={metadata?.type}
                />

                <AttentionStats
                    mentions={mentions}
                    articles={entity.article_count}
                    lastSeen={entity.last_seen}
                />

                <AttentionActions
                    entity={entity}
                    onView={onClick}
                />

            </ExpandableSection>

        </div>
    );
}