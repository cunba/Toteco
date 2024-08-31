import { Friend } from "./toteco/Friend"
import { UserData } from "./toteco/User"

export class UserListData {
    title: string
    userList: Friend[]

    constructor(title: string, userList: Friend[]) {
        this.title = title
        this.userList = userList
    }
}

export class UserRowData {
    user: UserData
    following: boolean
    friendId?: string

    constructor(user: UserData, following: boolean, friendId?: string) {
        this.user = user
        this.following = following
        this.friendId = friendId
    }
}