import ReportSection from "../../../common/ReportSection";
import "./AIAnalysisCard.css";

export default function AIAnalysisCard({
    entity,
    articles,
    sourceCounts,
    formatNumber,
}) {

    const topSource = sourceCounts[0];

    const summary = `
${entity.value} generated ${formatNumber(entity.mentions)} mentions in the latest attention snapshot,
resulting in an attention score of ${Math.round(entity.attention_score ?? 0)}.

Coverage currently spans ${articles.length} tracked articles${
        topSource ? `, with ${topSource.source} contributing the highest volume.` : "."
    }
`;

    return (
        <ReportSection
            title="AI Attention Analysis"
            description="Executive summary generated from the latest attention snapshot."
        >

            <p className="ai-analysis-text">
                {summary}
            </p>

        </ReportSection>
    );
}