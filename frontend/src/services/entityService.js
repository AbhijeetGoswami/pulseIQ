import axios from "axios";
import { API_BASE_URL } from "./constants.js";

const API_BASE = `${API_BASE_URL}/entities`;

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

// export const getEntityArticles = async (entityId) => {
//     const response = await axios.get(
//         `${API_BASE}/lookup/${entityId}`
//     );

//     return response.data;
// };

export const searchEntities = async (text) => {

    if (!text.trim()) {
        return getTopEntities();
    }

    const response = await axios.get(
        `${API_BASE}/search/${text}`
    );

    // return response.data;
    return response.data.map(entity => ({

            id: entity.entity_id,

            value: entity.display_name,

            type: entity.entity_type,

            sport: entity.sport,

            mentions: entity.mentions,

            ...entity

        }));
};

export const getEntityArticles = async (entityId) => {

    const response = await axios.get(
        `${API_BASE}/lookup/${entityId}`
    );

    // return response.data;
    return response.data.map(entity => ({

            id: entity.entity_id,

            value: entity.display_name,

            type: entity.entity_type,

            sport: entity.sport,

            mentions: entity.mentions,

            ...entity

        }));

};