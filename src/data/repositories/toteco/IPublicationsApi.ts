import { IGlobalRepository } from "../../../infrastructure/data/repositories/IGlobalRespository"
import { Publication, PublicationDTO } from "../../model/toteco/Publication"


export interface IPublicationsApi extends IGlobalRepository<Publication, PublicationDTO> {

    getByEstablishmentId(id: string): Promise<Publication[] | undefined>

    getByUserId(id: string): Promise<Publication[] | undefined>

}