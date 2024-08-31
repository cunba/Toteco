import { makeAutoObservable } from "mobx";
import { Friend, FriendDTO } from "../data/model/toteco/Friend";
import { UserData } from "../data/model/toteco/User";
import { UserRowData } from "../data/model/UserListData";
import { FriendsRepository } from "../data/repositories/toteco/impl/FriendsRepository";
import { SessionStoreFactory } from "../infrastructure/data/SessionStoreFactory";

export class UserListViewModel {

    user: UserData | undefined | null
    userList: UserRowData[]
    following?: Friend[]

    constructor() {
        makeAutoObservable(this)
        this.userList = []
        this.following = []
        this.getUser()
    }

    async getUser() {
        this.user = await SessionStoreFactory.getSessionStore().getUser()
        this.following = await new FriendsRepository().getByFollower(this.user!.id!)
    }

    setUserList(type: 'follower' | 'following', list: Friend[]) {
        if (type === 'follower')
            list.map(value => {
                let index = -1
                const friend = this.following?.find((v: Friend, i: number) => {
                    if (v.follower.id === this.user!.id && v.following.id === value.follower.id) {
                        index = i
                        return v
                    }
                })
                this.userList.push(new UserRowData(value.follower, index >= 0, friend?.id))
            })
        else
            list.map(value => {
                let index = -1
                const friend = this.following?.find((v: Friend, i: number) => {
                    if (v.follower.id === this.user!.id && v.following.id === value.following.id) {
                        index = i
                        return v
                    }
                })
                this.userList.push(new UserRowData(value.following, index >= 0, friend?.id))
            })
    }

    async getUsers() {

    }

    async unfollow(rowData: UserRowData) {
        const response = await new FriendsRepository().delete(rowData.friendId!)
        const index = this.userList.findIndex(value => value.friendId === rowData.friendId)
        this.userList[index].following = false
    }

    async follow(user: UserRowData) {
        const friend = new FriendDTO(this.user!.id!, user.user.id!)
        const newFollower = await new FriendsRepository().save(friend)
        const index = this.userList.findIndex(value => value === user)
        this.userList[index].following = true
        this.userList[index].friendId = newFollower!.id
    }
}