import React from "react";

import "../../../components/dashboard/SummaryCards/SummaryCards.css";
import "./PipelineFlow.css";

import {
    FiRss,
    FiDownloadCloud,
    FiCpu,
    FiActivity,
    FiTrendingUp,
    FiDatabase,
    FiMonitor,
} from "react-icons/fi";

const stages = [
    {
        title: "RSS Sources",
        icon: FiRss,
        status: "Online",
        metric: "18 Sources",
        duration: "Live",
    },
    {
        title: "Collector",
        icon: FiDownloadCloud,
        status: "Success",
        metric: "342 Articles",
        duration: "8 sec",
    },
    {
        title: "Intelligence",
        icon: FiCpu,
        status: "Success",
        metric: "97 Entities",
        duration: "3 sec",
    },
    {
        title: "Attention",
        icon: FiActivity,
        status: "Success",
        metric: "31 Signals",
        duration: "1 sec",
    },
    {
        title: "Trend Engine",
        icon: FiTrendingUp,
        status: "Success",
        metric: "12 Trends",
        duration: "1 sec",
    },
    {
        title: "Snapshot Store",
        icon: FiDatabase,
        status: "Healthy",
        metric: "2 Snapshots",
        duration: "Ready",
    },
    {
        title: "Dashboard APIs",
        icon: FiMonitor,
        status: "Serving",
        metric: "6 APIs",
        duration: "<100 ms",
    },
];

const getStageStatusClass = (status) => {
    switch ((status || "").toLowerCase()) {
        case "online":
        case "serving":
            return "online";
        case "healthy":
        case "success":
            return "success";
        case "warning":
            return "warning";
        case "error":
        case "failed":
            return "failed";
        default:
            return "";
    }
};

const PipelineFlow = () => {

    return (

        <section className="summary-section pipeline-flow-card">

            <div className="summary-section-heading">

                <div>

                    <h2>
                        Continuous Intelligence Pipeline
                    </h2>

                    <p>
                        Live execution path from ingestion to dashboard delivery.
                    </p>

                </div>

            </div>

            <div className="pipeline-track">

                {stages.map((stage, index) => {

                    const Icon = stage.icon;

                    return (

                        <React.Fragment
                            key={stage.title}
                        >

                            <div className="summary-card pipeline-stage">
                                <div className="summary-card-icon">
                                    <Icon />
                                </div>
                                <div className="summary-card-content">
                                    <p>{stage.title}</p>
                                    <strong>{stage.metric}</strong>
                                    <small>{stage.duration}</small>
                                    <span className={`stage-status ${getStageStatusClass(stage.status)}`}>{stage.status}</span>
                                </div>
                            </div>

                            {index < stages.length - 1 && (

                                <div className="pipeline-connector">

                                    <div className="connector-line" />

                                    <div className="connector-dot" />

                                </div>

                            )}

                        </React.Fragment>

                    );

                })}

            </div>

        </section>

    );

};

export default PipelineFlow;