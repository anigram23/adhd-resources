import http from "@/api_service/httpClient.ts";

export interface User {
    id: number;
    email: string;
    name: string;
    role: "ADMIN" | "REVIEWER";
}

export async function getCurrentUser(): Promise<User> {
    const response = await http.get("/auth/me");
    return response.data;
}