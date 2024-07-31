import { supabase } from "../../../../App";
import { SessionStoreFactory } from "../../../../infrastructure/data/SessionStoreFactory";
import i18n from "../../../../infrastructure/localization/i18n";
import { Establishment, EstablishmentDTO, EstablishmentUpdate } from "../../../model/toteco/Establishment";
import { IEstablishmentsApi } from "../IEstablishmentsApi";
import { PublicationsRepository } from "./PublicationsRepository";


export class EstablishmentsRepository implements IEstablishmentsApi {

    static tries = 0
    tableName = 'establishments'

    async save(body: EstablishmentDTO) {
        const response = await supabase.from(this.tableName).insert(body).select()

        if (response.error !== null) {
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log('error save establishment')
                    console.log(response.error)
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.save(body)
                }
            } else {
                EstablishmentsRepository.tries = 0
                console.log('error save establishment')
                console.log(response.error)
                throw response.error
            }
        } else {
            EstablishmentsRepository.tries = 0
            return response.data[0]
        }
    }

    async update(id: string, body: EstablishmentUpdate) {
        const response = await supabase.from(this.tableName).update(body).eq('id', id).select()

        if (response.error !== null) {
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log('error update establishment')
                    console.log(response.error)
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.update(id, body)
                }
            } else {
                EstablishmentsRepository.tries = 0
                console.log('error update establishment')
                console.log(response.error)
                throw response.error
            }
        } else {
            EstablishmentsRepository.tries = 0
            return response.data[0]
        }
    }

    async delete(id: string) {
        const response = await supabase.from(this.tableName).delete().eq('id', id).select()

        if (response.error !== null) {
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log('error delete establishment')
                    console.log(response.error)
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.delete(id)
                }
            } else {
                EstablishmentsRepository.tries = 0
                console.log('error delete establishment')
                console.log(response.error)
                throw response.error
            }
        } else {
            EstablishmentsRepository.tries = 0
            return response.data[0]
        }
    }

    async getAll() {
        const response = await supabase.from(this.tableName).select()

        if (response.error !== null) {
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log('error get all establishments')
                    console.log(response.error)
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getAll()
                }
            } else {
                EstablishmentsRepository.tries = 0
                console.log('error get all establishments')
                console.log(response.error)
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
            return establishments
        }
    }

    async getById(id: string) {
        const response = await supabase.from(this.tableName).select().eq('id', id)

        if (response.error !== null) {
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log('error get establishment by id')
                    console.log(response.error)
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getById(id)
                }
            } else {
                EstablishmentsRepository.tries = 0
                console.log('error get establishment by id')
                console.log(response.error)
                throw response.error
            }
        } else if (response.count === 0) {
            console.log('error get establishment by id')
            console.log(response.error)
            throw {
                code: 404,
                message: i18n.t('repositories.establishments.not_found')
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

    async getByIdRaw(id: string) {
        const response = await supabase.from(this.tableName).select().eq('id', id)

        if (response.error !== null) {
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log('error get establishment by id')
                    console.log(response.error)
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getById(id)
                }
            } else {
                EstablishmentsRepository.tries = 0
                console.log('error get establishment by id')
                console.log(response.error)
                throw response.error
            }
        } else if (response.count === 0) {
            console.log('error get establishment by id')
            console.log(response.error)
            throw {
                code: 404,
                message: i18n.t('repositories.establishments.not_found')
            }
        } else {
            EstablishmentsRepository.tries = 0
            const establishment = response.data[0] as Establishment
            establishment.publications = []
            return establishment
        }
    }

    async getByName(name: string) {
        const response = await supabase.from(this.tableName).select().eq('name', name)

        if (response.error !== null) {
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })
                
                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log('error get establishment by name')
                    console.log(response.error)
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getByName(name)
                }
            } else {
                EstablishmentsRepository.tries = 0
                console.log('error get establishment by name')
                console.log(response.error)
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
            return establishments
        }
    }

    async getByMapsId(mapsId: string) {
        const response = await supabase.from(this.tableName).select().eq('maps_id', mapsId)

        if (response.error !== null) {
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })
                
                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log('error get establishment by maps id')
                    console.log(response.error)
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getByMapsId(mapsId)
                }
            } else {
                EstablishmentsRepository.tries = 0
                console.log('error get establishment by maps id')
                console.log(response.error)
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
            return establishments
        }
    }

    async updateScore(score: number, id: string) {
        const response = await supabase.from(this.tableName).update({ score: score }).eq('id', id).select()

        if (response.error !== null) {
            if (EstablishmentsRepository.tries < 1) {
                EstablishmentsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })
                
                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    console.log('error update establishments score')
                    console.log(response.error)
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.updateScore(score, id)
                }
            } else {
                EstablishmentsRepository.tries = 0
                console.log('error update establishments score')
                console.log(response.error)
                throw response.error
            }
        } else {
            EstablishmentsRepository.tries = 0
            return response.data[0]
        }
    }
}