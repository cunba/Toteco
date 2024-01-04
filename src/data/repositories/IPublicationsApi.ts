import { IGlobalRepository } from "../../infrastructure/data/repositories/IGlobalRespository"
import { PublicationData, PublicationDataDTO } from "../model/Publication"


export interface IPublicationsApi extends IGlobalRepository<PublicationData, PublicationDataDTO> {

    getByEstablishment(id: string): Promise<PublicationData[]>

    getByUser(id: string): Promise<PublicationData[]>

}