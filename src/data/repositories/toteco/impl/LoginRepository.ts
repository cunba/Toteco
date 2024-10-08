import { TotecoApi } from "../../../../infrastructure/data/TotecoApiClient";
import { TotecoBaseRepository } from "../../../../infrastructure/data/repositories/TotecoBaseRepository";
import { LoginRequestData } from "../../../model/toteco/LoginData";
import { ILoginApi } from "../ILoginApi";


export class LoginRepository extends TotecoBaseRepository<ILoginApi> {

    constructor() {
        super(TotecoApi.LoginApi, false)
    }

    async login(loginRequest: LoginRequestData) {
        try {
            const client = await this.apiClient
            const result = await client.login(loginRequest)
            return result.data
        } catch (e) {
            throw e
        }
    }
}