import { JwtRequestData, JwtResponseData } from "../model/Jwt"


export interface ILoginApi {

    login(jwtRequest: JwtRequestData): Promise<JwtResponseData>

}