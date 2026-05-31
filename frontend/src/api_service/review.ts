import http from "@/api_service/httpClient.ts";

export async function createReview(reviewDetails: {
    professionalName: string | null,
    professionalTypeTitle: string | null,
    cityName: string | null,
    professionalId: number | null,
    doesOnlineConsultations: boolean,
    contactNumber: string,
    consultationFee: number,
    diagnosisFee: number | null,
    content: string,
    rating: number
}) {
    const response = await http.post("/review/", reviewDetails);
    return response.data;
}