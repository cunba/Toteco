import { AxiosResponse } from "axios"
import { IGlobalRepository } from "../../../infrastructure/data/repositories/IGlobalRespository"
import { PublicationData, PublicationDataDTO } from "../../model/toteco/Publication"


export interface IPublicationsApi extends IGlobalRepository<PublicationData, PublicationDataDTO> {

    getByEstablishmentId(id: string): Promise<AxiosResponse<PublicationData[]>>

    getByUserId(id: string): Promise<AxiosResponse<PublicationData[]>>

}