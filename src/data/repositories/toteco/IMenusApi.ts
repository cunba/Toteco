import { IGlobalRepository } from "../../../infrastructure/data/repositories/IGlobalRespository"
import { Menu, MenuDTO } from "../../model/toteco/Menu"


export interface IMenusApi extends IGlobalRepository<Menu, MenuDTO> {

}