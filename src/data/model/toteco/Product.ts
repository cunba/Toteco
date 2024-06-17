
export class Product {
    id?: string
    name: string
    created?: number
    score: number
    updated?: number
    price?: number

    constructor(
        id: string,
        name: string,
        score: number,
        price?: number
    ) {
        this.id = id
        this.name = name
        this.price = price
        this.score = score
    }
}

export class ProductDTO {
    name: string
    created: number
    score: number
    price?: number
    publication_id: string

    constructor(
        name: string,
        score: number,
        publication_id: string,
        price?: number
    ) {
        this.name = name
        this.created = new Date().getTime()
        this.score = score
        this.price = price
        this.publication_id = publication_id
    }
}