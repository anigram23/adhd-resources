import http from "@/api_service/httpClient.ts";

export async function getTickets(reviewerId: number | null, status: string | null) {
    const response = await http.get(`/ticket/`, {
        params: {
            reviewerId: reviewerId,
            status: status,
        }
    });

    return response.data;
}

export async function createTicket(data: { ticketTypeId: number; reviewerId: number; content: string, reviewId: number | null }) {
    const response = await http.post("/ticket/", data);
    return response.data;
}

export async function updateTicket(id: number, data: { status: string }) {
    const response = await http.patch(`/ticket/${id}`, data);
    return response.data;
}

export async function deleteTicket(id: number) {
    const response = await http.delete(`/ticket/${id}`);
    return response.data;
}