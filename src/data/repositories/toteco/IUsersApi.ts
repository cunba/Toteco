import { AxiosResponse } from "axios"
import { IGlobalRepository } from "../../../infrastructure/data/repositories/IGlobalRespository"
import { UserData, UserDataDTO } from "../../model/toteco/User"


export interface IUsersApi extends IGlobalRepository<UserData, UserDataDTO> {

    getByUsername(username: string): Promise<AxiosResponse<UserData[]>>

    getByEmail(email: string): Promise<AxiosResponse<UserData[]>>

    getRecoveryCode(id: string): Promise<AxiosResponse<number>>

    getUserLogged(): Promise<AxiosResponse<UserData>>

    activate(id: string): Promise<AxiosResponse<string>>

    disable(id: string): Promise<AxiosResponse<string>>

    updateMoneySpent(id: string): Promise<AxiosResponse<string>>

    updatePassword(id: string): Promise<AxiosResponse<string>>

    updatePublicationsNumber(id: string): Promise<AxiosResponse<string>>

    updateRecoveryCode(id: string, code: number): Promise<AxiosResponse<string>>

}