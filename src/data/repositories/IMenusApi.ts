import { MenuData, MenuDataDTO } from "../model/Menu"


export interface IMenusApi {

    deleteMenu(id: number): Promise<string>

    getAllMenus(): Promise<MenuData[]>

    getMenuById(id: number): Promise<MenuData>

    getMenuByDate(date: number): Promise<MenuData[]>

    getMenuByDateBetween(minDate: number, maxDate: number): Promise<MenuData[]>

    getMenuByPrice(price: number): Promise<MenuData[]>

    getMenuByPriceBetween(minPrice: number, maxPrice: number): Promise<MenuData[]>

    getMenuByScore(score: number): Promise<MenuData[]>

    getMenuByScoreBetween(minScore: number, maxScore: number): Promise<MenuData[]>

    saveMenu(body: MenuDataDTO): Promise<MenuData>

    updateMenu(id: number, body: MenuDataDTO): Promise<MenuData>

}