import http from "@/api_service/httpClient.ts";

export default async function register(credentials: {email: string, password: string, confirmPassword: string}) {
    const response = await http.post("/reviewer/register", credentials);
    return response.data;
}