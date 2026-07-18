import ReportSection from "../../../common/ReportSection";

export default function KeyEvidence({
    reasons,
    sourceCounts,
    formatNumber,
}) {

    return (
        <ReportSection
            title="Key Evidence"
            description="Signals contributing to today's attention."
        >

            <h4>Why Attention?</h4>

            <ul className="evidence-list">
                {reasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                ))}
            </ul>

            <h4>Top Sources</h4>

            <ul className="evidence-list">
                {sourceCounts.map((source) => (
                    <li key={source.source}>
                        {source.source}
                        {" "}
                        ({formatNumber(source.count)})
                    </li>
                ))}
            </ul>

        </ReportSection>
    );
}