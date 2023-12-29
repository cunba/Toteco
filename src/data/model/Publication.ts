import { Publication, PublicationDTO } from "../../client";
import { EstablishmentData } from "./Establishment";
import { UserData } from "./User";

export class PublicationData implements Publication {
    constructor(
        public id?: number,
        public date?: string,
        public totalPrice?: number,
        public totalScore?: number,
        public photo?: string,
        public user?: UserData,
        public establishment?: EstablishmentData
    ) {
        this.id = id
        this.date = date
        this.totalPrice = totalPrice
        this.totalScore = totalScore
        this.photo = photo
        this.user = user
        this.establishment = establishment
    }
}

export class PublicationDataDTO implements PublicationDTO {
    constructor(
        public photo?: string,
        public userId?: number,
        public establishmentId?: number
    ) {
        this.photo = photo
        this.userId = userId
        this.establishmentId = establishmentId
    }

}