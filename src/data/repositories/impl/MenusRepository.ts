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
            MenusRepository.tries = 0
            return result.data
        } catch (e) {
            if (MenusRepository.tries < 1) {
                MenusRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            MenusRepository.tries = 0
            return result.data
        } catch (e) {
            if (MenusRepository.tries < 1) {
                MenusRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            MenusRepository.tries = 0
            return result.data
        } catch (e) {
            if (MenusRepository.tries < 1) {
                MenusRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            MenusRepository.tries = 0
            return result.data
        } catch (e) {
            if (MenusRepository.tries < 1) {
                MenusRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
                    this.deleteAll()
                }
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
            MenusRepository.tries = 0
            return result.data
        } catch (e) {
            if (MenusRepository.tries < 1) {
                MenusRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            MenusRepository.tries = 0
            return result.data
        } catch (e) {
            if (MenusRepository.tries < 1) {
                MenusRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
                    this.getById(id)
                }
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }
}