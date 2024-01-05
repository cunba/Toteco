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
        public image?: string,
        public created?: number,
        public products?: Product[]
    ) {
        this.id = id
        this.totalPrice = totalPrice
        this.totalScore = totalScore
        this.user = user
        this.establishment = establishment
        this.created = created
        this.image = image
        this.products = products
    }
}

export class PublicationDataDTO implements PublicationDTO {
    constructor(
        public totalScore: number,
        public totalPrice: number,
        public userId: string,
        public establishmentId: string,
        public image?: string
    ) {
        this.totalScore = totalScore
        this.totalPrice = totalPrice
        this.image = image
        this.userId = userId
        this.establishmentId = establishmentId
    }

}