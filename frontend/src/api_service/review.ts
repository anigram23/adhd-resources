import http from "@/api_service/httpClient.ts";
import type {PrivateReview} from "@/utils/types.ts";

type CreateReviewData = {
    professionalName: string | null,
    professionalTypeTitle: string | null,
    cityName: string | null,
    professionalId: string | null,
    doesOnlineConsultations: boolean,
    contactNumber: string,
    address: string,
    consultationFee: number,
    diagnosisFee: number | null,
    wasDiagnosed: boolean,
    content: string,
    rating: number
}

type UpdateReviewData = {
    doesOnlineConsultations: boolean | null,
    contactNumber: string | null,
    consultationFee: number | null,
    address: string | null,
    diagnosisFee: number | null,
    wasDiagnosed: boolean | null,
    content: string | null,
    rating: number | null
}

export type AdminReviewFilters = {
    id?: string;
    reviewerId?: string;
    professionalId?: string;
    fromDate?: string;
    toDate?: string;
};

export async function getReviewsForAdmin(params?: AdminReviewFilters): Promise<PrivateReview[]> {
    const response = await http.get("/review/reviews-for-admin", { params });
    return response.data;
}

export async function createReview(reviewDetails: CreateReviewData){
    const response = await http.post("/review/", reviewDetails);
    return response.data;
}

export async function editReview(id: string, reviewDetails: UpdateReviewData){
    const response = await http.patch(`/review/${id}`, reviewDetails);
    return response.data;
}

export async function deleteReview(id: string){
    const response = await http.delete(`/review/${id}`);
    return response.data;
}
