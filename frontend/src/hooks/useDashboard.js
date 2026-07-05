import { useEffect, useState } from "react";
import api from "../services/api";

function useDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        api.get("/api/dashboard")
            .then((res) => {
                setDashboard(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);

    return {
        dashboard,
        loading,
        error,
    };
}

export default useDashboard;