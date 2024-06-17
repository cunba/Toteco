import { firebaseStorage, supabase } from "../../../../App";
import { SessionStoreFactory } from "../../../../infrastructure/data/SessionStoreFactory";
import { UserData } from "../../../model/toteco/User";
import { IUsersApi } from "../IUsersApi";


export class UsersRepository implements IUsersApi {

    static tries = 0
    tableName = 'users_public'

    async save(body: UserData) {
        const imageName = body.photo.substring(body.photo.lastIndexOf('/') + 1)
        const response = await firebaseStorage.ref(imageName).putFile(body.photo)
        if (response.state === 'success') {
            body.photo = await firebaseStorage.ref(imageName).getDownloadURL()
            const response = await supabase.from(this.tableName).insert(body).select()

            if (response.error !== null) {
                console.log(response.error)
                throw response.error
            }
            return response.data[0] as UserData
        } else {
            throw response.error
        }
    }

    async updateMoneySpentAndPublicationsNumber(money: number, id: string) {
        const user = await SessionStoreFactory.getSessionStore().getUser()
        const response = await supabase.from(this.tableName).update({ money_spent: user?.money_spent! + money, publications_number: user!.publications_number++ }).eq('id', id).select()

        if (response.error !== undefined && response.error !== null) {
            console.log(response.error)
            if (UsersRepository.tries < 1) {
                UsersRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log(response.error)
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.updateMoneySpentAndPublicationsNumber(money, id)
                }
            } else {
                UsersRepository.tries = 0
                console.log(response.error)
                throw response.error
            }
        } else {
            UsersRepository.tries = 0
            return response.data[0] as UserData
        }
    }

    async getById(id: string) {
        const response = await supabase.from(this.tableName).select().eq('id', id)

        if (response.error !== undefined && response.error !== null) {
            console.log(response.error)
            if (UsersRepository.tries < 1) {
                UsersRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log(response.error)
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getById(id)
                }
            } else {
                UsersRepository.tries = 0
                console.log(response.error)
                throw response.error
            }
        } else if (response.count === 0) {
            throw {
                code: 404,
                message: 'User not found'
            }
        } else {
            UsersRepository.tries = 0
            return response.data[0] as UserData
        }
    }

    // async updatePassword(password: string) {
    //     try {
    //         const client = await this.apiClient
    //         const result = await client.updatePassword(id)
    //         UsersRepository.tries = 0
    //         return result.data
    //     } catch (e) {
    //         if (UsersRepository.tries < 1) {
    //             UsersRepository.tries++
    //             const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
    //             const loginResponse = await new LoginRepository().login(credentials!)

    //             if (loginResponse instanceof ErrorResponse) {
    //                 throw loginResponse
    //             } else {
    //                 SessionStoreFactory.getSessionStore().setToken(loginResponse.token)
    //                 this.updatePassword(id)
    //             }
    //         } else {
    //             UsersRepository.tries = 0
    //             throw e
    //         }
    //     }
    // }
}