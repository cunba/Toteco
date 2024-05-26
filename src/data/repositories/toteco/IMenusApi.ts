import { IGlobalRepository } from "../../../infrastructure/data/repositories/IGlobalRespository"
import { MenuData, MenuDataDTO } from "../../model/toteco/Menu"


export interface IMenusApi extends IGlobalRepository<MenuData, MenuDataDTO> {

}