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

export async function getProfessionalsByName(name: string) {
    const response = await http.get("/professional/search-by-name", {
        params: {name: name}
    });

    return response.data;
}

export async function getReviewsForProfessional(id: number) {
    const response = await http.get(`/professional/${id}/reviews`);
    return response.data;
}