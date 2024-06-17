
import { Configuration, ConfigurationParameters } from "../../client"
import { BaseAPI } from "../../client/base"

//Enun type for map keys support. Must be filled with the released Apis, usually coming from the generated client.


export enum PlacesApi {
    PlaceDetailsApi,
    SearchNearbyApi,
    SearchTextApi
}

export default class PlacesApiClient {

    private static apis = new Map<PlacesApi, BaseAPI>()

    private static mockApis = new Map<PlacesApi, BaseAPI>()

    private static clientConfig(token?: string | undefined): Configuration {
        const params: ConfigurationParameters = {}
        if (token) {
            params.apiKey = `Bearer ${token}`
            params.accessToken = token
        }
        return new Configuration(params)
    }

    public static async clientFor<T>(type: PlacesApi, mock: boolean = false) {
        const api = mock ? PlacesApiClient.mockApis.get(type) : PlacesApiClient.apis.get(type)
        const constuctor = api?.constructor as any
        if (constuctor) {
            return new constuctor(this.clientConfig()) as T
        }
        else
            throw 'Not implemented'
    }

    public static register(key: PlacesApi, customApi: BaseAPI, mock: boolean = false) {
        mock ? PlacesApiClient.mockApis.set(key, customApi) : PlacesApiClient.apis.set(key, customApi)
    }
}