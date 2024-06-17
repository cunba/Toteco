import { makeAutoObservable } from "mobx";
import { Publication } from "../data/model/toteco/Publication";
import { UserData } from "../data/model/toteco/User";
import { PublicationsRepository } from "../data/repositories/toteco/impl/PublicationsRepository";
import { UsersRepository } from "../data/repositories/toteco/impl/UsersRepository";

export class ProfileViewModel {

    user?: UserData | undefined | null
    publications?: Publication[]

    constructor() {
        makeAutoObservable(this)
        this.publications = []
    }

    async getUser() {
        this.user = await new UsersRepository().getUserLogged()
    }

    async getPublications() {
        this.publications = await new PublicationsRepository().getByUserId(this.user!.id!)
        console.log(this.publications)
    }

    setUser(user: any) {
        this.user = user
    }
}