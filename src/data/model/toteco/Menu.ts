import { Product } from "./Product";

export class Menu {
    id?: string
    created: number
    updated: number
    price: number
    score: number
    products?: Product[]

    constructor(
        created: number,
        updated: number,
        price: number,
        score: number
    ) {
        this.created = created
        this.updated = updated
        this.price = price
        this.score = score
    }
}

export class MenuDTO {
    created: number
    price: number
    score: number

    constructor(
        price: number,
        score: number
    ) {
        this.created = new Date().getTime()
        this.price = price
        this.score = score
    }
}