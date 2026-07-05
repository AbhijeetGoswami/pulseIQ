import useDashboard from "../hooks/useDashboard";
import KPIGrid from "../components/KPIGrid";

function Dashboard() {

    const {
        dashboard,
        loading,
        error,
    } = useDashboard();

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Error loading dashboard.</h2>;
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
        </div>

    );

}

export default Dashboard;