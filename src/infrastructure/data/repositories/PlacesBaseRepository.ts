import PlacesApiClient, { PlacesApi } from "../PlacesApiClient"

export class PlacesBaseRepository<T> {

    isMocked: boolean
    api: PlacesApi

    constructor(api: PlacesApi, mocked: boolean) {
        this.isMocked = mocked
        this.api = api
    }

    get apiClient() {
        return PlacesApiClient.clientFor<T>(this.api, this.isMocked)
    }
}