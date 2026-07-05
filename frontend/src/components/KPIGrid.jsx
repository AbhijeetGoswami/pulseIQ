import StatCard from "./StatCard";

function KPIGrid({ dashboard }) {

    if (!dashboard) return null;

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
                gap: "20px",
                marginBottom: "30px",
            }}
        >

            <StatCard
                title="Collector Status"
                value={dashboard.collector.status}
                color="green"
            />

            <StatCard
                title="Articles"
                value={dashboard.articles.total}
            />

            <StatCard
                title="Today's Articles"
                value={dashboard.articles.today}
                color="#9333ea"
            />

            <StatCard
                title="Duplicate Rate"
                value={`${dashboard.collection.duplicate_rate}%`}
                color="#f59e0b"
            />

        </div>

    );

}

export default KPIGrid;