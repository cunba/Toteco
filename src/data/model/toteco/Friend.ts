import { UserData } from "./User"

export class Friend {
    id: string
    follower: UserData
    following: UserData

    constructor(
        id: string,
        follower: UserData,
        following: UserData
    ) {
        this.id = id
        this.follower = follower
        this.following = following
    }
}

export class FriendDTO {
    follower: string
    following: string

    constructor(
        follower: string,
        following: string
    ) {
        this.follower = follower
        this.following = following
    }
}