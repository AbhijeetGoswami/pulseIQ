import ReportSection from "../../../common/ReportSection";

export default function RelationshipNetwork({ entity }) {

    return (
        <ReportSection
            title="Relationship Network"
            description="Knowledge graph visualization."
        >

            <div className="relationship-placeholder">

                <div className="network-node">
                    {entity.value}
                </div>

                <p>
                    Relationship graph will be available in the
                    next release.
                </p>

            </div>

        </ReportSection>
    );
}