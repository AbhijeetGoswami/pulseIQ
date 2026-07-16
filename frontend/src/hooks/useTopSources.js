import { useEffect, useState } from "react";
import { getTopSources } from "../services/metricsService";

export default function useTopSources() {
    const [sources, setSources] = useState([]);

    useEffect(() => {
        let mounted = true;

        getTopSources()
            .then((data) => { if (mounted) setSources(data); })
            .catch((error) => console.error("Unable to load top sources", error));

        return () => { mounted = false; };
    }, []);

    return sources;
}
