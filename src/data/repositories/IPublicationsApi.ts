import { PublicationData, PublicationDataDTO } from "../model/Publication"


export interface IPublicationsApi {

    deletePublication(id: number): Promise<string>

    getAllPublications(): Promise<PublicationData[]>

    getPublicationById(id: number): Promise<PublicationData>

    getPublicationByDate(date: number): Promise<PublicationData[]>

    getPublicationByDateBetween(minDate: number, maxDate: number): Promise<PublicationData[]>

    getPublicationByDateBetweenAndPriceBetweenAndScoreBetween(minDate: number, maxDate: number, minPrice: number, maxPrice: number, minScore: number, maxScore: number): Promise<PublicationData[]>

    getPublicationByPrice(price: number): Promise<PublicationData[]>

    getPublicationByPriceBetween(minPrice: number, maxPrice: number): Promise<PublicationData[]>

    getPublicationsByScore(score: number): Promise<PublicationData[]>

    getPublicationByScoreBetween(minScore: number, maxScore: number): Promise<PublicationData[]>

    getPublicationByEstablishmentId(id: number): Promise<PublicationData[]>

    getPublicationById(id: number): Promise<PublicationData[]>

    getPublicationByUserId(id: number): Promise<PublicationData[]>

    getPublicationByProductType(type: string): Promise<PublicationData[]>

    savePublication(body: PublicationDataDTO): Promise<PublicationData>

    updatePublication(id: number, body: PublicationDataDTO): Promise<PublicationData>

    updatePublicationPriceAndScore(id: number): Promise<string>

}