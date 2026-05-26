import type {Key} from "react";

export type State = {id: number, name: string};
export type ProfessionalType = {id: number, title: string, doctor: boolean, canDiagnose: boolean, canPrescribeMeds: boolean};
export type City = {id: number, name: string};
export type Professional = {id: number, name: string, slug: string, type: ProfessionalType, city: City};
export type StaticPage = { id: Key; title: string; slug: string; active: boolean };