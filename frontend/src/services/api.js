import axios from "axios";
import { API_BASE_URL } from "./constants.js";

const api = axios.create({
    baseURL: API_BASE_URL,
});


// ======================================================
// Intelligence APIs
// ======================================================

export const analyzeArticle = async (title) => {
    const response = await api.post("/intelligence/analyze", {
        title,
    });

    return response.data;
};


// ======================================================
// Attention APIs
// ======================================================

export const analyzeAttention = async (title) => {
    const response = await api.post("/attention/analyze", {
        title,
    });

    return response.data;
};

export const analyzeAttentionBatch = async (titles) => {
    const response = await api.post("/attention/analyze/batch", {
        titles,
    });

    return response.data;
};

export const getLatestAttention = async () => {
    const response = await api.get("/attention/latest");

    return response.data;
};


// ======================================================
// Trend APIs
// ======================================================

export const analyzeTrends = async (
    previous_titles,
    current_titles
) => {
    const response = await api.post("/trends/analyze", {
        previous_titles,
        current_titles,
    });

    return response.data;
};

export const getLatestTrends = async () => {
    const response = await api.get("/trends/latest");

    return response.data;
};


// ======================================================
// Collector APIs
// ======================================================

export const collectNews = async () => {
    const response = await api.post("/collect");

    return response.data;
};


export default api;