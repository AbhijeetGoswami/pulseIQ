import api from "./api";

export async function getAttentionSnapshot(titles) {
    const response = await api.post(
        "/attention/analyze/batch",
        {
            titles
        }
    );

    return response.data;
}