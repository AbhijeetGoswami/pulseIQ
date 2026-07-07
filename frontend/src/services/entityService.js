import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api/entities";

export const getTopEntities = async (limit = 10) => {
    const response = await axios.get(`${API_BASE}/top`, {
        params: { limit }
    });

    return response.data;
};

export const getArticleEntities = async (articleId) => {
    const response = await axios.get(
        `${API_BASE}/article/${articleId}`
    );

    return response.data;
};

export const getEntityArticles = async (entityId) => {
    const response = await axios.get(
        `${API_BASE}/lookup/${entityId}`
    );

    return response.data;
};

export const searchEntities = async (text) => {
    const response = await axios.get(
        `${API_BASE}/search/${text}`
    );

    return response.data;
};