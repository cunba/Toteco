import { AxiosResponse } from "axios"
import { JwtRequestData, JwtResponseData } from "../../model/toteco/LoginData"


export interface ILoginApi {

    login(jwtRequest: JwtRequestData): Promise<AxiosResponse<JwtResponseData>>

}