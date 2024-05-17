import { SessionStoreFactory } from "../../../infrastructure/data/SessionStoreFactory";
import { TotecoApi } from "../../../infrastructure/data/TotecoApiClient";
import { TotecoBaseRepository } from "../../../infrastructure/data/repositories/TotecoBaseRepository";
import { ErrorResponse } from "../../../infrastructure/exceptions/ErrorResponse";
import { EstablishmentDataDTO } from "../../model/Establishment";
import { IEstablishmentsApi } from "../IEstablishmentsApi";
import { LoginRepository } from "./LoginRepository";


export class EstablishmentsRepository extends TotecoBaseRepository<IEstablishmentsApi> {

    static tries = 0

    constructor() {
        super(TotecoApi.EstablishmentsApi, false)
    }

    async save(body: EstablishmentDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.save(body)
            return result.data
        } catch (e) {
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
                    this.save(body)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw e
            }
        }
    }

    async update(id: string, body: EstablishmentDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.update(id, body)
            return result.data
        } catch (e) {
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
                    this.update(id, body)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw e
            }
        }
    }

    async delete(id: string) {
        try {
            const client = await this.apiClient
            const result = await client.delete(id)
            return result.data
        } catch (e) {
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
                    this.delete(id)
                }
            } else {
                EstablishmentsRepository.tries = 0
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
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
                    this.getAll()
                }
            } else {
                EstablishmentsRepository.tries = 0
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
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
                    this.getById(id)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw e
            }
        }
    }

    async getByName(name: string) {
        try {
            const client = await this.apiClient
            const result = await client.getByName(name)
            return result.data
        } catch (e) {
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
                    this.getByName(name)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw e
            }
        }
    }
}