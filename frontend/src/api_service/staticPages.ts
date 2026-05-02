import http from "@/api_service/httpClient.ts";

export async function getAllStaticPages() {
    const response = await http.get("/static-page/");
    return response.data;
}

export async function createStaticPage(credentials: {title: string, slug: string}) {
    const response = await http.post("/static-page/", credentials);
    return response.data;
}