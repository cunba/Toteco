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

    async saveMenu(body: MenuDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.saveMenu(body)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    MenusRepository.tries++
                    this.saveMenu(body)
                }
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }

    async updateMenu(id: number, body: MenuDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.updateMenu(id, body)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    MenusRepository.tries++
                    this.updateMenu(id, body)
                }
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }

    async deleteMenuById(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.deleteMenu(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    MenusRepository.tries++
                    this.deleteMenuById(id)
                }
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }

    async getAllMenus() {
        try {
            const client = await this.apiClient
            const result = await client.getAllMenus()
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    MenusRepository.tries++
                    this.getAllMenus()
                }
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }

    async getMenuById(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.getMenuById(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    MenusRepository.tries++
                    this.getMenuById(id)
                }
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }

    async getMenusByDate(date: number) {
        try {
            const client = await this.apiClient
            const result = await client.getMenuByDate(date)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    MenusRepository.tries++
                    this.getMenusByDate(date)
                }
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }

    async getMenusByDateBetween(minDate: number, maxDate: number) {
        try {
            const client = await this.apiClient
            const result = await client.getMenuByDateBetween(minDate, maxDate)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    MenusRepository.tries++
                    this.getMenusByDateBetween(minDate, maxDate)
                }
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }

    async getMenusByPrice(price: number) {
        try {
            const client = await this.apiClient
            const result = await client.getMenuByPrice(price)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    MenusRepository.tries++
                    this.getMenusByPrice(price)
                }
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }

    async getMenusByPriceBetween(minPrice: number, maxPrice: number) {
        try {
            const client = await this.apiClient
            const result = await client.getMenuByPriceBetween(minPrice, maxPrice)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    MenusRepository.tries++
                    this.getMenusByPriceBetween(minPrice, maxPrice)
                }
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }

    async getMenusByScore(score: number) {
        try {
            const client = await this.apiClient
            const result = await client.getMenuByScore(score)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    MenusRepository.tries++
                    this.getMenusByScore(score)
                }
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }

    async getMenusByScoreBetween(minScore: number, maxScore: number) {
        try {
            const client = await this.apiClient
            const result = await client.getMenuByScoreBetween(minScore, maxScore)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    MenusRepository.tries++
                    this.getMenusByScoreBetween(minScore, maxScore)
                }
            } else {
                MenusRepository.tries = 0
                throw e
            }
        }
    }
}