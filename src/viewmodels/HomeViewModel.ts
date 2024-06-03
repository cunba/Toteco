import { makeAutoObservable } from "mobx";
import { UserData } from "../data/model/toteco/User";
import { SessionStoreFactory } from "../infrastructure/data/SessionStoreFactory";

export class HomeViewModel {

    user?: UserData | undefined | null

    constructor() {
        makeAutoObservable(this)
        this.getUser()
    }

    async getUser() {
        this.user = await SessionStoreFactory.getSessionStore().getUser()
    }
}