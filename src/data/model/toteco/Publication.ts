import { Publication, PublicationDTO } from "../../../client/toteco";
import { EstablishmentData } from "./Establishment";
import { ProductData } from "./Product";
import { UserData } from "./User";

export class PublicationData implements Publication {
    products?: ProductData[]

    constructor(
        public id: string,
        public created: number,
        public totalPrice: number,
        public totalScore: number,
        public photo: string,
        public comment: string,
        public establishment?: EstablishmentData,
        public user?: UserData,
        public updated?: number
    ) {
        this.id = id
        this.created = created
        this.updated = updated
        this.totalPrice = totalPrice
        this.totalScore = totalScore
        this.photo = photo
        this.comment = comment
        this.establishment = establishment
        this.user = user
    }
}

export class PublicationDataDTO implements PublicationDTO {
    constructor(
        public totalPrice: number,
        public totalScore: number,
        public comment: string,
        public establishmentId: string,
        public userId: string,
        public photo?: string
    ) {
        this.totalPrice = totalPrice
        this.totalScore = totalScore
        this.photo = photo
        this.comment = comment
        this.establishmentId = establishmentId
        this.userId = userId
    }

}