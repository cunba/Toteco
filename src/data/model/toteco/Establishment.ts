import { Publication } from "./Publication";

export class Establishment {
    id: string
    name: string
    created?: number
    location: string
    is_computer_allowed: boolean
    maps_id: string
    score: number
    maps_url: string
    updated?: number
    publications?: Publication[]

    constructor(
        id: string,
        name: string,
        location: string,
        is_computer_allowed: boolean,
        maps_id: string,
        score: number,
        maps_url: string
    ) {
        this.id = id
        this.name = name
        this.location = location
        this.is_computer_allowed = is_computer_allowed
        this.maps_id = maps_id
        this.score = score
        this.maps_url = maps_url
    }
}

export class EstablishmentDTO {
    name: string
    created: number
    location: string
    is_computer_allowed: boolean
    maps_id: string
    score: number
    maps_url: string

    constructor(
        name: string,
        location: string,
        is_computer_allowed: boolean,
        maps_id: string,
        score: number,
        maps_url: string
    ) {
        this.name = name
        this.created = new Date().getTime()
        this.location = location
        this.is_computer_allowed = is_computer_allowed
        this.maps_id = maps_id
        this.score = score
        this.maps_url = maps_url
    }
}

export class EstablishmentUpdate {
    id: string
    name: string
    created: number
    location: string
    is_computer_allowed: boolean
    maps_id: string
    score: number
    updated: number
    maps_url: string

    constructor(establishment: Establishment) {
        this.id = establishment.id
        this.name = establishment.name
        this.created = establishment.created!
        this.location = establishment.location
        this.is_computer_allowed = establishment.is_computer_allowed
        this.maps_id = establishment.maps_id
        this.score = establishment.score
        this.updated = new Date().getTime()
        this.maps_url = establishment.maps_url
    }
}