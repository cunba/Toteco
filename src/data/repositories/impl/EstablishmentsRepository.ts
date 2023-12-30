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

    async saveEstablishment(body: EstablishmentDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.saveEstablishment(body)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    EstablishmentsRepository.tries++
                    this.saveEstablishment(body)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw e
            }
        }
    }

    async updateEstablishment(id: number, body: EstablishmentDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.updateEstablishment(id, body)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    EstablishmentsRepository.tries++
                    this.updateEstablishment(id, body)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw e
            }
        }
    }

    async updateEstablishmentScore(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.updateEstablishmentScore(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    EstablishmentsRepository.tries++
                    this.updateEstablishmentScore(id)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw e
            }
        }
    }

    async deleteEstablishmentById(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.deleteEstablishment(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    EstablishmentsRepository.tries++
                    this.deleteEstablishmentById(id)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw e
            }
        }
    }

    async getAllEstablishments() {
        try {
            const client = await this.apiClient
            const result = await client.getAllEstablishments()
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    EstablishmentsRepository.tries++
                    this.getAllEstablishments()
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw e
            }
        }
    }

    async getEstablishmentById(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.getEstablishmentById(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    EstablishmentsRepository.tries++
                    this.getEstablishmentById(id)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw e
            }
        }
    }

    async getEstablishmentsByDate(date: number) {
        try {
            const client = await this.apiClient
            const result = await client.getEstablishmentByDate(date)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    EstablishmentsRepository.tries++
                    this.getEstablishmentsByDate(date)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw e
            }
        }
    }

    async getEstablishmentsByDateBetween(minDate: number, maxDate: number) {
        try {
            const client = await this.apiClient
            const result = await client.getEstablishmentByDateBetween(minDate, maxDate)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    EstablishmentsRepository.tries++
                    this.getEstablishmentsByDateBetween(minDate, maxDate)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw e
            }
        }
    }

    async getEstablishmentsByOpen(open: boolean) {
        try {
            const client = await this.apiClient
            const result = await client.getEstablishmentByOpen(open)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    EstablishmentsRepository.tries++
                    this.getEstablishmentsByOpen(open)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw e
            }
        }
    }

    async getEstablishmentByName(name: string) {
        try {
            const client = await this.apiClient
            const result = await client.getEstablishmentByName(name)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    EstablishmentsRepository.tries++
                    this.getEstablishmentByName(name)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw e
            }
        }
    }

    async getEstablishmentsByScore(score: number) {
        try {
            const client = await this.apiClient
            const result = await client.getEstablishmentByScore(score)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    EstablishmentsRepository.tries++
                    this.getEstablishmentsByScore(score)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw e
            }
        }
    }

    async getEstablishmentsByScoreBetween(minScore: number, maxScore: number) {
        try {
            const client = await this.apiClient
            const result = await client.getEstablishmentByScoreBetween(minScore, maxScore)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    EstablishmentsRepository.tries++
                    this.getEstablishmentsByScoreBetween(minScore, maxScore)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw e
            }
        }
    }
}