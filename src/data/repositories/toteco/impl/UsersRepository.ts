import { firebaseStorage, supabase } from "../../../../App";
import { SessionStoreFactory } from "../../../../infrastructure/data/SessionStoreFactory";
import { UserDTO, UserData, UserUpdate } from "../../../model/toteco/User";
import { IUsersApi } from "../IUsersApi";


export class UsersRepository implements IUsersApi {

    static tries = 0

    async getUserLogged() {
        const token = await SessionStoreFactory.getSessionStore().getToken()
        const response = await supabase.auth.getUser(token!)
        if (response.error !== null && response.error !== undefined) {
            console.log(response.error)
            throw response.error
        }
        console.log(response.data)
        return response.data.user as UserData
    }

    async save(body: UserDTO) {
        const imageName = body.options.data.photo.substring(body.options.data.photo.lastIndexOf('/') + 1)
        const response = await firebaseStorage.ref(imageName).putFile(body.options.data.photo)
        if (response.state === 'success') {
            body.options.data.photo = await firebaseStorage.ref(imageName).getDownloadURL()
            const response = await supabase.auth.signUp(body)

            if (response.error !== null) {
                console.log(response.error)
                throw response.error
            }

            const userUpdate = new UserUpdate()
            userUpdate.fromUserDTO(body)
            const user = await supabase.auth.updateUser(userUpdate)
            return user.data.user as UserData
        } else {
            throw response.error
        }
    }

    async updateMoneySpent(money: number) {
        const user = await this.getUserLogged()
        user.user_metadata.moneySpent = user.user_metadata.moneySpent + money
        const userUpdate = new UserUpdate()
        userUpdate.fromUserData(user)
        const response = await supabase.auth.updateUser(userUpdate)

        if (response.error !== undefined && response.error !== null) {
            console.log(response.error)
            if (UsersRepository.tries < 1) {
                UsersRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.updateMoneySpent(money)
                }
            } else {
                UsersRepository.tries = 0
                throw response.error
            }
        } else {
            UsersRepository.tries = 0
            return response.data.user as UserData
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

    async updatePublicationsNumber(publicationsNumber: number) {
        const user = await this.getUserLogged()
        user.user_metadata.moneySpent = user.user_metadata.publicationsNumber + publicationsNumber
        const userUpdate = new UserUpdate()
        userUpdate.fromUserData(user)
        const response = await supabase.auth.updateUser(userUpdate)

        if (response.error !== undefined && response.error !== null) {
            console.log(response.error)
            if (UsersRepository.tries < 1) {
                UsersRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.updatePublicationsNumber(publicationsNumber)
                }
            } else {
                UsersRepository.tries = 0
                throw response.error
            }
        } else {
            UsersRepository.tries = 0
            return response.data.user as UserData
        }
    }
}