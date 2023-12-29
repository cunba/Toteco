import TotecosApiClient, { TotecoApi } from "../TotecoApiClient"

export class TotecoBaseRepository<T> {

    isMocked: boolean
    api: TotecoApi

    constructor(api: TotecoApi, mocked: boolean) {
        this.isMocked = mocked
        this.api = api
    }

    get apiClient() {
        return TotecosApiClient.clientFor<T>(this.api, this.isMocked)
    }
}