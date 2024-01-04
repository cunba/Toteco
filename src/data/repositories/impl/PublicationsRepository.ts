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
            return result.data
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
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
            return result.data
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
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
            return result.data
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
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
            return result.data
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
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
            return result.data
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
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
            return result.data
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
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
            return result.data
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
                    this.getByUser(id)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }
}