import { UserData } from "../../model/toteco/User"


export interface IUsersApi {

    save: (body: UserData) => Promise<UserData>

    updateMoneySpentAndPublicationsNumber: (money: number, id: string) => Promise<UserData | undefined>

    getById: (id: string) => Promise<UserData | undefined>

    getByUsername: (username: string) => Promise<UserData | undefined>

    userExists: (username: string, email: string) => Promise<boolean>

    // updatePassword(password: string): Promise<UserData | undefined>

}