import { AxiosResponse } from "axios"
import { IGlobalRepository } from "../../infrastructure/data/repositories/IGlobalRespository"
import { UserData, UserDataDTO } from "../model/User"


export interface IUsersApi extends IGlobalRepository<UserData, UserDataDTO> {

    getByUsername(username: string): Promise<AxiosResponse<UserData[]>>

    getByEmail(email: string): Promise<AxiosResponse<UserData[]>>

    getRecoveryCode(id: string): Promise<AxiosResponse<number>>

    getUserLogged(): Promise<AxiosResponse<UserData>>

    activate(id: number): Promise<AxiosResponse<string>>

    disable(id: number): Promise<AxiosResponse<string>>

    updateMoneySpent(id: number): Promise<AxiosResponse<string>>

    updatePassword(id: number): Promise<AxiosResponse<string>>

    updatePublicationsNumber(id: number): Promise<AxiosResponse<string>>

}