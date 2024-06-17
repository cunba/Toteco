import { Establishment } from "./Establishment";
import { Product } from "./Product";
import { UserData } from "./User";

export class Publication {
    id?: string
    created?: number
    total_price: number
    total_score: number
    photo: string
    comment: string
    establishment?: Establishment
    user?: UserData
    updated?: number
    products?: Product[]

    constructor(
        total_price: number,
        total_score: number,
        photo: string,
        comment: string
    ) {
        this.total_price = total_price
        this.total_score = total_score
        this.photo = photo
        this.comment = comment
    }
}

export class PublicationDTO {
    created: number
    total_price: number
    total_score: number
    photo: string
    comment: string
    establishment_id: string
    user_id: string

    constructor(
        total_price: number,
        total_score: number,
        photo: string,
        comment: string,
        establishment_id: string,
        user_id: string
    ) {
        this.created = new Date().getTime()
        this.total_price = total_price
        this.total_score = total_score
        this.photo = photo
        this.comment = comment
        this.establishment_id = establishment_id
        this.user_id = user_id
    }
}