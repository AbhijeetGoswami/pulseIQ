import "../../../components/dashboard/SummaryCards/SummaryCards.css";
import "./PipelineLogs.css";

const PipelineLogs = ({ logs = [] }) => {

    return (

        <section className="summary-section pipeline-logs-card">

            <div className="summary-section-heading">

                <div>

                    <h2>Pipeline Logs</h2>

                    <p>
                        Latest execution logs from the pipeline.
                    </p>

                </div>

                <button className="clear-log-btn">
                    Clear
                </button>

            </div>

            <div className="logs-terminal">

                {logs.length === 0 ? (

                    <div className="log-line">

                        <span className="log-text">
                            No pipeline logs available.
                        </span>

                    </div>

                ) : (

                    logs.map((log, index) => (

                        <div
                            className="log-line"
                            key={`${log.timestamp}-${index}`}
                        >

                            <span className="prompt">$</span>

                            <span className="log-text">

                                <strong>[{log.level}]</strong>{" "}

                                {log.timestamp}{" - "}

                                {log.message}

                            </span>

                        </div>

                    ))

                )}

            </div>

        </section>

    );

};

export default PipelineLogs;