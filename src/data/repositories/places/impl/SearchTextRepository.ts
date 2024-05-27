import { PlacesApi } from "../../../../infrastructure/data/PlacesApiClient"
import { PlacesBaseRepository } from "../../../../infrastructure/data/repositories/PlacesBaseRepository"
import { SearchTextRequestData } from "../../../model/places/SearchTextRequest"
import { ISearchTextApi } from "../ISearchTextApi"


export class SearchTextRepository extends PlacesBaseRepository<ISearchTextApi> {

    constructor() {
        super(PlacesApi.SearchTextApi, false)
    }

    async searchText(searchTextRequest: SearchTextRequestData) {
        try {
            const client = await this.apiClient
            const result = await client.searchText(searchTextRequest)
            return result.data
        } catch (e) {
            throw e
        }
    }
}