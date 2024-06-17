import { AxiosResponse } from "axios"
import { PlaceDetails } from "../../../client"


export interface IPlaceDetailsApi {

    placeDetails(id: string): Promise<AxiosResponse<PlaceDetails>>

}