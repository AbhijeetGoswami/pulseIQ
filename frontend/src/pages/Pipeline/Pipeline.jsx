import { useEffect, useState } from "react";

import "./Pipeline.css";

import {
    getPipelineDashboard,
    runPipeline as runPipelineApi,
} from "../../services/api";

import PipelineStats from "./components/PipelineStats";
import PipelineFlow from "./components/PipelineFlow";
import SourceHealth from "./components/SourceHealth";
import PipelineRuns from "./components/PipelineRuns";
import PipelineLogs from "./components/PipelineLogs";

const Pipeline = () => {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [running, setRunning] = useState(false);
    const [error, setError] = useState(null);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const response = await getPipelineDashboard();

            setDashboard(response);

            setError(null);

        } catch (err) {

            console.error(err);

            setError("Unable to load Pipeline Dashboard.");

        } finally {

            setLoading(false);

        }

    };

    const handleRunPipeline = async () => {

        try {

            setRunning(true);

            await runPipelineApi();

            await loadDashboard();

        } catch (err) {

            console.error(err);

            alert("Pipeline execution failed.");

        } finally {

            setRunning(false);

        }

    };

    useEffect(() => {
        loadDashboard();
    }, []);

    const shouldShowPipelineStatus = Boolean(
        dashboard?.status &&
        (dashboard.status.lastRun || dashboard.status.last_run)
    );

    if (loading) {
        return (
            <div className="pipeline-page">
                <div className="pipeline-loading-card">
                    <h2>Loading Pipeline Dashboard...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="pipeline-page">
                <div className="pipeline-loading-card">
                    <h2>{error}</h2>
                    <button className="primary-btn" onClick={loadDashboard}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (

        <div className="pipeline-page">

            <div className="pipeline-header">

                <div>

                    <h1>Pipeline Operations</h1>

                    <p>
                        Monitor and manage the Continuous Intelligence Pipeline.
                    </p>

                </div>

                <div className="pipeline-actions">

                    <button
                        className="primary-btn"
                        disabled={running}
                        onClick={handleRunPipeline}
                    >
                        {running
                            ? "Running..."
                            : "▶ Run Pipeline"}
                    </button>

                    <button
                        className="secondary-btn"
                        disabled={loading || running}
                        onClick={loadDashboard}
                    >
                        ↻ Refresh
                    </button>

                </div>

            </div>

            <PipelineStats
                data={dashboard?.stats ?? {}}
            />

            <PipelineFlow />

            <div className="pipeline-grid">

                <SourceHealth
                    sources={dashboard?.sources ?? []}
                />

                <PipelineRuns
                    runs={dashboard?.runs ?? []}
                />

            </div>

            <PipelineLogs
                logs={dashboard?.logs ?? []}
            />

        </div>

    );

};

export default Pipeline;