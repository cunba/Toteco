import { ProductDTO } from "../../../client";
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

    async saveProduct(productDTO: ProductDTO) {
        try {
            const client = await this.apiClient
            const result = await client.saveProduct(productDTO)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.saveProduct(productDTO)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async updateProduct(id: number, body: ProductDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.updateProduct(id, body)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.updateProduct(id, body)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async deleteProductById(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.deleteProductById(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.deleteProductById(id)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async getAllProducts() {
        try {
            const client = await this.apiClient
            const result = await client.getAllProducts()
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.getAllProducts()
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async getProductById(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.getProductById(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.getProductById(id)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async getProductsByDate(date: number) {
        try {
            const client = await this.apiClient
            const result = await client.getProductsByDate(date)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.getProductsByDate(date)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async getProductsByDateBetween(minDate: number, maxDate: number) {
        try {
            const client = await this.apiClient
            const result = await client.getProductsByDateBetween(minDate, maxDate)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.getProductsByDateBetween(minDate, maxDate)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async getProductsByInMenu(inMenu: boolean) {
        try {
            const client = await this.apiClient
            const result = await client.getProductsByInMenu(inMenu)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.getProductsByInMenu(inMenu)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async updateProductsPrice(id: number, price: number) {
        try {
            const client = await this.apiClient
            const result = await client.updateProductsPrice(id, price)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.updateProductsPrice(id, price)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async getProductsByPrice(price: number) {
        try {
            const client = await this.apiClient
            const result = await client.getProductsByPrice(price)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.getProductsByPrice(price)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async getProductsByPriceBetween(minPrice: number, maxPrice: number) {
        try {
            const client = await this.apiClient
            const result = await client.getProductsByPriceBetween(minPrice, maxPrice)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.getProductsByPriceBetween(minPrice, maxPrice)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async updateProductsScore(id: number, score: number) {
        try {
            const client = await this.apiClient
            const result = await client.updateProductsScore(id, score)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.updateProductsScore(id, score)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async getProductsByScore(score: number) {
        try {
            const client = await this.apiClient
            const result = await client.getProductsByScore(score)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.getProductsByScore(score)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async getProductsByScoreBetween(minScore: number, maxScore: number) {
        try {
            const client = await this.apiClient
            const result = await client.getProductsByScoreBetween(minScore, maxScore)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.getProductsByScoreBetween(minScore, maxScore)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async getProductsByTypeId(typeId: number) {
        try {
            const client = await this.apiClient
            const result = await client.getProductsByTypeId(typeId)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.getProductsByTypeId(typeId)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async getProductsByMenuId(menuId: number) {
        try {
            const client = await this.apiClient
            const result = await client.getProductsByMenuId(menuId)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.getProductsByMenuId(menuId)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async getProductsByPublicationId(publicationId: number) {
        try {
            const client = await this.apiClient
            const result = await client.getProductsByPublicationId(publicationId)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    ProductsRepository.tries++
                    this.getProductsByPublicationId(publicationId)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }
}