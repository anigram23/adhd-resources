import http from "./httpClient";

export async function login(credentials: {email: string, password: string}): Promise<void> {
    const response = await http.post("/admin/login", credentials);

    return response.data;
}

export async function adminLogout() {
    const response = await http.post("/admin/logout");
    return response.data;
}