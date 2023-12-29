import { Configuration, ConfigurationParameters } from '../../client';
import { BaseAPI } from '../../client/base';
import { NotImplementedException } from '../exceptions/NotImplementedException';
import { SessionStoreFactory } from './SessionStoreFactory';

//Enun type for map keys support. Must be filled with the released Apis, usually coming from the generated client.

export enum TotecoApi {
    EstablishmentsApi,
    MenusApi,
    ProductTypesApi,
    ProductsApi,
    PublicationsApi,
    UsersApi,
    LoginApi
}

export default class TotecosApiClient {

    private static apis = new Map<TotecoApi, BaseAPI>()

    private static mockApis = new Map<TotecoApi, BaseAPI>()

    private static clientConfig(token?: string | undefined): Configuration {
        const params: ConfigurationParameters = {}
        if (token) {
            params.apiKey = `Bearer ${token}`
            params.accessToken = token
        }
        return new Configuration(params)
    }

    public static async clientFor<T>(type: TotecoApi, mock: boolean = false) {
        const api = mock ? TotecosApiClient.mockApis.get(type) : TotecosApiClient.apis.get(type)
        const constuctor = api?.constructor as any
        const token: any = await SessionStoreFactory.getSessionStore().getToken() ? await SessionStoreFactory.getSessionStore().getToken() : undefined
        if (constuctor) {
            return new constuctor(this.clientConfig(token)) as T
        }
        else
            throw new NotImplementedException()
    }

    public static register(key: TotecoApi, customApi: BaseAPI, mock: boolean = false) {
        mock ? TotecosApiClient.mockApis.set(key, customApi) : TotecosApiClient.apis.set(key, customApi)
    }
}