import { AxiosResponse } from "axios"
import { JwtRequestData, JwtResponseData } from "../model/Jwt"


export interface ILoginApi {

    login(jwtRequest: JwtRequestData): Promise<AxiosResponse<JwtResponseData>>

}