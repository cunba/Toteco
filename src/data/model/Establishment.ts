import { Establishment, EstablishmentDTO } from "../../client";
import { PublicationData } from "./Publication";

export class EstablishmentData implements Establishment {

    constructor(
        public id: string,
        public name: string,
        public created: number,
        public location: string,
        public isOpen: boolean,
        public isComputerAllowed: boolean,
        public score: number,
        public comments?: string,
        public updated?: number,
        public publications?: PublicationData[]
    ) {
        this.id = id
        this.name = name
        this.created = created
        this.location = location
        this.isOpen = isOpen
        this.isComputerAllowed = isComputerAllowed
        this.comments = comments
        this.score = score
        this.publications = publications
    }
}

export class EstablishmentDataDTO implements EstablishmentDTO {

    constructor(
        public name: string,
        public location: string,
        public isComputerAllowed: boolean,
        public comments?: string
    ) {
        this.name = name
        this.location = location
        this.isComputerAllowed = isComputerAllowed
        this.comments = comments
    }
}