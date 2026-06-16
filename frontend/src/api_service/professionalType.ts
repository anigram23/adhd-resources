import http from "@/api_service/httpClient.ts";

export async function getAllProfessionalTypes() {
    const response = await http.get("/professional-type/");
    return response.data;
}

export async function getProfessionalTypeByTitle(title: string) {
    const response = await http.get(`/professional-type/${title}`);
    return response.data;
}

export async function createProfessionalType(professionalType: {
    title: string,
    doctor: boolean,
    canDiagnose: boolean,
    canPrescribeMeds: boolean
}) {
    const response = await http.post("/professional-type/", professionalType);
    return response.data;
}

export async function updateProfessionalType(id: number, professionalType: {
    title: string,
    doctor: boolean,
    canDiagnose: boolean,
    canPrescribeMeds: boolean
}) {
    const response = await http.patch(`/professional-type/${id}`, professionalType);
    return response.data;
}

export async function deleteProfessionalType(id: number) {
    const response = await http.delete(`/professional-type/${id}`);
    return response.data;
}