import { supabase } from "../../../../App";
import { SessionStoreFactory } from "../../../../infrastructure/data/SessionStoreFactory";
import i18n from "../../../../infrastructure/localization/i18n";
import { Publication, PublicationDTO } from "../../../model/toteco/Publication";
import { IPublicationsApi } from "../IPublicationsApi";
import { EstablishmentsRepository } from "./EstablishmentsRepository";
import { ProductsRepository } from "./ProductsRepository";
import { UsersRepository } from "./UsersRepository";


export class PublicationsRepository implements IPublicationsApi {

    static tries = 0
    tableName = 'publications'

    async save(body: PublicationDTO) {
        const response = await supabase.from(this.tableName).insert(body).select()

        if (response.error !== null) {
            console.log(response.error)
            if (PublicationsRepository.tries < 1) {
                PublicationsRepository.tries++
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
                PublicationsRepository.tries = 0
                throw response.error
            }
        } else {
            PublicationsRepository.tries = 0
            console.log(response.data)
            return response.data[0]
        }
    }

    async update(id: string, body: Publication) {
        const response = await supabase.from(this.tableName).update(body).eq('id', id).select()

        if (response.error !== null) {
            console.log(response.error)
            if (PublicationsRepository.tries < 1) {
                PublicationsRepository.tries++
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
                PublicationsRepository.tries = 0
                throw response.error
            }
        } else {
            PublicationsRepository.tries = 0
            console.log(response.data)
            return response.data[0]
        }
    }

    async delete(id: string) {
        const response = await supabase.from(this.tableName).delete().eq('id', id).select()

        if (response.error !== null) {
            console.log(response.error)
            if (PublicationsRepository.tries < 1) {
                PublicationsRepository.tries++
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
                PublicationsRepository.tries = 0
                throw response.error
            }
        } else {
            PublicationsRepository.tries = 0
            console.log(response.data)
            return response.data[0]
        }
    }

    async getAll() {
        const response = await supabase.from(this.tableName).select()

        if (response.error !== null) {
            console.log(response.error)
            if (PublicationsRepository.tries < 1) {
                PublicationsRepository.tries++
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
                PublicationsRepository.tries = 0
                throw response.error
            }
        } else {
            PublicationsRepository.tries = 0
            const publications = response.data as Publication[]
            for (let i = 0; i < publications.length; i++) {
                const establishment = await new EstablishmentsRepository().getById(response.data[i].establishment_id)
                const products = await new ProductsRepository().getByPublicationId(publications[i].id!)
                const user = await new UsersRepository().getById(response.data[i].user_id)
                publications[i].establishment = establishment
                publications[i].products = products
                publications[i].user = user
            }
            console.log(publications)
            return publications
        }
    }

    async getById(id: string) {
        const response = await supabase.from(this.tableName).select().eq('id', id)

        if (response.error !== null) {
            console.log(response.error)
            if (PublicationsRepository.tries < 1) {
                PublicationsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getById(id)
                }
            } else {
                PublicationsRepository.tries = 0
                throw response.error
            }
        } else if (response.count === 0) {
            throw {
                code: 404,
                message: i18n.t('repositories.publications.not_found')
            }
        } else {
            PublicationsRepository.tries = 0
            const publication = response.data[0] as Publication
            const establishment = await new EstablishmentsRepository().getById(response.data[0].establishment_id)
            const products = await new ProductsRepository().getByPublicationId(publication.id!)
            const user = await new UsersRepository().getById(response.data[0].user_id)
            publication.establishment = establishment
            publication.products = products
            publication.user = user
            console.log(publication)
            return publication
        }
    }

    async getByEstablishmentId(id: string) {
        const response = await supabase.from(this.tableName).select().eq('establishment_id', id)

        if (response.error !== null) {
            console.log(response.error)
            if (PublicationsRepository.tries < 1) {
                PublicationsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getByEstablishmentId(id)
                }
            } else {
                PublicationsRepository.tries = 0
                throw response.error
            }
        } else {
            PublicationsRepository.tries = 0
            const publications = response.data as Publication[]
            for (let i = 0; i < publications.length; i++) {
                const products = await new ProductsRepository().getByPublicationId(publications[i].id!)
                const user = await new UsersRepository().getById(response.data[i].user_id)
                publications[i].products = products
                publications[i].user = user
            }
            console.log(publications)
            return publications
        }
    }

    async getByUserId(id: string) {
        const response = await supabase.from(this.tableName).select().eq('user_id', id)

        if (response.error !== null) {
            console.log(response.error)
            if (PublicationsRepository.tries < 1) {
                PublicationsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getByUserId(id)
                }
            } else {
                PublicationsRepository.tries = 0
                throw response.error
            }
        } else {
            PublicationsRepository.tries = 0
            const publications = response.data as Publication[]
            for (let i = 0; i < publications.length; i++) {
                const establishment = await new EstablishmentsRepository().getById(response.data[i].establishment_id)
                const products = await new ProductsRepository().getByPublicationId(publications[i].id!)
                const user = await new UsersRepository().getById(response.data[i].user_id)
                publications[i].establishment = establishment
                publications[i].products = products
                publications[i].user = user
            }
            console.log(publications)
            return publications
        }
    }
}