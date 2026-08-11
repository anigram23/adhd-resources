import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL

const http = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

http.interceptors.response.use(
    (response) => response,
    (error) => {
        const formattedError = {
            status: error?.response?.status || 500,
            message: error?.response?.data?.message || "An unexpected error occurred.",
        };
        return Promise.reject(formattedError);
    }
)

export default http;