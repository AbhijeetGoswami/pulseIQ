import { useState } from "react";
import { FiAlertTriangle, FiCheckCircle, FiChevronDown, FiChevronUp, FiXCircle } from "react-icons/fi";

import "../../../components/dashboard/SummaryCards/SummaryCards.css";
import "./PipelineRuns.css";

const getStatusClass = (status) => ({ SUCCESS: "success", PARTIAL: "warning", FAILED: "failed" }[status?.toUpperCase()] || "");
const getStatusIcon = (status) => ({ SUCCESS: FiCheckCircle, PARTIAL: FiAlertTriangle, FAILED: FiXCircle }[status?.toUpperCase()] || FiCheckCircle);
const INITIAL_RUN_LIMIT = 5;

const PipelineRuns = ({ runs = [] }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasMoreRuns = runs.length > INITIAL_RUN_LIMIT;
    const visibleRuns = isExpanded ? runs : runs.slice(0, INITIAL_RUN_LIMIT);

    return (
        <section className="summary-section pipeline-runs-card">
        <div className="summary-section-heading">
            <div>
                <h2>Recent Pipeline Runs</h2>
                <p>Latest execution history.</p>
            </div>
        </div>

        <div id="pipeline-runs-list" className="runs-list">
            {runs.length === 0 ? (
                <div className="run-card run-card--empty">No pipeline runs available.</div>
            ) : visibleRuns.map((run, index) => {
                const StatusIcon = getStatusIcon(run.status);
                const statusClass = getStatusClass(run.status);

                return (
                    <article className="summary-card run-card" key={`${run.run_id}-${index}`}>
                        <div className={`summary-card-icon run-status-icon--${statusClass}`}><StatusIcon aria-hidden="true" /></div>
                        <div className="summary-card-content">
                            <div className="run-card-heading">
                                <div><p>Run #{run.run_id}</p><strong>{run.total_articles} articles</strong></div>
                                <span className={`run-status ${statusClass}`}>{run.status}</span>
                            </div>
                            <small>Started {run.started_at}</small>
                            <div className="run-details">
                                <div><small>Duration</small><strong>{run.duration_ms} ms</strong></div>
                                <div><small>Inserted</small><strong>{run.inserted}</strong></div>
                                <div><small>Duplicates</small><strong>{run.duplicates}</strong></div>
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>

        {hasMoreRuns && (
            <button
                className="pipeline-view-more"
                type="button"
                aria-controls="pipeline-runs-list"
                aria-expanded={isExpanded}
                onClick={() => setIsExpanded((expanded) => !expanded)}
            >
                {isExpanded ? <FiChevronUp aria-hidden="true" /> : <FiChevronDown aria-hidden="true" />}
                {isExpanded ? "Show less" : `View ${runs.length - INITIAL_RUN_LIMIT} more`}
            </button>
        )}
    </section>
    );
};

export default PipelineRuns;
