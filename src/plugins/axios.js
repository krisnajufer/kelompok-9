import axios from "axios";
import { getCookies, delCookies } from "./cookies";

axios.defaults.headers['Content-Type'] = 'Application/json';

const hostname = import.meta.env.VITE_BASE_API_URL;

const baseApi = axios.create({
    baseURL: hostname,
});



baseApi.interceptors.request.use(
    (config) => {
        const token = getCookies('CERT');
        if (token) config.headers['Authorization'] = `Bearer ${token}`;
        else {
            delCookies('CERT');
            delete config.headers['Authorization'];
        }

        return config;
    },
    (error) => {
        throw error;
    },
);

baseApi.interceptors.response.use(
    (response) => response.data,
    (error) => {
        switch (error.response) {
            case 401:
                delCookies('CERT');
                break;

            default:
                break;
        }
        throw error?.response?.data ?? error?.response?.message ?? error;
    },
);

export { baseApi };