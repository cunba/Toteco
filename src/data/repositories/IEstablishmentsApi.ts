import { AxiosResponse } from "axios"
import { IGlobalRepository } from "../../infrastructure/data/repositories/IGlobalRespository"
import { EstablishmentData, EstablishmentDataDTO } from "../model/Establishment"


export interface IEstablishmentsApi extends IGlobalRepository<EstablishmentData, EstablishmentDataDTO> {

    getByName(name: string): Promise<AxiosResponse<EstablishmentData[]>>

}