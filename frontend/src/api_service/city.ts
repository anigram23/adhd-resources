import http from "@/api_service/httpClient.ts";

export async function getCitiesByState(id: number | undefined) {
    const response = await http.get(`/city/state/${id}`);
    return response.data;
}

export async function getCityByName(name: string) {
    const response = await http.get(`/city/${name}`);
    return response.data;
}