import "./SourceHealth.css";

const getStatusClass = (status) => {
    switch (status) {
        case "Healthy":
            return "healthy";

        case "Warning":
            return "warning";

        case "Failed":
            return "failed";

        default:
            return "";
    }
};

const SourceHealth = ({ sources }) => {
    return (
        <div className="source-health-card">

            <div className="section-header">
                <h2>Source Health</h2>
                <p>Current status of configured ingestion sources.</p>
            </div>

            <div className="source-table">

                <div className="table-header">

                    <span>Source</span>
                    <span>Status</span>
                    <span>Articles</span>
                    <span>Last Success</span>

                </div>

                {sources.map((source) => (

                    <div
                        className="table-row"
                        key={source.source}
                    >

                        <span className="source-name">
                            {source.source}
                        </span>

                        <span className={`status-pill ${getStatusClass(source.status)}`}>
                            {source.status}
                        </span>

                        <span>
                            {source.articles}
                        </span>

                        <span className="last-success">
                            {source.lastSuccess}
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default SourceHealth;