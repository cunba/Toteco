import { makeAutoObservable } from "mobx";
import { Publication } from "../data/model/toteco/Publication";
import { UserData } from "../data/model/toteco/User";
import { PublicationsRepository } from "../data/repositories/toteco/impl/PublicationsRepository";
import { SessionStoreFactory } from "../infrastructure/data/SessionStoreFactory";
import { Friend } from "../data/model/toteco/Friend";
import { FriendsRepository } from "../data/repositories/toteco/impl/FriendsRepository";

export class ProfileViewModel {

    user?: UserData | undefined | null
    publications?: Publication[]
    friends?: Friend[]

    constructor() {
        makeAutoObservable(this)
        this.publications = []
        this.friends = []
    }

    async getUser() {
        this.user = await SessionStoreFactory.getSessionStore().getUser()
    }

    async getPublications() {
        this.publications = await new PublicationsRepository().getByUserId(this.user!.id!)
        console.log(this.publications)
    }

    async getFriends() {
        this.friends = await new FriendsRepository().getByFollower(this.user!.id!)
    }

    setUser(user: any) {
        this.user = user
    }
}