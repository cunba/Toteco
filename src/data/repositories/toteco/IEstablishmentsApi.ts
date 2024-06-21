import { IGlobalRepository } from "../../../infrastructure/data/repositories/IGlobalRespository"
import { Establishment, EstablishmentDTO, EstablishmentUpdate } from "../../model/toteco/Establishment"


export interface IEstablishmentsApi extends IGlobalRepository<Establishment, EstablishmentDTO, EstablishmentUpdate> {

    getByName(name: string): Promise<Establishment[] | undefined>

    getByMapsId(mapsId: string): Promise<Establishment[] | undefined>

    updateScore(score: number, id: string): Promise<Establishment>

}