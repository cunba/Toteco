import { SessionStoreFactory } from "../../../infrastructure/data/SessionStoreFactory";
import { TotecoApi } from "../../../infrastructure/data/TotecoApiClient";
import { TotecoBaseRepository } from "../../../infrastructure/data/repositories/TotecoBaseRepository";
import { ErrorResponse } from "../../../infrastructure/exceptions/ErrorResponse";
import { ProductDataDTO } from "../../model/Product";
import { IProductsApi } from "../IProductsApi";
import { LoginRepository } from "./LoginRepository";


export class ProductsRepository extends TotecoBaseRepository<IProductsApi> {

    static tries = 0

    constructor() {
        super(TotecoApi.ProductsApi, false)
    }

    async save(productDTO: ProductDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.save(productDTO)
            return result.data
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.save(productDTO)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async update(id: string, body: ProductDataDTO) {
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
                    ProductsRepository.tries++
                    this.update(id, body)
                }
            } else {
                ProductsRepository.tries = 0
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
                    ProductsRepository.tries++
                    this.delete(id)
                }
            } else {
                ProductsRepository.tries = 0
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
                    ProductsRepository.tries++
                    this.getAll()
                }
            } else {
                ProductsRepository.tries = 0
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
                    ProductsRepository.tries++
                    this.getById(id)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async getByMenu(menuId: string) {
        try {
            const client = await this.apiClient
            const result = await client.getByMenu(menuId)
            return result.data
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.getByMenu(menuId)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async getByPublication(publicationId: string) {
        try {
            const client = await this.apiClient
            const result = await client.getByPublication(publicationId)
            return result.data
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.getByPublication(publicationId)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }
}