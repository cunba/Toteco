import { AxiosResponse } from "axios"
import { JwtRequestData, JwtResponseData } from "../model/LoginData"


export interface ILoginApi {

    login(jwtRequest: JwtRequestData): Promise<AxiosResponse<JwtResponseData>>

}