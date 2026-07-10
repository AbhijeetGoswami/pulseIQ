import { useEffect, useState } from "react";
import { getTrendSnapshot } from "../services/trendService";

const PREVIOUS = [
    "Lionel Messi scores against Brazil",
    "Lionel Messi wins Ballon d'Or",
    "Stephen Curry scores for the Golden State Warriors",
    "Scottie Scheffler wins The Masters"
];

const CURRENT = [
    "Lionel Messi scores against Brazil",
    "Lionel Messi wins Ballon d'Or",
    "Lionel Messi captains Argentina",
    "Lionel Messi leads Argentina to victory",
    "Stephen Curry scores for the Golden State Warriors",
    "Carlos Alcaraz reaches Wimbledon final"
];

export default function useTrends() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function load() {

            try {

                const response =
                    await getTrendSnapshot(
                        PREVIOUS,
                        CURRENT
                    );

                setData(response);

            } catch (err) {

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