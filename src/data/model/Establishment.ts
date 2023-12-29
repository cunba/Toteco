import { Establishment, EstablishmentDTO } from "../../client";
import { LocationData } from "./Location";

export class EstablishmentData implements Establishment {

    constructor(
        public id: number,
        public name: string,
        public creationDate: string,
        public location: LocationData,
        public open: boolean,
        public score: number
    ) {
        this.id = id
        this.name = name
        this.creationDate = creationDate
        this.location = location
        this.open = open
        this.score = score
    }
}

export class EstablishmentDataDTO implements EstablishmentDTO {

    constructor(
        public name: string,
        public location: LocationData,
        public open: boolean
    ) {
        this.name = name
        this.location = location
        this.open = open
    }
}