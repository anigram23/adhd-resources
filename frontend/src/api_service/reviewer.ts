import http from "@/api_service/httpClient.ts";

export type AdminReviewer = {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
};

export type AdminReviewerFilters = {
    id?: string;
    email?: string;
};

export async function register(credentials: {email: string, password: string, confirmPassword: string}) {
    const response = await http.post("/reviewer/register", credentials);
    return response.data;
}

export async function login(credentials: {email: string, password: string}) {
    const response = await http.post("/reviewer/login", credentials);
    return response.data;
}

export async function reviewerLogout() {
    const response = await http.post("/reviewer/logout");
    return response.data;
}

export async function getReviewsByReviewer(reviewerId: number) {
    const response = await http.get(`/reviewer/${reviewerId}/reviews`);
    return response.data;
}

export async function changePassword(
    credentials: {email: string, oldPassword: string, newPassword: string, confirmNewPassword: string}
) {
    const response = await http.patch("/reviewer/change-password", credentials);
    return response.data;
}

export async function deleteReviewer(reviewerId: number) {
    const response = await http.delete(`/reviewer/${reviewerId}`);
    return response.data;
}

export async function getReviewersForAdmin(filters: AdminReviewerFilters): Promise<AdminReviewer[]> {
    const response = await http.get("/admin/reviewers", {params: filters});
    return response.data;
}