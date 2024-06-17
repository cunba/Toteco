import { Publication } from "./Publication";

export class Establishment {
    id: string
    name: string
    created?: number
    location: string
    isOpen: boolean
    isComputerAllowed: boolean
    mapsId: string
    score: number
    updated?: number
    publications?: Publication[]

    constructor(
        id: string,
        name: string,
        location: string,
        isOpen: boolean,
        isComputerAllowed: boolean,
        mapsId: string,
        score: number
    ) {
        this.id = id
        this.name = name
        this.location = location
        this.isOpen = isOpen
        this.isComputerAllowed = isComputerAllowed
        this.mapsId = mapsId
        this.score = score
    }
}

export class EstablishmentDTO {
    name: string
    created: number
    location: string
    isOpen: boolean
    isComputerAllowed: boolean
    mapsId: string
    score: number

    constructor(
        name: string,
        location: string,
        isOpen: boolean,
        isComputerAllowed: boolean,
        mapsId: string,
        score: number
    ) {
        this.name = name
        this.created = new Date().getTime()
        this.location = location
        this.isOpen = isOpen
        this.isComputerAllowed = isComputerAllowed
        this.mapsId = mapsId
        this.score = score
    }
}