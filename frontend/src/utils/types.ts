import type {Key} from "react";

export type State = {id: number, name: string};
export type ProfessionalType = {id: number, title: string, doctor: boolean, canDiagnose: boolean, canPrescribeMeds: boolean};
export type TicketType = {id: number, title: string};
export type City = {id: number, name: string};
export type Professional = {id: number, name: string, slug: string, professionalType: ProfessionalType, city: City};
export type Reviewer = {id: number, email: string, name: string, role: string};
export type StaticPage = { id: Key; title: string; slug: string; active: boolean };
export type Ticket = {
    id: number,
    ticketType: TicketType,
    reviewer: Reviewer,
    status: "OPEN" | "ONGOING" | "CLOSED",
    content: string,
    review: Review
};

export type Review = {
    id: number,
    content: string,
    rating: number,
    contactNumber: string,
    address: string,
    consultationFee: number,
    diagnosisFee: number,
    doesOnlineConsultations: boolean,
    createdAt: Date,
    updatedAt: Date,
    professional: Professional,
    owner: boolean,
};

export type PrivateReview = Review & { reviewer: Reviewer };