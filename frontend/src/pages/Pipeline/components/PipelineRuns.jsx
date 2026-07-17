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

        <div className="pipeline-runs-card">

            <div className="section-header">

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

                        <div
                            className="run-card"
                            key={`${run.run_id}-${index}`}
                        >

                            <div className="run-top">

                                <div>

                                    <h3>

                                        Run #{run.run_id}

                                    </h3>

                                    <span className="run-time">

                                        Started {run.started_at}

                                    </span>

                                </div>

                                <span
                                    className={`run-status ${getStatusClass(run.status)}`}
                                >

                                    {getStatusIcon(run.status)} {run.status}

                                </span>

                            </div>

                            <div className="run-details">

                                <div>

                                    <small>Duration</small>

                                    <strong>

                                        {run.duration_ms} ms

                                    </strong>

                                </div>

                                <div>

                                    <small>Articles</small>

                                    <strong>

                                        {run.total_articles}

                                    </strong>

                                </div>

                                <div>

                                    <small>Inserted</small>

                                    <strong>

                                        {run.inserted}

                                    </strong>

                                </div>

                                <div>

                                    <small>Duplicates</small>

                                    <strong>

                                        {run.duplicates}

                                    </strong>

                                </div>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

};

export default PipelineRuns;