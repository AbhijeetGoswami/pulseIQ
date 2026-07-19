import { useMemo, useState } from "react";
import ReportSection from "../../../common/ReportSection";

export default function KeyEvidence({
    reasons,
    sourceCounts,
    formatNumber,
}) {
    const [expanded, setExpanded] = useState(false);

    const visibleReasons = useMemo(
        () => (expanded ? reasons : reasons.slice(0, 2)),
        [expanded, reasons],
    );

    const visibleSources = useMemo(
        () => (expanded ? sourceCounts : sourceCounts.slice(0, 2)),
        [expanded, sourceCounts],
    );

    return (
        <ReportSection
            title="Key Evidence"
            description="Signals contributing to today's attention."
            actions={
                <button
                    type="button"
                    className="report-section-expand-button"
                    onClick={() => setExpanded((value) => !value)}
                >
                    {expanded ? "Collapse" : "Expand"}
                </button>
            }
        >

            <h4>Why Attention?</h4>

            <ul className="evidence-list">
                {visibleReasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                ))}
            </ul>

            <h4>Top Sources</h4>

            <ul className="evidence-list">
                {visibleSources.map((source) => (
                    <li key={source.source}>
                        {source.source}
                        {" "}
                        ({formatNumber(source.count)})
                    </li>
                ))}
            </ul>

            {!expanded && (reasons.length > visibleReasons.length || sourceCounts.length > visibleSources.length) && (
                <p className="report-section-summary">
                    Showing a summary view. Expand to see more signals and sources.
                </p>
            )}

        </ReportSection>
    );
}