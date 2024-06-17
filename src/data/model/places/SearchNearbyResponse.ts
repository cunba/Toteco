import { SearchNearbyResponse } from "../../../client"
import { PlaceDetailsData } from "./PlaceDetails"


export class SearchNearbyResponseData implements SearchNearbyResponse {

    constructor(
        public places: Array<PlaceDetailsData>
    ) {
        this.places = places
    }
}