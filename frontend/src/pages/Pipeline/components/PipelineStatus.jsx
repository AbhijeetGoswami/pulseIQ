import "./PipelineStatus.css";

import {
    FiCheckCircle,
    FiClock,
    FiActivity,
    FiRefreshCw,
    FiServer,
    FiTrendingUp
} from "react-icons/fi";

const PipelineStatus = ({ data }) => {
    const statusLabel = data?.status || "Operational";
    const lastRun = data?.lastRun ?? data?.last_run;
    const nextRun = data?.nextRun ?? data?.next_run;
    const scheduler = data?.scheduler;
    const autoRefresh = data?.autoRefresh ?? data?.auto_refresh;

    return (
        <div className="pipeline-overview">
            <div className="overview-left">
                <div className="overview-title">
                    <FiCheckCircle />
                    <div>
                        <h2>{statusLabel}</h2>
                        <p>Continuous Intelligence Pipeline is running normally.</p>
                    </div>
                </div>
            </div>
            <div className="overview-right">

                <div className="overview-item">
                    <FiClock />
                    <div>
                        <span>Last Run</span>
                        <strong>{lastRun ?? "—"}</strong>
                    </div>
                </div>

                <div className="overview-item">

                    <FiRefreshCw />

                    <div>
                        <span>Next Run</span>
                        <strong>{nextRun ?? "—"}</strong>
                    </div>
                </div>

                <div className="overview-item">

                    <FiServer />

                    <div>
                        <span>Scheduler</span>
                        <strong>{scheduler ?? "—"}</strong>
                    </div>
                </div>

                <div className="overview-item">

                    <FiActivity />

                    <div>
                        <span>Auto Refresh</span>
                        <strong>{autoRefresh ?? "—"}</strong>
                    </div>
                </div>

                <div className="overview-item">

                    <FiTrendingUp />

                    <div>

                        <span>Success Rate</span>

                        <strong>99.8%</strong>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default PipelineStatus;