import { Product, Publication, PublicationDTO } from "../../client";
import { EstablishmentData } from "./Establishment";
import { UserData } from "./User";

export class PublicationData implements Publication {
    constructor(
        public id: string,
        public totalPrice: number,
        public totalScore: number,
        public user: UserData,
        public establishment: EstablishmentData,
        public created?: number,
        public photo?: string[],
        public products?: Product[]
    ) {
        this.id = id
        this.totalPrice = totalPrice
        this.totalScore = totalScore
        this.user = user
        this.establishment = establishment
        this.created = created
        this.photo = photo
        this.products = products
    }
}

export class PublicationDataDTO implements PublicationDTO {
    constructor(
        public totalScore: number,
        public totalPrice: number,
        public userId: string,
        public establishmentId: string,
        public photo?: string[]
    ) {
        this.totalScore = totalScore
        this.totalPrice = totalPrice
        this.photo = photo
        this.userId = userId
        this.establishmentId = establishmentId
    }

}