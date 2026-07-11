import { useEffect, useState } from "react";
import { getLatestTrends } from "../services/trendService";

export default function useTrends() {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

   
    useEffect(() => {

        let mounted = true;

        async function load() {

            try {

                const response = await getLatestTrends();

                if (!mounted) return;

                setData(response);

                setError(null);

            } catch (err) {

                if (!mounted) return;

                console.error(err);

                setError(err);

            } finally {

                if (mounted) {

                    setLoading(false);

                }

            }

        }

        load();

        const interval = setInterval(() => {

            load();

        }, 60000);

        return () => {

            mounted = false;

            clearInterval(interval);

        };

    }, []);
    
    return {

        data,

        loading,

        error

    };

}