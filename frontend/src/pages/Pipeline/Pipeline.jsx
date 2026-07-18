import { useEffect, useState } from "react";
import { FiActivity, FiGitBranch, FiPlay, FiRefreshCw } from "react-icons/fi";

import "../../components/dashboard/SummaryCards/SummaryCards.css";
import "./Pipeline.css";
import { getPipelineDashboard, runPipeline as runPipelineApi } from "../../services/api";
import Loader from "../../components/Loader/Loader";
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
        const loadTimer = window.setTimeout(() => {
            loadDashboard();
        }, 0);

        return () => window.clearTimeout(loadTimer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="pipeline-page">
                <div className="pipeline-loading-card">
                    <div>
                        <h2>Pipeline data is unavailable</h2>
                        <p>{error}</p>
                    </div>
                    <button className="primary-btn" onClick={loadDashboard}><FiRefreshCw aria-hidden="true" /> Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="pipeline-page">
            <section className="summary-section pipeline-hero" aria-labelledby="pipeline-title">
                <div className="summary-section-heading pipeline-hero-heading">
                    <div className="pipeline-hero-copy">
                        <p className="pipeline-eyebrow"><i aria-hidden="true" /> Live operations</p>
                        <h1 id="pipeline-title"><FiGitBranch aria-hidden="true" /> Pipeline Operations</h1>
                        <span className="pipeline-hero-description">Monitor data flow, source health, and the latest intelligence deliveries.</span>
                    </div>

                    <div className="pipeline-hero-controls">
                        <div className="pipeline-hero-meta" aria-label="Pipeline monitoring status">
                            <FiActivity aria-hidden="true" />
                            <span>Monitoring active</span>
                        </div>

                        <div className="pipeline-actions">
                            <button className="primary-btn" disabled={running} onClick={handleRunPipeline}>
                                <FiPlay aria-hidden="true" />
                                {running ? "Running pipeline" : "Run pipeline"}
                            </button>
                            <button className="secondary-btn" disabled={loading || running} onClick={loadDashboard}>
                                <FiRefreshCw aria-hidden="true" /> Refresh
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <PipelineStats data={dashboard?.stats ?? {}} />
            <PipelineFlow />

            <div className="pipeline-grid">
                <SourceHealth sources={dashboard?.sources ?? []} />
                <PipelineRuns runs={dashboard?.runs ?? []} />
            </div>

            <PipelineLogs logs={dashboard?.logs ?? []} />
        </div>
    );
};

export default Pipeline;
