import { ErrorResponse } from "../../infrastructure/exceptions/ErrorResponse"
import { JwtRequestData, JwtResponseData } from "../model/Jwt"


export interface ILoginApi {

    login(jwtRequest: JwtRequestData): Promise<JwtResponseData | ErrorResponse>

}