import { PlacesApi } from "../../../../infrastructure/data/PlacesApiClient"
import { PlacesBaseRepository } from "../../../../infrastructure/data/repositories/PlacesBaseRepository"
import { IPlaceDetailsApi } from "../IPlaceDetailsApi"


export class PlaceDetailsRepository extends PlacesBaseRepository<IPlaceDetailsApi> {

    constructor() {
        super(PlacesApi.PlaceDetailsApi, false)
    }

    async placeDetails(id: string) {
        try {
            const client = await this.apiClient
            const result = await client.placeDetails(id)
            return result.data
        } catch (e) {
            throw e
        }
    }
}