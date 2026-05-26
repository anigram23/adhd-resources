import http from "@/api_service/httpClient.ts";

export default async function getAllProfessionals(type: string | null, city: string | null) {
    const response = await http.get(`/professional/`, {
        params: {
            type: type,
            city: city
        }
    });

    return response.data;
}