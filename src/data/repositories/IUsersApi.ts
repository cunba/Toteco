import { IGlobalRepository } from "../../infrastructure/data/repositories/IGlobalRespository"
import { UserData, UserDataDTO } from "../model/User"


export interface IUsersApi extends IGlobalRepository<UserData, UserDataDTO> {

    getByUsername(username: string): Promise<UserData[]>

    getByEmail(email: string): Promise<UserData[]>

    getRecoveryCode(id: string): Promise<number>

    getUserLogged(): Promise<UserData>

    activate(id: number): Promise<string>

    disable(id: number): Promise<string>

    updateMoneySpent(id: number): Promise<string>

    updatePassword(id: number): Promise<string>

    updatePublicationsNumber(id: number): Promise<string>

}