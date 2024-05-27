import { AxiosResponse } from "axios"
import { SearchNearbyRequestData } from "../../model/places/SearchNearbyRequest"
import { SearchNearbyResponseData } from "../../model/places/SearchNearbyResponse"


export interface ISearchNearbyApi {

    searchNearby(searchNearbyRequest: SearchNearbyRequestData): Promise<AxiosResponse<SearchNearbyResponseData>>

}