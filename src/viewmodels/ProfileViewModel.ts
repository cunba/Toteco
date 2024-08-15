import { makeAutoObservable } from "mobx";
import { Friend, FriendDTO } from "../data/model/toteco/Friend";
import { Publication } from "../data/model/toteco/Publication";
import { UserData } from "../data/model/toteco/User";
import { FriendsRepository } from "../data/repositories/toteco/impl/FriendsRepository";
import { PublicationsRepository } from "../data/repositories/toteco/impl/PublicationsRepository";
import { SessionStoreFactory } from "../infrastructure/data/SessionStoreFactory";

export class ProfileViewModel {

    user?: UserData | undefined | null
    publications?: Publication[]
    following?: Friend[]
    followers?: Friend[]

    constructor() {
        makeAutoObservable(this)
        this.publications = []
        this.following = []
    }

    async getUser() {
        this.user = await SessionStoreFactory.getSessionStore().getUser()
    }

    async getPublications() {
        this.publications = await new PublicationsRepository().getByUserId(this.user!.id!)
        this.publications?.sort((a: Publication, b: Publication) => {
            if (a.created! < b.created!)
                return 1
            else if (a.created! > b.created!)
                return -1
            else
                return 0
        })
    }

    async getFriends() {
        this.following = await new FriendsRepository().getByFollower(this.user!.id!)
        this.followers = await new FriendsRepository().getByFollowing(this.user!.id!)
    }

    setUser(user: any) {
        this.user = user
    }

    async unfollow() {
        const userLogged = await SessionStoreFactory.getSessionStore().getUser()
        let index = 0
        const friend = this.followers?.find((v: Friend, i: number) => {
            if (v.follower.id === userLogged!.id && v.following.id === this.user!.id) {
                index = i
                return v
            }
        })
        await new FriendsRepository().delete(friend?.id!)
        this.followers?.splice(index!, 1)
    }

    async follow() {
        const userLogged = await SessionStoreFactory.getSessionStore().getUser()
        const friend = new FriendDTO(userLogged?.id!, this.user?.id!)
        const newFollower = await new FriendsRepository().save(friend)
        this.followers?.push(newFollower!)
    }
}