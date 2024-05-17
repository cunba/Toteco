import { SessionStoreFactory } from "../../../infrastructure/data/SessionStoreFactory";
import { TotecoApi } from "../../../infrastructure/data/TotecoApiClient";
import { TotecoBaseRepository } from "../../../infrastructure/data/repositories/TotecoBaseRepository";
import { ErrorResponse } from "../../../infrastructure/exceptions/ErrorResponse";
import { PublicationDataDTO } from "../../model/Publication";
import { IPublicationsApi } from "../IPublicationsApi";
import { LoginRepository } from "./LoginRepository";


export class PublicationsRepository extends TotecoBaseRepository<IPublicationsApi> {

    static tries = 0

    constructor() {
        super(TotecoApi.PublicationsApi, false)
    }

    async save(body: PublicationDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.save(body)
            PublicationsRepository.tries = 0
            return result.data
        } catch (e) {
            if (PublicationsRepository.tries < 1) {
                PublicationsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
                    this.save(body)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async update(id: string, body: PublicationDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.update(id, body)
            PublicationsRepository.tries = 0
            return result.data
        } catch (e) {
            if (PublicationsRepository.tries < 1) {
                PublicationsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
                    this.update(id, body)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async delete(id: string) {
        try {
            const client = await this.apiClient
            const result = await client.delete(id)
            PublicationsRepository.tries = 0
            return result.data
        } catch (e) {
            if (PublicationsRepository.tries < 1) {
                PublicationsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
                    this.delete(id)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async getAll() {
        try {
            const client = await this.apiClient
            const result = await client.getAll()
            PublicationsRepository.tries = 0
            return result.data
        } catch (e) {
            if (PublicationsRepository.tries < 1) {
                PublicationsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
                    this.getAll()
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async getById(id: string) {
        try {
            const client = await this.apiClient
            const result = await client.getById(id)
            PublicationsRepository.tries = 0
            return result.data
        } catch (e) {
            if (PublicationsRepository.tries < 1) {
                PublicationsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
                    this.getById(id)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async getByEstablishment(id: string) {
        try {
            const client = await this.apiClient
            const result = await client.getByEstablishment(id)
            PublicationsRepository.tries = 0
            return result.data
        } catch (e) {
            if (PublicationsRepository.tries < 1) {
                PublicationsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
                    this.getByEstablishment(id)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async getByUser(id: string) {
        try {
            const client = await this.apiClient
            const result = await client.getByUser(id)
            PublicationsRepository.tries = 0
            return result.data
        } catch (e) {
            if (PublicationsRepository.tries < 1) {
                PublicationsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
                    this.getByUser(id)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }
}