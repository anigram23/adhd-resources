import http from "@/api_service/httpClient.ts";

export async function getAllTicketTypes() {
    const response = await http.get("/ticket-type/");
    return response.data;
}

export async function getTicketTypeById(id: number) {
    const response = await http.get(`/ticket-type/${id}`);
    return response.data;
}

export async function createTicketType(ticketType: { title: string }) {
    const response = await http.post("/ticket-type/", ticketType);
    return response.data;
}

export async function updateTicketType(id: number, ticketType: { title?: string }) {
    const response = await http.patch(`/ticket-type/${id}`, ticketType);
    return response.data;
}

export async function deleteTicketType(id: number) {
    const response = await http.delete(`/ticket-type/${id}`);
    return response.data;
}
