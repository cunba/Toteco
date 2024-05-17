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
            ProductsRepository.tries = 0
            return result.data
        } catch (e) {
            if (ProductsRepository.tries < 1) {
                ProductsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            ProductsRepository.tries = 0
            return result.data
        } catch (e) {
            if (ProductsRepository.tries < 1) {
                ProductsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            ProductsRepository.tries = 0
            return result.data
        } catch (e) {
            if (ProductsRepository.tries < 1) {
                ProductsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            ProductsRepository.tries = 0
            return result.data
        } catch (e) {
            if (ProductsRepository.tries < 1) {
                ProductsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            ProductsRepository.tries = 0
            return result.data
        } catch (e) {
            if (ProductsRepository.tries < 1) {
                ProductsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            ProductsRepository.tries = 0
            return result.data
        } catch (e) {
            if (ProductsRepository.tries < 1) {
                ProductsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            ProductsRepository.tries = 0
            return result.data
        } catch (e) {
            if (ProductsRepository.tries < 1) {
                ProductsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
                    this.getByPublication(publicationId)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }
}