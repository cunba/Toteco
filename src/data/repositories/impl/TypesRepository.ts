import { SessionStoreFactory } from "../../../infrastructure/data/SessionStoreFactory";
import { TotecoApi } from "../../../infrastructure/data/TotecoApiClient";
import { TotecoBaseRepository } from "../../../infrastructure/data/repositories/TotecoBaseRepository";
import { ErrorResponse } from "../../../infrastructure/exceptions/ErrorResponse";
import { TypeDataDTO } from "../../model/Type";
import { ITypesApi } from "../ITypesApi";
import { LoginRepository } from "./LoginRepository";


export class TypesRepository extends TotecoBaseRepository<ITypesApi> {

    static tries = 0

    constructor() {
        super(TotecoApi.ProductTypesApi, false)
    }

    async saveType(body: TypeDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.saveType(body)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    TypesRepository.tries++
                    this.saveType(body)
                }
            } else {
                TypesRepository.tries = 0
                throw e
            }
        }
    }

    async updateType(id: number, body: TypeDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.updateType(id, body)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    TypesRepository.tries++
                    this.updateType(id, body)
                }
            } else {
                TypesRepository.tries = 0
                throw e
            }
        }
    }

    async deleteTypeById(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.deleteType(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    TypesRepository.tries++
                    this.deleteTypeById(id)
                }
            } else {
                TypesRepository.tries = 0
                throw e
            }
        }
    }

    async getAllTypes() {
        try {
            const client = await this.apiClient
            const result = await client.getAllTypes()
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    TypesRepository.tries++
                    this.getAllTypes()
                }
            } else {
                TypesRepository.tries = 0
                throw e
            }
        }
    }

    async getTypeById(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.getTypeById(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    TypesRepository.tries++
                    this.getTypeById(id)
                }
            } else {
                TypesRepository.tries = 0
                throw e
            }
        }
    }

    async getTypeByName(name: string) {
        try {
            const client = await this.apiClient
            const result = await client.getTypeByName(name)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    TypesRepository.tries++
                    this.getTypeByName(name)
                }
            } else {
                TypesRepository.tries = 0
                throw e
            }
        }
    }

    async getTypeByNameAndType(name: string, type: string) {
        try {
            const client = await this.apiClient
            const result = await client.getTypeByNameAndType(name, type)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    TypesRepository.tries++
                    this.getTypeByNameAndType(name, type)
                }
            } else {
                TypesRepository.tries = 0
                throw e
            }
        }
    }

    async getTypeByType(type: string) {
        try {
            const client = await this.apiClient
            const result = await client.getTypeByType(type)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    TypesRepository.tries++
                    this.getTypeByType(type)
                }
            } else {
                TypesRepository.tries = 0
                throw e
            }
        }
    }
}