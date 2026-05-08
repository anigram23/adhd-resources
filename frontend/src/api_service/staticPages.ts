import http from "@/api_service/httpClient.ts";

export async function getAllStaticPages() {
    const response = await http.get("/static-page/");
    return response.data;
}

export async function createStaticPage(credentials: {title: string, slug: string}) {
    const response = await http.post("/static-page/", credentials);
    return response.data;
}

export async function getStaticPageBySlug(slug: string) {
    const response = await http.get(`/static-page/${slug}`);
    return response.data;
}

export async function updateStaticPage(id: number, credentials: {title: string, slug: string, active: boolean}) {
    const response = await http.patch(`/static-page/${id}`, credentials);
    return response.data;
}

export async function deleteStaticPage(id: number) {
    const response = await http.delete(`/static-page/${id}`);
    return response.data;
}