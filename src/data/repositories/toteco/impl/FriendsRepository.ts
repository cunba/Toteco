import { supabase } from "../../../../App";
import { SessionStoreFactory } from "../../../../infrastructure/data/SessionStoreFactory";
import i18n from "../../../../infrastructure/localization/i18n";
import { Friend, FriendDTO } from "../../../model/toteco/Friend";
import { IFriendsApi } from "../IFirendsApi";
import { UsersRepository } from "./UsersRepository";


export class FriendsRepository implements IFriendsApi {

    static tries = 0
    tableName = 'friends'

    async save(body: FriendDTO) {
        const response = await supabase.from(this.tableName).insert(body).select()

        if (response.error !== null) {
            if (FriendsRepository.tries < 1) {
                FriendsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log('save frined error')
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.save(body)
                }
            } else {
                FriendsRepository.tries = 0
                console.log('save frined error')
                throw response.error
            }
        } else {
            FriendsRepository.tries = 0
            const following = await new UsersRepository().getById(response.data[0].following)
            const follower = await new UsersRepository().getById(response.data[0].follower)
            const friend = new Friend(response.data[0].id, follower!, following!)
            return friend
        }
    }

    async update(id: string, body: Friend) {
        const response = await supabase.from(this.tableName).update(body).eq('id', id).select()

        if (response.error !== null) {
            if (FriendsRepository.tries < 1) {
                FriendsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log('update friend error')
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.update(id, body)
                }
            } else {
                FriendsRepository.tries = 0
                console.log('update friend error')
                throw response.error
            }
        } else {
            FriendsRepository.tries = 0
            return response.data[0]
        }
    }

    async delete(id: string) {
        const response = await supabase.from(this.tableName).delete().eq('id', id).select()

        if (response.error !== null) {
            console.log(response.error)
            if (FriendsRepository.tries < 1) {
                FriendsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log('delete friend error')
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.delete(id)
                }
            } else {
                FriendsRepository.tries = 0
                console.log('delete friend error')
                throw response.error
            }
        } else {
            FriendsRepository.tries = 0
            return response.data[0]
        }
    }

    async getAll() {
        const response = await supabase.from(this.tableName).select()

        if (response.error !== null) {
            if (FriendsRepository.tries < 1) {
                FriendsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log('get all friends error')
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getAll()
                }
            } else {
                FriendsRepository.tries = 0
                console.log('get all friends error')
                throw response.error
            }
        } else {
            FriendsRepository.tries = 0
            const friends = [] as Friend[]
            for (let i = 0; i < friends.length; i++) {
                const following = await new UsersRepository().getById(response.data[i].following)
                const follower = await new UsersRepository().getById(response.data[i].follower)
                friends.push(new Friend(response.data[i].id, follower!, following!))
            }
            return friends
        }
    }

    async getById(id: string) {
        const response = await supabase.from(this.tableName).select().eq('id', id)

        if (response.error !== null) {
            if (FriendsRepository.tries < 1) {
                FriendsRepository.tries++
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log('get friend by id error')
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getById(id)
                }
            } else {
                FriendsRepository.tries = 0
                console.log('get friend by id error')
                throw response.error
            }
        } else if (response.count === 0) {
            console.log('get friend by id error')
            throw {
                code: 404,
                message: i18n.t('repositories.friends.not_found')
            }
        } else {
            FriendsRepository.tries = 0
            const following = await new UsersRepository().getById(response.data[0].following)
            const follower = await new UsersRepository().getById(response.data[0].follower)
            const friend = new Friend(response.data[0].id, follower!, following!)
            return friend
        }
    }

    async getByFollower(follower: string) {
        const response = await supabase.from(this.tableName).select().eq('follower', follower)
        console.log('follower')
        console.log(response)

        if (response.error !== null) {
            if (FriendsRepository.tries < 1) {
                FriendsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log('get friend by follower error')
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getByFollower(follower)
                }
            } else {
                FriendsRepository.tries = 0
                console.log('get friend by follower error')
                throw response.error
            }
        } else {
            FriendsRepository.tries = 0
            const friends = [] as Friend[]
            const followerData = await new UsersRepository().getById(follower)
            for (let i = 0; i < response.data.length; i++) {
                const following = await new UsersRepository().getById(response.data[i].following)
                friends.push(new Friend(response.data[i].id, followerData!, following!))
            }
            return friends
        }
    }

    async getByFollowing(following: string) {
        const response = await supabase.from(this.tableName).select().eq('following', following)
        console.log('following')
        console.log(response)

        if (response.error !== null) {
            if (FriendsRepository.tries < 1) {
                FriendsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log('get friend by following error')
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getByFollowing(following)
                }
            } else {
                FriendsRepository.tries = 0
                console.log('get friend by following error')
                throw response.error
            }
        } else {
            FriendsRepository.tries = 0
            const friends = [] as Friend[]
            const followingData = await new UsersRepository().getById(following)
            for (let i = 0; i < response.data.length; i++) {
                const follower = await new UsersRepository().getById(response.data[i].follower)
                friends.push(new Friend(response.data[i].id, follower!, followingData!))
            }
            return friends
        }
    }
}