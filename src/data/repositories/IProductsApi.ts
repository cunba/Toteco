import { IRepository } from "../../infrastructure/data/repositories/IRepository"
import { ErrorResponse } from "../../infrastructure/exceptions/ErrorResponse"
import { ProductData, ProductDataDTO } from "../model/Product"


export interface IProductsApi extends IRepository<ProductData, ProductDataDTO> {

    findByDate(date: number): Promise<ProductData[] | ErrorResponse>

    findBetweenDates(minDate: number, maxDate: number): Promise<ProductData[] | ErrorResponse>

    findInMenu(inMenu: boolean): Promise<ProductData[] | ErrorResponse>

    updatePrice(id: number, price: number): Promise<ProductData[] | ErrorResponse>

    findByPrice(price: number): Promise<ProductData[] | ErrorResponse>

    findBetweenPrices(minPrice: number, maxPrice: number): Promise<ProductData[] | ErrorResponse>

    updateScore(id: number, score: number): Promise<ProductData[] | ErrorResponse>

    findByScore(score: number): Promise<ProductData[] | ErrorResponse>

    findBetweenScores(minScore: number, maxScore: number): Promise<ProductData[] | ErrorResponse>

    findByType(typeId: number): Promise<ProductData[] | ErrorResponse>

    findByMenu(menuId: number): Promise<ProductData[] | ErrorResponse>

    findByPublication(publicationId: number): Promise<ProductData[] | ErrorResponse>

}