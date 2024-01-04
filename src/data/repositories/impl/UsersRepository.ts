import { SessionStoreFactory } from "../../../infrastructure/data/SessionStoreFactory";
import { TotecoApi } from "../../../infrastructure/data/TotecoApiClient";
import { TotecoBaseRepository } from "../../../infrastructure/data/repositories/TotecoBaseRepository";
import { ErrorResponse } from "../../../infrastructure/exceptions/ErrorResponse";
import { UserDataDTO } from "../../model/User";
import { IUsersApi } from "../IUsersApi";
import { LoginRepository } from "./LoginRepository";


export class UsersRepository extends TotecoBaseRepository<IUsersApi> {

    static tries = 0

    constructor() {
        super(TotecoApi.UsersApi, false)
    }

    async activate(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.activate(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    UsersRepository.tries++
                    this.activate(id)
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }

    async disable(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.disable(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    UsersRepository.tries++
                    this.disable(id)
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }

    async getById(id: string) {
        try {
            const client = await this.apiClient
            const result = await client.getById(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    UsersRepository.tries++
                    this.getById(id)
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }

    async save(body: UserDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.save(body)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    UsersRepository.tries++
                    this.save(body)
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }

    async updateMoneySpent(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.updateMoneySpent(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    UsersRepository.tries++
                    this.updateMoneySpent(id)
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }

    async updatePassword(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.updatePassword(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    UsersRepository.tries++
                    this.updatePassword(id)
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }

    async updatePublicationsNumber(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.updatePublicationsNumber(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    UsersRepository.tries++
                    this.updatePublicationsNumber(id)
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }

    async getByUsername(username: string) {
        try {
            const client = await this.apiClient
            const result = await client.getByUsername(username)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    UsersRepository.tries++
                    this.getByUsername(username)
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }

    async getByEmail(email: string) {
        try {
            const client = await this.apiClient
            const result = await client.getByEmail(email)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    UsersRepository.tries++
                    this.getByEmail(email)
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }

    async getRecoveryCode(id: string) {
        try {
            const client = await this.apiClient
            const result = await client.getRecoveryCode(id)
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    UsersRepository.tries++
                    this.getRecoveryCode(id)
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }

    async getUserLogged() {
        try {
            const client = await this.apiClient
            const result = await client.getUserLogged()
            return result
        } catch (e) {
            if (LoginRepository.tries < 1) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const jwtResponse = await new LoginRepository().login(credentials!)

                if (jwtResponse instanceof ErrorResponse) {
                    throw jwtResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(jwtResponse.token)
                    UsersRepository.tries++
                    this.getUserLogged()
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }
}