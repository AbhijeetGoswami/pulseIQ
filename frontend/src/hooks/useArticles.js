import { useEffect, useState } from "react";
import api from "../services/api";

function useArticles(page = 1, limit = 20) {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        setLoading(true);

        api.get("/api/articles", {
            params: {
                page,
                limit,
            },
        })
        .then((res) => {
            setArticles(res.data);
            setError(null);
        })
        .catch((err) => {
            console.error(err);
            setError(err);
        })
        .finally(() => {
            setLoading(false);
        });

    }, [page, limit]);

    return {
        articles,
        loading,
        error,
    };

}

export default useArticles;