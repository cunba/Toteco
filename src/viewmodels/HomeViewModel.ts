import { makeAutoObservable } from "mobx";
import { UserDTO } from "../client/toteco";
import { SessionStoreFactory } from "../infrastructure/data/SessionStoreFactory";

export class HomeViewModel {

    user?: UserDTO

    constructor() {
        makeAutoObservable(this)
        this.getUser()
    }

    async getUser() {
        // this.user = await SessionStoreFactory.getSessionStore().getUser()
    }
}