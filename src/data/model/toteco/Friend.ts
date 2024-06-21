import { UserData } from "./User"

export class Friend {
    id: string
    follower: string
    following: UserData

    constructor(
        id: string,
        follower: string,
        following: UserData
    ) {
        this.id = id
        this.follower = follower
        this.following = following
    }
}

export class FriendDTO {
    id: string
    follower: string
    following: string

    constructor(
        id: string,
        follower: string,
        following: string
    ) {
        this.id = id
        this.follower = follower
        this.following = following
    }
}