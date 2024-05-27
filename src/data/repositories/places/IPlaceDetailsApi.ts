import { AxiosResponse } from "axios"
import { PlaceDetailsResponse } from "../../../client/places"


export interface IPlaceDetailsApi {

    placeDetails(id: string): Promise<AxiosResponse<PlaceDetailsResponse>>

}