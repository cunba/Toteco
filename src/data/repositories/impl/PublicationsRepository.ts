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

    async savePublication(body: PublicationDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.savePublication(body)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
                    this.savePublication(body)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async updatePublication(id: number, body: PublicationDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.updatePublication(id, body)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
                    this.updatePublication(id, body)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async updatePublicationPriceAndScore(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.updatePublicationPriceAndScore(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
                    this.updatePublicationPriceAndScore(id)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async deletePublication(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.deletePublication(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
                    this.deletePublication(id)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async getAllPublications() {
        try {
            const client = await this.apiClient
            const result = await client.getAllPublications()
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
                    this.getAllPublications()
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async getPublicationById(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.getPublicationById(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
                    this.getPublicationById(id)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async getPublicationByDate(date: number) {
        try {
            const client = await this.apiClient
            const result = await client.getPublicationByDate(date)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
                    this.getPublicationByDate(date)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async getPublicationByDateBetween(minDate: number, maxDate: number) {
        try {
            const client = await this.apiClient
            const result = await client.getPublicationByDateBetween(minDate, maxDate)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
                    this.getPublicationByDateBetween(minDate, maxDate)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async getPublicationByDateBetweenAndPriceBetweenAndScoreBetween(minDate: number, maxDate: number, minPrice: number, maxPrice: number, minScore: number, maxScore: number) {
        try {
            const client = await this.apiClient
            const result = await client.getPublicationByDateBetweenAndPriceBetweenAndScoreBetween(minDate, maxDate, minPrice, maxPrice, minScore, maxScore)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
                    this.getPublicationByDateBetweenAndPriceBetweenAndScoreBetween(minDate, maxDate, minPrice, maxPrice, minScore, maxScore)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async getPublicationByPrice(price: number) {
        try {
            const client = await this.apiClient
            const result = await client.getPublicationByPrice(price)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
                    this.getPublicationByPrice(price)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async getPublicationByPriceBetween(minPrice: number, maxPrice: number) {
        try {
            const client = await this.apiClient
            const result = await client.getPublicationByPriceBetween(minPrice, maxPrice)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
                    this.getPublicationByPriceBetween(minPrice, maxPrice)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async getPublicationsByScore(score: number) {
        try {
            const client = await this.apiClient
            const result = await client.getPublicationsByScore(score)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
                    this.getPublicationsByScore(score)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async getPublicationByScoreBetween(minScore: number, maxScore: number) {
        try {
            const client = await this.apiClient
            const result = await client.getPublicationByScoreBetween(minScore, maxScore)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
                    this.getPublicationByScoreBetween(minScore, maxScore)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async getPublicationByEstablishmentId(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.getPublicationByEstablishmentId(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
                    this.getPublicationByEstablishmentId(id)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async getPublicationByUserId(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.getPublicationByUserId(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
                    this.getPublicationByUserId(id)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }

    async getPublicationByProductType(type: string) {
        try {
            const client = await this.apiClient
            const result = await client.getPublicationByProductType(type)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    PublicationsRepository.tries++
                    this.getPublicationByProductType(type)
                }
            } else {
                PublicationsRepository.tries = 0
                throw e
            }
        }
    }
}