import { makeAutoObservable } from "mobx";
import { Location } from "react-native-location";
import { geolocation } from "../App";
import { Establishment } from "../data/model/toteco/Establishment";
import { EstablishmentsRepository } from "../data/repositories/toteco/impl/EstablishmentsRepository";

export class EstablishmentsViewModel {

    establishments?: Establishment[]
    initialLocation?: Location

    constructor() {
        makeAutoObservable(this)
        this.establishments = []
        this.initialLocation = geolocation === undefined ? { latitude: 0.0, longitude: 0.0 } as Location : geolocation
    }

    async getEstablishments() {
        this.establishments = await new EstablishmentsRepository().getAll()
    }
}