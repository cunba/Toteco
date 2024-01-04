import { SessionStoreFactory } from "../../../infrastructure/data/SessionStoreFactory";
import { TotecoApi } from "../../../infrastructure/data/TotecoApiClient";
import { TotecoBaseRepository } from "../../../infrastructure/data/repositories/TotecoBaseRepository";
import { ErrorResponse } from "../../../infrastructure/exceptions/ErrorResponse";
import { MenuDataDTO } from "../../model/Menu";
import { IMenusApi } from "../IMenusApi";
import { LoginRepository } from "./LoginRepository";


export class MenusRepository extends TotecoBaseRepository<IMenusApi> {

    static tries = 0

    constructor() {
        super(TotecoApi.MenusApi, false)
    }

    async save(body: MenuDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.save(body)
            return result.data
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    MenusRepository.tries++
                    this.save(body)
                }
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }

    async update(id: string, body: MenuDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.update(id, body)
            return result.data
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    MenusRepository.tries++
                    this.update(id, body)
                }
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }

    async deleteById(id: string) {
        try {
            const client = await this.apiClient
            const result = await client.delete(id)
            return result.data
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    MenusRepository.tries++
                    this.deleteById(id)
                }
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }

    async deleteAll() {
        try {
            const client = await this.apiClient
            const result = await client.deleteAll()
            return result.data
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                MenusRepository.tries++
                this.deleteAll()
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }

    async getAll() {
        try {
            const client = await this.apiClient
            const result = await client.getAll()
            return result.data
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    MenusRepository.tries++
                    this.getAll()
                }
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }

    async getById(id: string) {
        try {
            const client = await this.apiClient
            const result = await client.getById(id)
            return result.data
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    MenusRepository.tries++
                    this.getById(id)
                }
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }
}