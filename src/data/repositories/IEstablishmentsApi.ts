import { EstablishmentData, EstablishmentDataDTO } from "../model/Establishment"


export interface IEstablishmentsApi {

    deleteEstablishment(id: number): Promise<string>

    getAllEstablishments(): Promise<EstablishmentData[]>

    getEstablishmentById(id: number): Promise<EstablishmentData>

    getEstablishmentByDate(date: number): Promise<EstablishmentData[]>

    getEstablishmentByDateBetween(minDate: number, maxDate: number): Promise<EstablishmentData[]>

    getEstablishmentByName(name: string): Promise<EstablishmentData[]>

    getEstablishmentByOpen(open: boolean): Promise<EstablishmentData[]>

    getEstablishmentByScore(score: number): Promise<EstablishmentData[]>

    getEstablishmentByScoreBetween(minScore: number, maxScore: number): Promise<EstablishmentData[]>

    saveEstablishment(body: EstablishmentDataDTO): Promise<EstablishmentData>

    updateEstablishment(id: number, body: EstablishmentDataDTO): Promise<EstablishmentData>
    
    updateEstablishmentScore(id: number): Promise<string>

}