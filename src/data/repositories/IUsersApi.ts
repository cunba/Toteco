import { UserData, UserDataDTO } from "../model/User"


export interface IUsersApi {

    activateUser(id: number): Promise<string>

    disableUser(id: number): Promise<string>

    getUserById(id: number): Promise<UserData>

    saveUser(body: UserDataDTO): Promise<UserData>

    updateUserMoneySpent(id: number): Promise<string>

    updateUserPassword(id: number): Promise<string>

    updateUserPublicationNumber(id: number): Promise<string>

}