import axios from "axios";
import type {ApiError} from "@/utils/types.ts";

const baseURL = import.meta.env.VITE_API_URL

const http = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

http.interceptors.response.use(
    (response) => response,
    (error) => {
        // Backend sends [{ field, message }] for field-level validation errors; keep the first message per field.
        const validationErrors: { field: string, message: string }[] | null | undefined = error?.response?.data?.validationErrors;
        const fieldErrors = validationErrors?.length
            ? Object.fromEntries([...validationErrors].reverse().map(({field, message}) => [field, message]))
            : undefined;

        const formattedError: ApiError = {
            status: error?.response?.status || 500,
            message: error?.response?.data?.message || "An unexpected error occurred.",
            fieldErrors,
        };
        return Promise.reject(formattedError);
    }
)

export default http;
