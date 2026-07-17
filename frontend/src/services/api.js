import axios from "axios";
import { API_BASE_URL } from "./constants";

const api = axios.create({

    baseURL: API_BASE_URL,

    headers: {

        "Content-Type": "application/json"

    }

});


/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("access_token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

);


/*
|--------------------------------------------------------------------------
| Response Interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("access_token");

            window.location.href = "/login";

        }

        return Promise.reject(error);

    }

);


/*
|--------------------------------------------------------------------------
| Pipeline APIs
|--------------------------------------------------------------------------
*/

export const getPipelineDashboard = async () => {

    const response = await api.get(
        "/pipeline/dashboard"
    );

    return response.data;

};


export const getPipelineStatus = async () => {

    const response = await api.get(
        "/pipeline/status"
    );

    return response.data;

};


export const getPipelineRuns = async (limit = 10) => {

    const response = await api.get(
        "/pipeline/runs",
        {
            params: {
                limit,
            },
        }
    );

    return response.data;

};


export const getPipelineSources = async () => {

    const response = await api.get(
        "/pipeline/sources"
    );

    return response.data;

};


export const getPipelineLogs = async (limit = 25) => {

    const response = await api.get(
        "/pipeline/logs",
        {
            params: {
                limit,
            },
        }
    );

    return response.data;

};


/*
|--------------------------------------------------------------------------
| Pipeline Actions
|--------------------------------------------------------------------------
*/

export const runPipeline = async () => {

    const response = await api.post(
        "/pipeline/run"
    );

    return response.data;

};


export default api;