import { Establishment } from "./Establishment";
import { Product } from "./Product";
import { UserData } from "./User";

export class Publication {
    id?: string
    created: number
    totalPrice: number
    totalScore: number
    photo: string
    comment: string
    establishment?: Establishment
    user?: UserData
    updated?: number
    products?: Product[]

    constructor(
        created: number,
        totalPrice: number,
        totalScore: number,
        photo: string,
        comment: string
    ) {
        this.created = created
        this.totalPrice = totalPrice
        this.totalScore = totalScore
        this.photo = photo
        this.comment = comment
    }
}

export class PublicationDTO {
    created: number
    totalPrice: number
    totalScore: number
    photo: string
    comment: string
    establishment_id: string
    user_id: string

    constructor(
        totalPrice: number,
        totalScore: number,
        photo: string,
        comment: string,
        establishment_id: string,
        user_id: string
    ) {
        this.created = new Date().getTime()
        this.totalPrice = totalPrice
        this.totalScore = totalScore
        this.photo = photo
        this.comment = comment
        this.establishment_id = establishment_id
        this.user_id = user_id
    }
}