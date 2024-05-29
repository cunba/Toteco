import { AxiosResponse } from "axios"
import { PlaceDetails } from "../../../client/places"


export interface IPlaceDetailsApi {

    placeDetails(id: string): Promise<AxiosResponse<PlaceDetails>>

}