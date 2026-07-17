import "./PipelineLogs.css";

const PipelineLogs = ({ logs }) => {
    return (
        <div className="pipeline-logs-card">

            <div className="section-header">

                <div>
                    <h2>Pipeline Logs</h2>
                    <p>Latest execution logs from the pipeline.</p>
                </div>

                <button className="clear-log-btn">
                    Clear
                </button>

            </div>

            <div className="logs-terminal">

                {logs.map((log, index) => (

                    <div
                        className="log-line"
                        key={index}
                    >
                        <span className="prompt">$</span>

                        <span className="log-text">
                            {log}
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default PipelineLogs;