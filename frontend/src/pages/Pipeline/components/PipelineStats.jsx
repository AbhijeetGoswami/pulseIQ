import {
    FiDatabase,
    FiFileText,
    FiRefreshCw,
    FiClock,
    FiCheckCircle,
} from "react-icons/fi";

import "./PipelineStats.css";

const PipelineStats = ({ data }) => {

    if (!data) {

        return null;

    }

    const stats = [

        {
            title: "Sources",
            value: data.sources,
            color: "#2563eb",
            icon: <FiDatabase />,
        },

        {
            title: "Articles Today",
            value: data.articles,
            color: "#10b981",
            icon: <FiFileText />,
        },

        {
            title: "Runs Today",
            value: data.runs_today,
            color: "#f59e0b",
            icon: <FiRefreshCw />,
        },

        {
            title: "Avg Runtime",
            value: `${data.avg_runtime} ms`,
            color: "#8b5cf6",
            icon: <FiClock />,
        },

        {
            title: "Success Rate",
            value: `${data.success_rate}%`,
            color: "#06b6d4",
            icon: <FiCheckCircle />,
        },

    ];

    return (

        <div className="pipeline-stats">

            {stats.map((item) => (

                <div
                    key={item.title}
                    className="pipeline-stat-card"
                >

                    <div
                        className="stat-icon"
                        style={{
                            background: item.color,
                        }}
                    >
                        {item.icon}
                    </div>

                    <div className="stat-content">

                        <span className="stat-title">
                            {item.title}
                        </span>

                        <h2 className="stat-value">
                            {item.value}
                        </h2>

                    </div>

                </div>

            ))}

        </div>

    );

};

export default PipelineStats;