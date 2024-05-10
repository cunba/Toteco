import { TotecoApi } from "../../../infrastructure/data/TotecoApiClient";
import { TotecoBaseRepository } from "../../../infrastructure/data/repositories/TotecoBaseRepository";
import { JwtRequestData } from "../../model/LoginData";
import { ILoginApi } from "../ILoginApi";


export class LoginRepository extends TotecoBaseRepository<ILoginApi> {

    static tries = 0

    constructor() {
        super(TotecoApi.LoginApi, false)
    }

    async login(jwtRequest: JwtRequestData) {
        try {
            const client = await this.apiClient
            const result = await client.login(jwtRequest)
            return result.data
        } catch (e) {
            throw e
        }
    }
}