import http from "@/api_service/httpClient.ts";

export async function createSectionBlock(credentials: {staticPageSectionId: number, content: string, orderIndex: number}) {
    const response = await http.post("/section-block/", credentials);
    return response.data;
}

export async function updateSectionBlock(id: number, credentials: {content: string, orderIndex: number}) {
    const response = await http.patch(`/section-block/${id}`, credentials);
    return response.data;
}

export async function deleteSectionBlock(id: number) {
    const response = await http.delete(`/section-block/${id}`);
    return response.data;
}