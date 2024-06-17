import { supabase } from "../../../../App";
import { SessionStoreFactory } from "../../../../infrastructure/data/SessionStoreFactory";
import { Product, ProductDTO } from "../../../model/toteco/Product";
import { IProductsApi } from "../IProductsApi";


export class ProductsRepository implements IProductsApi {

    static tries = 0
    tableName = 'Toteco.products'

    async save(product: ProductDTO) {
        const response = await supabase.from(this.tableName).insert(product).select()

        if (response.error !== null) {
            if (ProductsRepository.tries < 1) {
                ProductsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.save(product)
                }
            } else {
                ProductsRepository.tries = 0
                throw response.error
            }
        } else {
            ProductsRepository.tries = 0
            console.log(response.data)
            return response.data[0]
        }
    }

    async update(id: string, body: Product) {
        const response = await supabase.from(this.tableName).update(body).eq('id', id).select()

        if (response.error !== null) {
            if (ProductsRepository.tries < 1) {
                ProductsRepository.tries++
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
                ProductsRepository.tries = 0
                throw response.error
            }
        } else {
            ProductsRepository.tries = 0
            console.log(response.data)
            return response.data[0]
        }
    }

    async delete(id: string) {
        const response = await supabase.from(this.tableName).delete().eq('id', id).select()

        if (response.error !== null) {
            if (ProductsRepository.tries < 1) {
                ProductsRepository.tries++
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
                ProductsRepository.tries = 0
                throw response.error
            }
        } else {
            ProductsRepository.tries = 0
            console.log(response.data)
            return response.data[0]
        }
    }

    async getAll() {
        const response = await supabase.from(this.tableName).select()

        if (response.error !== null) {
            if (ProductsRepository.tries < 1) {
                ProductsRepository.tries++
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
                ProductsRepository.tries = 0
                throw response.error
            }
        } else {
            ProductsRepository.tries = 0
            console.log(response.data)
            return response.data
        }
    }

    async getById(id: string) {
        const response = await supabase.from(this.tableName).select().eq('id', id)

        if (response.error !== null) {
            if (ProductsRepository.tries < 1) {
                ProductsRepository.tries++
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
                ProductsRepository.tries = 0
                throw response.error
            }
        } else if (response.count === 0) {
            throw {
                code: 404,
                message: 'Publication not found'
            }
        } else {
            ProductsRepository.tries = 0
            console.log(response.data)
            return response.data[0]
        }
    }

    async getByMenuId(menuId: string) {
        const response = await supabase.from(this.tableName).select().eq('menu_id', menuId)

        if (response.error !== null) {
            if (ProductsRepository.tries < 1) {
                ProductsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getByMenuId(menuId)
                }
            } else {
                ProductsRepository.tries = 0
                throw response.error
            }
        } else {
            ProductsRepository.tries = 0
            console.log(response.data)
            return response.data
        }
    }

    async getByPublicationId(publicationId: string) {
        const response = await supabase.from(this.tableName).select().eq('publication_id', publicationId)

        if (response.error !== null) {
            if (ProductsRepository.tries < 1) {
                ProductsRepository.tries++
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                const token = await SessionStoreFactory.getSessionStore().getToken()
                const loginResponse = await supabase.auth.refreshSession({ refresh_token: token! })

                if (loginResponse.error !== undefined && loginResponse.error !== null) {
                    throw response.error
                } else {
                    SessionStoreFactory.getSessionStore().setToken(loginResponse.data.session?.access_token)
                    this.getByPublicationId(publicationId)
                }
            } else {
                ProductsRepository.tries = 0
                throw response.error
            }
        } else {
            ProductsRepository.tries = 0
            console.log(response.data)
            return response.data
        }
    }
}