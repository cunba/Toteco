import { makeAutoObservable } from "mobx";
import { Location } from "react-native-location";
import { geolocation } from "../App";
import { Establishment } from "../data/model/toteco/Establishment";
import { EstablishmentsRepository } from "../data/repositories/toteco/impl/EstablishmentsRepository";
import { UserData } from "../data/model/toteco/User";
import { SessionStoreFactory } from "../infrastructure/data/SessionStoreFactory";

export class EstablishmentsViewModel {

    establishments?: Establishment[]
    initialLocation?: Location
    user?: UserData | null
    
    constructor() {
        makeAutoObservable(this)
        this.establishments = []
        this.getUser()
        this.initialLocation = geolocation === undefined ? { latitude: 0.0, longitude: 0.0 } as Location : geolocation
    }

    async getUser() {
        this.user = await SessionStoreFactory.getSessionStore().getUser()
    }

    async getEstablishments() {
        this.establishments = await new EstablishmentsRepository().getAll()
    }
}