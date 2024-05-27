import { PlacesApi } from "../../../../infrastructure/data/PlacesApiClient"
import { PlacesBaseRepository } from "../../../../infrastructure/data/repositories/PlacesBaseRepository"
import { SearchNearbyRequestData } from "../../../model/places/SearchNearbyRequest"
import { ISearchNearbyApi } from "../ISearchNearbyApi"


export class SearchNearbyRepository extends PlacesBaseRepository<ISearchNearbyApi> {

    constructor() {
        super(PlacesApi.SearchNearbyApi, false)
    }

    async searchNearby(searchNearbyRequest: SearchNearbyRequestData) {
        try {
            const client = await this.apiClient
            const result = await client.searchNearby(searchNearbyRequest)
            return result.data
        } catch (e) {
            throw e
        }
    }
}