import { makeAutoObservable } from "mobx";
import { Publication } from "../data/model/toteco/Publication";
import { UserData } from "../data/model/toteco/User";
import { PublicationsRepository } from "../data/repositories/toteco/impl/PublicationsRepository";
import { SessionStoreFactory } from "../infrastructure/data/SessionStoreFactory";

export class HomeViewModel {

    user?: UserData | undefined | null
    publications?: Publication[]

    constructor() {
        makeAutoObservable(this)
        this.publications = []
        this.getPublications()
        this.getUser()
    }

    async getUser() {
        this.user = await SessionStoreFactory.getSessionStore().getUser()
    }

    async getPublications() {
        this.publications = await new PublicationsRepository().getAll()
        this.publications?.sort((a: Publication, b: Publication) => {
            if (a.created! < b.created!)
                return 1
            else if (a.created! > b.created!)
                return -1
            else
                return 0
        })
    }
}