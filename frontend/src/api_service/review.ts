import http from "@/api_service/httpClient.ts";

type CreateReviewData = {
    professionalName: string | null,
    professionalTypeTitle: string | null,
    cityName: string | null,
    professionalId: number | null,
    doesOnlineConsultations: boolean,
    contactNumber: string,
    address: string,
    consultationFee: number,
    diagnosisFee: number | null,
    content: string,
    rating: number
}

type UpdateReviewData = {
    doesOnlineConsultations: boolean | null,
    contactNumber: string | null,
    consultationFee: number | null,
    address: string | null,
    diagnosisFee: number | null,
    content: string | null,
    rating: number | null
}

export async function createReview(reviewDetails: CreateReviewData){
    const response = await http.post("/review/", reviewDetails);
    return response.data;
}

export async function editReview(id: number, reviewDetails: UpdateReviewData){
    const response = await http.patch(`/review/${id}`, reviewDetails);
    return response.data;
}

export async function deleteReview(id: number){
    const response = await http.delete(`/review/${id}`);
    return response.data;
}