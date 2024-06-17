import { supabase } from "../../../../App";
import { SessionStoreFactory } from "../../../../infrastructure/data/SessionStoreFactory";
import { Establishment, EstablishmentDTO } from "../../../model/toteco/Establishment";
import { IEstablishmentsApi } from "../IEstablishmentsApi";
import { PublicationsRepository } from "./PublicationsRepository";


export class EstablishmentsRepository implements IEstablishmentsApi {

    static tries = 0
    tableName = 'establishments'

    async save(body: EstablishmentDTO) {
        const response = await supabase.from(this.tableName).insert(body).select()

        if (response.error !== null) {
            console.log(response.error)
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.save(body)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw response.error
            }
        } else {
            EstablishmentsRepository.tries = 0
            console.log(response.data)
            return response.data[0]
        }
    }

    async update(id: string, body: Establishment) {
        const response = await supabase.from(this.tableName).update(body).eq('id', id).select()

        if (response.error !== null) {
            console.log(response.error)
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.update(id, body)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw response.error
            }
        } else {
            EstablishmentsRepository.tries = 0
            console.log(response.data)
            return response.data[0]
        }
    }

    async delete(id: string) {
        const response = await supabase.from(this.tableName).delete().eq('id', id).select()

        if (response.error !== null) {
            console.log(response.error)
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.delete(id)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw response.error
            }
        } else {
            EstablishmentsRepository.tries = 0
            console.log(response.data)
            return response.data[0]
        }
    }

    async getAll() {
        const response = await supabase.from(this.tableName).select()

        if (response.error !== null) {
            console.log(response.error)
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getAll()
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw response.error
            }
        } else {
            EstablishmentsRepository.tries = 0
            const establishments = response.data as Establishment[]
            for (let i = 0; i < establishments.length; i++) {
                const publications = await new PublicationsRepository().getByEstablishmentId(establishments[i].id)
                publications?.map(publication => publication.establishment = establishments[i])
                establishments[i].publications = publications
            }
            console.log(establishments)
            return establishments
        }
    }

    async getById(id: string) {
        const response = await supabase.from(this.tableName).select().eq('id', id)

        if (response.error !== null) {
            console.log(response.error)
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getById(id)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw response.error
            }
        } else if (response.count === 0) {
            throw {
                code: 404,
                message: 'Publication not found'
            }
        } else {
            EstablishmentsRepository.tries = 0
            const establishment = response.data[0] as Establishment
            const publications = await new PublicationsRepository().getByEstablishmentId(establishment.id)
            publications?.map(publication => publication.establishment = establishment)
            establishment.publications = publications
            return establishment
        }
    }

    async getByName(name: string) {
        const response = await supabase.from(this.tableName).select().eq('name', name)

        if (response.error !== null) {
            console.log(response.error)
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getByName(name)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw response.error
            }
        } else {
            EstablishmentsRepository.tries = 0
            const establishments = response.data as Establishment[]
            for (let i = 0; i < establishments.length; i++) {
                const publications = await new PublicationsRepository().getByEstablishmentId(establishments[i].id)
                publications?.map(publication => publication.establishment = establishments[i])
                establishments[i].publications = publications
            }
            console.log(establishments)
            return establishments
        }
    }

    async getByMapsId(mapsId: string) {
        const response = await supabase.from(this.tableName).select().eq('maps_id', mapsId)

        if (response.error !== null) {
            console.log(response.error)
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getByMapsId(mapsId)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw response.error
            }
        } else {
            EstablishmentsRepository.tries = 0
            const establishments = response.data as Establishment[]
            for (let i = 0; i < establishments.length; i++) {
                const publications = await new PublicationsRepository().getByEstablishmentId(establishments[i].id)
                publications?.map(publication => publication.establishment = establishments[i])
                establishments[i].publications = publications
            }
            console.log(establishments)
            return establishments
        }
    }

    async updateScore(score: number, id: string) {
        const response = await supabase.from(this.tableName).update({ score: score }).eq('id', id).select()

        if (response.error !== null) {
            console.log(response.error)
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.updateScore(score, id)
                }
            } else {
                EstablishmentsRepository.tries = 0
                throw response.error
            }
        } else {
            EstablishmentsRepository.tries = 0
            console.log(response.data)
            return response.data[0]
        }
    }
}