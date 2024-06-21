import { IGlobalRepository } from "../../../infrastructure/data/repositories/IGlobalRespository"
import { Publication, PublicationDTO, PublicationUpdate } from "../../model/toteco/Publication"


export interface IPublicationsApi extends IGlobalRepository<Publication, PublicationDTO, PublicationUpdate> {

    getByEstablishmentId(id: string): Promise<Publication[] | undefined>

    getByUserId(id: string): Promise<Publication[] | undefined>

}