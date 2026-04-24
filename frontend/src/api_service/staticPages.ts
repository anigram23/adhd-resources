import http from "@/api_service/httpClient.ts";

export async function getAllStaticPages() {
    const response = await http.get("/static-page/");
    return response.data;
}