import http from "./httpClient";

export default async function login(credentials: {email: string, password: string}): Promise<void> {
    const response = await http.post("/admin/login", credentials);

    return response.data;
}