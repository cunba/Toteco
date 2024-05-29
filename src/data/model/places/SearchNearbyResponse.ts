import { SearchNearbyResponse } from "../../../client/places"
import { PlaceDetailsData } from "./PlaceDetails"


export class SearchNearbyResponseData implements SearchNearbyResponse {

    constructor(
        public places: Array<PlaceDetailsData>
    ) {
        this.places = places
    }
}