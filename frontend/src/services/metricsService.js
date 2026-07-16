import api from "./api";

export async function getTopSources(limit = 5) {
    const response = await api.get("/metrics/sources", { params: { limit } });
    return response.data.sources || [];
}
