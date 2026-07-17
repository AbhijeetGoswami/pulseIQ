import "../../../components/dashboard/SummaryCards/SummaryCards.css";
import "./PipelineRuns.css";

const getStatusClass = (status) => {

    switch (status?.toUpperCase()) {

        case "SUCCESS":
            return "success";

        case "PARTIAL":
            return "warning";

        case "FAILED":
            return "failed";

        default:
            return "";

    }

};

const getStatusIcon = (status) => {

    switch (status?.toUpperCase()) {

        case "SUCCESS":
            return "✅";

        case "PARTIAL":
            return "⚠️";

        case "FAILED":
            return "❌";

        default:
            return "•";

    }

};

const PipelineRuns = ({ runs = [] }) => {

    return (

        <section className="summary-section pipeline-runs-card">

            <div className="summary-section-heading">

                <div>

                    <h2>Recent Pipeline Runs</h2>

                    <p>
                        Latest execution history.
                    </p>

                </div>

            </div>

            <div className="runs-list">

                {runs.length === 0 ? (

                    <div className="run-card">

                        <h3>No pipeline runs available.</h3>

                    </div>

                ) : (

                    runs.map((run, index) => (

                        <article
                            className="summary-card run-card"
                            key={`${run.run_id}-${index}`}
                        >
                            <div className="summary-card-icon">
                                <span className="run-status-icon">{getStatusIcon(run.status)}</span>
                            </div>
                            <div className="summary-card-content">
                                <p>Run #{run.run_id}</p>
                                <strong>{run.total_articles} articles</strong>
                                <small>Started {run.started_at}</small>
                                <span className={`run-status ${getStatusClass(run.status)}`}>
                                    {run.status}
                                </span>
                                <div className="run-details">
                                    <div>
                                        <small>Duration</small>
                                        <strong>{run.duration_ms} ms</strong>
                                    </div>
                                    <div>
                                        <small>Inserted</small>
                                        <strong>{run.inserted}</strong>
                                    </div>
                                    <div>
                                        <small>Duplicates</small>
                                        <strong>{run.duplicates}</strong>
                                    </div>
                                </div>
                            </div>
                        </article>

                    ))

                )}

            </div>

        </section>

    );

};

export default PipelineRuns;