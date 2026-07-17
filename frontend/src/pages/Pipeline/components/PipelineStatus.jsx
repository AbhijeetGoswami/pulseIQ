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

    return (

        <div className="pipeline-overview">

            <div className="overview-left">

                <div className="overview-title">

                    <FiCheckCircle />

                    <div>

                        <h2>System Operational</h2>

                        <p>
                            Continuous Intelligence Pipeline is running normally.
                        </p>

                    </div>

                </div>

            </div>

            <div className="overview-right">

                <div className="overview-item">

                    <FiClock />

                    <div>

                        <span>Last Run</span>

                        <strong>{data.lastRun}</strong>

                    </div>

                </div>

                <div className="overview-item">

                    <FiRefreshCw />

                    <div>

                        <span>Next Run</span>

                        <strong>{data.nextRun}</strong>

                    </div>

                </div>

                <div className="overview-item">

                    <FiServer />

                    <div>

                        <span>Scheduler</span>

                        <strong>{data.scheduler}</strong>

                    </div>

                </div>

                <div className="overview-item">

                    <FiActivity />

                    <div>

                        <span>Auto Refresh</span>

                        <strong>{data.autoRefresh}</strong>

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