import { ProductDTO } from "../../../client";
import { SessionStoreFactory } from "../../../infrastructure/data/SessionStoreFactory";
import { TotecoApi } from "../../../infrastructure/data/TotecoApiClient";
import { TotecoBaseRepository } from "../../../infrastructure/data/repositories/TotecoBaseRepository";
import { ErrorResponse } from "../../../infrastructure/exceptions/ErrorResponse";
import { IProductsApi } from "../IProductsApi";
import { LoginRepository } from "./LoginRepository";


export class ProductsRepository extends TotecoBaseRepository<IProductsApi> {

    static tries = 0

    constructor() {
        super(TotecoApi.ProductsApi, false)
    }

    async save(productDTO: ProductDTO) {
        try {
            const client = await this.apiClient
            const result = await client.save(productDTO)
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
                    this.save(productDTO)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async update(productDTO: ProductDTO) {
        try {
            const client = await this.apiClient
            const result = await client.update(productDTO)
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
                    this.update(productDTO)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async delete(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.delete(id)
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
                    this.delete(id)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async findAll() {
        try {
            const client = await this.apiClient
            const result = await client.findAll()
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
                    this.findAll()
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async findById(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.findById(id)
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
                    this.findById(id)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async findByDate(date: number) {
        try {
            const client = await this.apiClient
            const result = await client.findByDate(date)
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
                    this.findByDate(date)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async findBetweenDates(minDate: number, maxDate: number) {
        try {
            const client = await this.apiClient
            const result = await client.findBetweenDates(minDate, maxDate)
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
                    this.findBetweenDates(minDate, maxDate)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async findInMenu(inMenu: boolean) {
        try {
            const client = await this.apiClient
            const result = await client.findInMenu(inMenu)
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
                    this.findInMenu(inMenu)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async updatePrice(id: number, price: number) {
        try {
            const client = await this.apiClient
            const result = await client.updatePrice(id, price)
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
                    this.updatePrice(id, price)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async findByPrice(price: number) {
        try {
            const client = await this.apiClient
            const result = await client.findByPrice(price)
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
                    this.findByPrice(price)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async findBetweenPrices(minPrice: number, maxPrice: number) {
        try {
            const client = await this.apiClient
            const result = await client.findBetweenPrices(minPrice, maxPrice)
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
                    this.findBetweenPrices(minPrice, maxPrice)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async updateScore(id: number, score: number) {
        try {
            const client = await this.apiClient
            const result = await client.updateScore(id, score)
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
                    this.updateScore(id, score)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async findByScore(score: number) {
        try {
            const client = await this.apiClient
            const result = await client.findByScore(score)
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
                    this.findByScore(score)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async findBetweenScores(minScore: number, maxScore: number) {
        try {
            const client = await this.apiClient
            const result = await client.findBetweenScores(minScore, maxScore)
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
                    this.findBetweenScores(minScore, maxScore)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async findByType(typeId: number) {
        try {
            const client = await this.apiClient
            const result = await client.findByType(typeId)
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
                    this.findByType(typeId)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async findByMenu(menuId: number) {
        try {
            const client = await this.apiClient
            const result = await client.findByMenu(menuId)
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
                    this.findByMenu(menuId)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }

    async findByPublication(publicationId: number) {
        try {
            const client = await this.apiClient
            const result = await client.findByPublication(publicationId)
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
                    this.findByPublication(publicationId)
                }
            } else {
                ProductsRepository.tries = 0
                throw e
            }
        }
    }
}