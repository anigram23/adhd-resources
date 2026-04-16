import http from "@/api_service/httpClient.ts";

export async function register(credentials: {email: string, password: string, confirmPassword: string}) {
    const response = await http.post("/reviewer/register", credentials);
    return response.data;
}

export async function login(credentials: {email: string, password: string}) {
    const response = await http.post("/reviewer/login", credentials);
    return response.data;
}

export async function reviewerLogout() {
    const response = await http.post("/reviewer/logout");
    return response.data;
}