import api from "./api";

export async function getTrendSnapshot(previousTitles, currentTitles) {

    const response = await api.post(
        "/trends/analyze",
        {
            previous_titles: previousTitles,
            current_titles: currentTitles
        }
    );

    return response.data;
}