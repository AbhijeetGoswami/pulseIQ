import { useEffect, useState } from "react";
import api from "../services/api";

function useDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const REFRESH_INTERVAL = 30000;

    useEffect(() => {

        const fetchDashboard = () => {

            api.get("/api/dashboard")
                .then((res) => {
                    setDashboard(res.data);
                    setError(null);
                })
                .catch((err) => {
                    console.error(err);
                    setError(err);
                })
                .finally(() => {
                    setLoading(false);
                });

        };

        // Initial fetch
        fetchDashboard();

        // Refresh every 30 seconds
        const interval = setInterval(fetchDashboard, REFRESH_INTERVAL);

        // Cleanup when component unmounts
        return () => clearInterval(interval);

    }, []);

    return {
        dashboard,
        loading,
        error,
    };
}

export default useDashboard;