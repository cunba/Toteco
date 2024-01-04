import { IGlobalRepository } from "../../infrastructure/data/repositories/IGlobalRespository"
import { MenuData, MenuDataDTO } from "../model/Menu"


export interface IMenusApi extends IGlobalRepository<MenuData, MenuDataDTO> {

}