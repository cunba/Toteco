import { IGlobalRepository } from "../../../infrastructure/data/repositories/IGlobalRespository"
import { Product, ProductDTO } from "../../model/toteco/Product"


export interface IProductsApi extends IGlobalRepository<Product, ProductDTO> {

    getByMenuId(menuId: string): Promise<Product[] | undefined>

    getByPublicationId(publicationId: string): Promise<Product[] | undefined>

}