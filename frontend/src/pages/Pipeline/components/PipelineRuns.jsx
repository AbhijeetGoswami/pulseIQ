import "./PipelineRuns.css";

const getStatusClass = (status) => {
    switch (status) {
        case "Success":
            return "success";

        case "Partial":
            return "warning";

        case "Failed":
            return "failed";

        default:
            return "";
    }
};

const getStatusIcon = (status) => {
    switch (status) {
        case "Success":
            return "✅";

        case "Partial":
            return "⚠";

        case "Failed":
            return "❌";

        default:
            return "•";
    }
};

const PipelineRuns = ({ runs }) => {
    return (
        <div className="pipeline-runs-card">

            <div className="section-header">
                <h2>Recent Pipeline Runs</h2>
                <p>Latest execution history.</p>
            </div>

            <div className="runs-list">

                {runs.map((run) => (

                    <div
                        className="run-card"
                        key={run.id}
                    >

                        <div className="run-top">

                            <div>

                                <h3>Run #{run.id}</h3>

                                <span className="run-time">
                                    Started {run.started}
                                </span>

                            </div>

                            <span className={`run-status ${getStatusClass(run.status)}`}>
                                {getStatusIcon(run.status)} {run.status}
                            </span>

                        </div>

                        <div className="run-details">

                            <div>
                                <small>Duration</small>
                                <strong>{run.duration}</strong>
                            </div>

                            <div>
                                <small>Articles</small>
                                <strong>{run.articles}</strong>
                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default PipelineRuns;