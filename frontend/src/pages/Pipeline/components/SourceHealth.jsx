import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import "../../../components/dashboard/SummaryCards/SummaryCards.css";
import "./SourceHealth.css";

const INITIAL_SOURCE_LIMIT = 10;

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
    const [isExpanded, setIsExpanded] = useState(false);
    const hasMoreSources = sources.length > INITIAL_SOURCE_LIMIT;
    const visibleSources = isExpanded ? sources : sources.slice(0, INITIAL_SOURCE_LIMIT);

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

            <div id="source-health-list" className={`source-list${sources.length ? " source-list--populated" : ""}`}>

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

                    visibleSources.map((source, index) => (

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

            {hasMoreSources && (
                <button
                    className="pipeline-view-more"
                    type="button"
                    aria-controls="source-health-list"
                    aria-expanded={isExpanded}
                    onClick={() => setIsExpanded((expanded) => !expanded)}
                >
                    {isExpanded ? <FiChevronUp aria-hidden="true" /> : <FiChevronDown aria-hidden="true" />}
                    {isExpanded ? "Show less" : `View ${sources.length - INITIAL_SOURCE_LIMIT} more`}
                </button>
            )}

        </section>

    );

};

export default SourceHealth;
