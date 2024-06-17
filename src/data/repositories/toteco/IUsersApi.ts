import { UserDTO, UserData } from "../../model/toteco/User"


export interface IUsersApi {

    getUserLogged: () => Promise<UserData>

    save: (bodyDTO: UserDTO) => Promise<UserData>

    updateMoneySpent(money: number): Promise<UserData | undefined>

    // updatePassword(password: string): Promise<UserData | undefined>

    updatePublicationsNumber(publicationsNumber: number): Promise<UserData | undefined>

}