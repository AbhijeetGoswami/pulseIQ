import { useEffect, useState } from "react";
import { getLatestTrends } from "../services/trendService";

export default function useTrends() {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {

        async function load() {

            try {

                const response =
                    await getLatestTrends();

                setData(response);

            } catch (err) {

                console.error(err);

                setError(err);

            } finally {

                setLoading(false);

            }

        }

        load();

    }, []);

    return {

        data,

        loading,

        error

    };

}