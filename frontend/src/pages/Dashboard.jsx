import useDashboard from "../hooks/useDashboard";
import KPIGrid from "../components/KPIGrid";
import LatestArticles from "../components/LatestArticles";
import Loader from "../components/Loader";
import ErrorCard from "../components/ErrorCard";

function Dashboard() {

    const {
        dashboard,
        loading,
        error,
    } = useDashboard();

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorCard error={error} />;
    }

    return (

        <div
            style={{
                maxWidth: "1400px",
                margin: "40px auto",
                padding: "20px",
            }}
        >

            <h1>PulseIQ Dashboard</h1>
        <KPIGrid dashboard={dashboard} />
        <LatestArticles
      articles={dashboard.latest_articles}
       />
        </div>

    );

}

export default Dashboard;