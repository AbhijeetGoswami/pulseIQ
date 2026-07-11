import api from "./api";

export async function getLatestAttention() {

    const response = await api.get(
        "/attention/latest"
    );

    return response.data;
}