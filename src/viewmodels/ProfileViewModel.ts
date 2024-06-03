import { makeAutoObservable } from "mobx";
import { PublicationData } from "../data/model/toteco/Publication";
import { UserData } from "../data/model/toteco/User";
import { PublicationsRepository } from "../data/repositories/toteco/impl/PublicationsRepository";
import { UsersRepository } from "../data/repositories/toteco/impl/UsersRepository";

export class ProfileViewModel {

    user?: UserData | undefined | null
    publications?: PublicationData[]

    constructor() {
        makeAutoObservable(this)
        this.publications = []
        this.getUser()
    }

    async getUser() {
        this.user = await new UsersRepository().getUserLogged()
    }

    async getPublications() {
        this.publications = await new PublicationsRepository().getByUser(this.user!.id!)
        console.log(this.publications)
    }

    setUser(user: any) {
        this.user = user
    }
}