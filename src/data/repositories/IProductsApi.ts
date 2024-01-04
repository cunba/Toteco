import { AxiosResponse } from "axios"
import { IGlobalRepository } from "../../infrastructure/data/repositories/IGlobalRespository"
import { ProductData, ProductDataDTO } from "../model/Product"


export interface IProductsApi extends IGlobalRepository<ProductData, ProductDataDTO> {

    getByMenu(menuId: string): Promise<AxiosResponse<ProductData[]>>

    getByPublication(publicationId: string): Promise<AxiosResponse<ProductData[]>>

}