import React from "react";

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

const PipelineFlow = () => {

    return (

        <div className="pipeline-flow-card">

            <div className="section-header">

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

                            <div className="pipeline-stage">

                                <div className="stage-icon">

                                    <Icon />

                                </div>

                                <h3>

                                    {stage.title}

                                </h3>

                                <span className="stage-status">

                                    {stage.status}

                                </span>

                                <div className="stage-divider" />

                                <div className="stage-metric">

                                    {stage.metric}

                                </div>

                                <small>

                                    {stage.duration}

                                </small>

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

        </div>

    );

};

export default PipelineFlow;