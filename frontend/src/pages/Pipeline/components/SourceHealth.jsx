import "../../../components/dashboard/SummaryCards/SummaryCards.css";
import "./SourceHealth.css";

const getStatusClass = (status) => {

    switch (status?.toLowerCase()) {

        case "healthy":
        case "online":
        case "success":
            return "healthy";

        case "warning":
            return "warning";

        case "failed":
        case "offline":
        case "error":
            return "failed";

        default:
            return "";
    }

};

const SourceHealth = ({ sources = [] }) => {

    return (

        <section className="summary-section source-health-card">

            <div className="summary-section-heading">

                <div>

                    <h2>Source Health</h2>

                    <p>
                        Current status of configured ingestion sources.
                    </p>

                </div>

            </div>

            <div className="source-list">

                <div className="table-header">

                    <span>Source</span>
                    <span>Status</span>
                    <span>Articles</span>
                    <span>Last Success</span>

                </div>

                {sources.length === 0 ? (

                    <div className="summary-card source-row no-data">

                        <span>No sources found.</span>

                    </div>

                ) : (

                    sources.map((source, index) => (

                        <div
                            className="summary-card source-row"
                            key={`${source.source}-${source.status}-${index}`}
                        >

                            <span className="source-name">

                                {source.source}

                            </span>

                            <span
                                className={`status-pill ${getStatusClass(
                                    source.status
                                )}`}
                            >

                                {source.status}

                            </span>

                            <span>

                                {source.articles}

                            </span>

                            <span className="last-success">

                                {source.last_success || "N/A"}

                            </span>

                        </div>

                    ))

                )}

            </div>

        </section>

    );

};

export default SourceHealth;