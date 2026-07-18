import ReportSection from "../../../common/ReportSection";

export default function RelatedEntities({
    relatedEntities,
}) {

    return (
        <ReportSection
            title="Related Entities"
            description="Entities within the same attention context."
        >

            {
                relatedEntities.length === 0 ? (

                    <p>No related entities found.</p>

                ) : (

                    <div className="related-entity-list">

                        {
                            relatedEntities.map((entity) => (

                                <div
                                    key={entity.id ?? entity.entity_id}
                                    className="related-entity"
                                >
                                    <strong>{entity.value}</strong>

                                    <span>
                                        {entity.type}
                                    </span>

                                </div>

                            ))
                        }

                    </div>

                )
            }

        </ReportSection>
    );
}