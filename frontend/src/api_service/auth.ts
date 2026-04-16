import http from "@/api_service/httpClient.ts";

export async function getCurrentUser(): Promise<void> {
    const response = await http.get("/auth/me");
    return response.data;
}