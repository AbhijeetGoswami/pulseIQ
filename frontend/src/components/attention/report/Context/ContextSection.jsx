import { Suspense } from "react";
import Panel from "../../../common/Panel/Panel";
import RelationshipGraph from "../../RelationshipGraph";
import "./ContextSection.css";

export default function ContextSection({
    relatedEntities,
    entity,
}) {
    return (
        <section className="context-section">

            <Panel title="Related Entities">

                {relatedEntities.length ? (

                    <ul className="related-entities-list">

                        {relatedEntities.map(item => (

                            <li key={item.id ?? item.entity_id}>
                                {item.value} · {item.type || "Entity"}
                            </li>

                        ))}

                    </ul>

                ) : (

                    <p>No related entities available.</p>

                )}

            </Panel>

            <Panel title="Topic Cloud">

                <div className="topic-cloud">

                    {[entity.sport, entity.type, entity.value]
                        .filter(Boolean)
                        .map(topic => (

                            <span
                                key={topic}
                                className="topic-chip"
                            >
                                {topic}
                            </span>

                        ))}

                    <span className="topic-chip">
                        Latest Coverage
                    </span>

                    <span className="topic-chip">
                        Mentions
                    </span>

                </div>

            </Panel>

            <Suspense
                fallback={
                    <Panel title="Relationship Network">
                        <p>Loading network…</p>
                    </Panel>
                }
            >
                <RelationshipGraph />
            </Suspense>

        </section>
    );
}