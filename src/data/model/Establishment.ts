import { Establishment, EstablishmentDTO } from "../../client";
import { PublicationData } from "./Publication";

export class EstablishmentData implements Establishment {

    constructor(
        public id: string,
        public name: string,
        public location: string,
        public open: boolean,
        public score: number,
        public created?: number,
        public publications?: PublicationData[]
    ) {
        this.id = id
        this.name = name
        this.created = created
        this.location = location
        this.open = open
        this.score = score
        this.publications = publications
    }
}

export class EstablishmentDataDTO implements EstablishmentDTO {

    constructor(
        public name: string,
        public location: string,
        public open: boolean
    ) {
        this.name = name
        this.location = location
        this.open = open
    }
}