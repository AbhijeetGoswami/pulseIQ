import { useEffect, useState } from "react";
import { getAttentionSnapshot } from "../services/attentionService";

const SAMPLE_ARTICLES = [
    "Lionel Messi scores against Brazil",
    "Lionel Messi wins Ballon d'Or",
    "Lionel Messi captains Argentina",
    "Stephen Curry scores for the Golden State Warriors",
    "Scottie Scheffler wins The Masters",
    "Carlos Alcaraz reaches Wimbledon final"
];

export default function useAttention() {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {

        async function load() {

            try {

                const response =
                    await getAttentionSnapshot(
                        SAMPLE_ARTICLES
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