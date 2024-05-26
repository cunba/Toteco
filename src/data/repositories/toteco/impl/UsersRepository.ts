import { SessionStoreFactory } from "../../../../infrastructure/data/SessionStoreFactory";
import { TotecoApi } from "../../../../infrastructure/data/TotecoApiClient";
import { TotecoBaseRepository } from "../../../../infrastructure/data/repositories/TotecoBaseRepository";
import { ErrorResponse } from "../../../../infrastructure/exceptions/ErrorResponse";
import { UserDataDTO } from "../../../model/toteco/User";
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
            UsersRepository.tries = 0
            return result.data
        } catch (e) {
            if (UsersRepository.tries < 1) {
                UsersRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            UsersRepository.tries = 0
            return result.data
        } catch (e) {
            if (UsersRepository.tries < 1) {
                UsersRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            UsersRepository.tries = 0
            return result.data
        } catch (e) {
            if (UsersRepository.tries < 1) {
                UsersRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            return result.data
        } catch (e) {
            throw e
        }
    }

    async updateMoneySpent(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.updateMoneySpent(id)
            UsersRepository.tries = 0
            return result.data
        } catch (e) {
            if (UsersRepository.tries < 1) {
                UsersRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            UsersRepository.tries = 0
            return result.data
        } catch (e) {
            if (UsersRepository.tries < 1) {
                UsersRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            UsersRepository.tries = 0
            return result.data
        } catch (e) {
            if (UsersRepository.tries < 1) {
                UsersRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            UsersRepository.tries = 0
            return result.data
        } catch (e) {
            if (UsersRepository.tries < 1) {
                UsersRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            UsersRepository.tries = 0
            return result.data
        } catch (e) {
            if (UsersRepository.tries < 1) {
                UsersRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            UsersRepository.tries = 0
            return result.data
        } catch (e) {
            if (UsersRepository.tries < 1) {
                UsersRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
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
            UsersRepository.tries = 0
            return result.data
        } catch (e) {
            if (UsersRepository.tries < 1) {
                UsersRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const loginResponse = await new LoginRepository().login(credentials!)

                if (loginResponse instanceof ErrorResponse) {
                    throw loginResponse
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
                    this.getUserLogged()
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }
}