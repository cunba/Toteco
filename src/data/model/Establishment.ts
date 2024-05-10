import { Establishment, EstablishmentDTO } from "../../client";
import { PublicationData } from "./Publication";

export class EstablishmentData implements Establishment {

    constructor(
        public id: string,
        public name: string,
        public created: number,
        public location: string,
        public isOpen: boolean,
        public score: number,
        public updated?: number,
        public publications?: PublicationData[]
    ) {
        this.id = id
        this.name = name
        this.created = created
        this.location = location
        this.isOpen = isOpen
        this.score = score
        this.publications = publications
    }
}

export class EstablishmentDataDTO implements EstablishmentDTO {

    constructor(
        public name: string,
        public location: string
    ) {
        this.name = name
        this.location = location
    }
}