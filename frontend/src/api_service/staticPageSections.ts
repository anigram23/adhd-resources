import http from "@/api_service/httpClient.ts";

export async function createStaticPageSection(credentials: { staticPageId: number, title: string, orderIndex: number }) {
    const response = await http.post("/static-page-section/", credentials);
    return response.data;
}

export async function updateStaticPageSection(id: number, credentials: { title: string, orderIndex: number }) {
    const response = await http.patch(`/static-page-section/${id}`, credentials);
    return response.data;
}

export async function deleteStaticPageSection(id: number) {
    const response = await http.delete(`/static-page-section/${id}`);
    return response.data;
}