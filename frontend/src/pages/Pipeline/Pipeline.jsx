import "./Pipeline.css";

import PipelineStatus from "./components/PipelineStatus";
import PipelineStats from "./components/PipelineStats";
import PipelineFlow from "./components/PipelineFlow";
import SourceHealth from "./components/SourceHealth";
import PipelineRuns from "./components/PipelineRuns";
import PipelineLogs from "./components/PipelineLogs";

import {
    pipelineStatus,
    pipelineStats,
    sourceHealth,
    pipelineRuns,
    pipelineLogs,
} from "./data/mockPipelineData";

const Pipeline = () => {
    return (
        <div className="pipeline-page">

            {/* Header */}

            <div className="pipeline-header">

                <div>
                    <h1>Pipeline Operations</h1>
                    <p>
                        Monitor and manage the Continuous Intelligence Pipeline.
                    </p>
                </div>

                <div className="pipeline-actions">

                    <button className="primary-btn">
                        ▶ Run Pipeline
                    </button>

                    <button className="secondary-btn">
                        ↻ Refresh
                    </button>

                </div>

            </div>

            <PipelineStatus data={pipelineStatus} />

            <PipelineStats data={pipelineStats} />

            <PipelineFlow />

            <div className="pipeline-grid">

                <SourceHealth
                    sources={sourceHealth}
                />

                <PipelineRuns
                    runs={pipelineRuns}
                />

            </div>

            <PipelineLogs
                logs={pipelineLogs}
            />

        </div>
    );
};

export default Pipeline;