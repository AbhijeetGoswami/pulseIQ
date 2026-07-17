import {
    FiDatabase,
    FiFileText,
    FiRefreshCw,
    FiClock,
    FiCheckCircle,
    FiArrowUpRight,
} from "react-icons/fi";

import "../../../components/dashboard/SummaryCards/SummaryCards.css";
import "./PipelineStats.css";

const PipelineStats = ({ data }) => {
    if (!data) {
        return null;
    }

    const stats = [
        {
            title: "Sources",
            value: data.sources ?? 0,
            detail: "Configured ingestion sources",
            movement: `${data.sources ?? 0} sources active`,
            icon: <FiDatabase aria-hidden="true" />,
            tone: "blue",
        },
        {
            title: "Articles Today",
            value: data.articles ?? 0,
            detail: "Articles processed by the pipeline",
            movement: `${data.articles ?? 0} processed today`,
            icon: <FiFileText aria-hidden="true" />,
            tone: "teal",
        },
        {
            title: "Runs Today",
            value: data.runs_today ?? 0,
            detail: "Pipeline executions completed",
            movement: `${data.runs_today ?? 0} runs today`,
            icon: <FiRefreshCw aria-hidden="true" />,
            tone: "amber",
        },
        {
            title: "Avg Runtime",
            value: data.avg_runtime != null ? `${data.avg_runtime} ms` : "—",
            detail: "Average execution duration",
            movement: data.avg_runtime != null ? `~${data.avg_runtime} ms per run` : "No runtime data",
            icon: <FiClock aria-hidden="true" />,
            tone: "violet",
        },
        {
            title: "Success Rate",
            value: data.success_rate != null ? `${data.success_rate}%` : "—",
            detail: "Successful pipeline run ratio",
            movement: data.success_rate != null ? `${data.success_rate}% stable` : "No success data",
            icon: <FiCheckCircle aria-hidden="true" />,
            tone: "blue",
        },
    ];

    return (
        <section className="summary-section pipeline-summary" aria-label="Pipeline summary cards">
            <div className="summary-grid">

            {stats.map((item) => (
                <article key={item.title} className={`summary-card summary-card--${item.tone}`}>
                    <div className="summary-card-icon">{item.icon}</div>
                    <div className="summary-card-content">
                        <p>{item.title}</p>
                        <strong>{typeof item.value === "number" ? item.value.toLocaleString() : item.value}</strong>
                        <small>{item.detail}</small>
                        <span className="summary-card-movement">
                            <FiArrowUpRight aria-hidden="true" /> {item.movement}
                        </span>
                    </div>
                </article>
            ))}

            </div>
        </section>

    );

};

export default PipelineStats;