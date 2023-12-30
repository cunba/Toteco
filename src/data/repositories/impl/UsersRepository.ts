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

    async activateUser(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.activateUser(id)
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
                    this.activateUser(id)
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }

    async disableUser(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.disableUser(id)
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
                    this.disableUser(id)
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }

    async getUserById(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.getUserById(id)
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
                    this.getUserById(id)
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }

    async saveUser(body: UserDataDTO) {
        try {
            const client = await this.apiClient
            const result = await client.saveUser(body)
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
                    this.saveUser(body)
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }

    async updateUserMoneySpent(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.updateUserMoneySpent(id)
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
                    this.updateUserMoneySpent(id)
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }

    async updateUserPassword(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.updateUserPassword(id)
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
                    this.updateUserPassword(id)
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }

    async updateUserPublicationNumber(id: number) {
        try {
            const client = await this.apiClient
            const result = await client.updateUserPublicationNumber(id)
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
                    this.updateUserPublicationNumber(id)
                }
            } else {
                UsersRepository.tries = 0
                throw e
            }
        }
    }
}