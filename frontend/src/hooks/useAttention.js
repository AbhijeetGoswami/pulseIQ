import { useEffect, useState } from "react";
import { getLatestAttention } from "../services/attentionService";

export default function useAttention() {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {

        async function load() {

            try {

                const response =
                    await getLatestAttention();

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