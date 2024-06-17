import { Menu } from "./Menu";
import { Publication } from "./Publication";

export class Product {
    id?: string
    name: string
    created: number
    inMenu: boolean
    score: number
    updated?: number
    price?: number
    publication?: Publication
    menu?: Menu

    constructor(
        id: string,
        name: string,
        created: number,
        inMenu: boolean,
        score: number,
        updated?: number,
        price?: number,
        publication?: Publication,
        menu?: Menu
    ) {
        this.id = id
        this.name = name
        this.created = created
        this.updated = updated
        this.inMenu = inMenu
        this.price = price
        this.score = score
        this.menu = menu
        this.publication = publication
    }
}

export class ProductDTO {
    name: string
    created: number
    inMenu: boolean
    score: number
    price?: number
    publication_id: string
    menu_id?: string

    constructor(
        name: string,
        inMenu: boolean,
        score: number,
        publication_id: string,
        price?: number,
        menu_id?: string
    ) {
        this.name = name
        this.created = new Date().getTime()
        this.inMenu = inMenu
        this.score = score
        this.price = price
        this.publication_id = publication_id
        this.menu_id = menu_id
    }
}