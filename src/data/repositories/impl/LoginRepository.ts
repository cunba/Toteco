import { JwtRequest } from "../../../client";
import { TotecoApi } from "../../../infrastructure/data/TotecoApiClient";
import { TotecoBaseRepository } from "../../../infrastructure/data/repositories/TotecoBaseRepository";
import { ILoginApi } from "../ILoginApi";


export class LoginRepository extends TotecoBaseRepository<ILoginApi> {

    static tries = 0

    constructor() {
        super(TotecoApi.LoginApi, false)
    }

    async login(jwtRequest: JwtRequest) {
        try {
            const client = await this.apiClient
            const result = await client.login(jwtRequest)
            return result
        } catch (e) {
            throw e
        }
    }
}