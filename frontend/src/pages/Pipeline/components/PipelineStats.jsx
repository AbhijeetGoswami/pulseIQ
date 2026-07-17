import "./PipelineStats.css";

const PipelineStats = ({ data }) => {
    return (
        <div className="pipeline-stats">

            {data.map((item) => (

                <div
                    key={item.title}
                    className="pipeline-stat-card"
                >

                    <div
                        className="stat-icon"
                        style={{ background: item.color }}
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