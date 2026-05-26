import http from "@/api_service/httpClient.ts";

export async function getAllStates() {
    const response = await http.get("/state/");
    return response.data;
}