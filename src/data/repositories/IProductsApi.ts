import { ProductData, ProductDataDTO } from "../model/Product"


export interface IProductsApi {

    deleteProductById(id: number): Promise<string>

    getAllProducts(): Promise<ProductData[]>

    getProductById(id: number): Promise<ProductData>

    getProductsByDate(date: number): Promise<ProductData[]>

    getProductsByDateBetween(minDate: number, maxDate: number): Promise<ProductData[]>

    getProductsByInMenu(inMenu: boolean): Promise<ProductData[]>

    updateProductsPrice(id: number, price: number): Promise<ProductData[]>

    getProductsByPrice(price: number): Promise<ProductData[]>

    getProductsByPriceBetween(minPrice: number, maxPrice: number): Promise<ProductData[]>

    updateProductsScore(id: number, score: number): Promise<ProductData[]>

    getProductsByScore(score: number): Promise<ProductData[]>

    getProductsByScoreBetween(minScore: number, maxScore: number): Promise<ProductData[]>

    getProductsByTypeId(typeId: number): Promise<ProductData[]>

    getProductsByMenuId(menuId: number): Promise<ProductData[]>

    getProductsByPublicationId(publicationId: number): Promise<ProductData[]>

    saveProduct(body: ProductDataDTO): Promise<ProductData>

    updateProduct(id: number, body: ProductDataDTO): Promise<ProductData>

}