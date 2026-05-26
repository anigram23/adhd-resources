import http from "@/api_service/httpClient.ts";

export async function getAllProfessionalTypes() {
    const response = await http.get("/professional-type/");
    return response.data;
}