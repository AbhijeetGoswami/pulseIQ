import api from "./api";

export async function getLatestTrends() {

    const response = await api.get(
        "/trends/latest"
    );

    return response.data;
}