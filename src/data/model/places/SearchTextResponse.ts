import { PlaceDetails, SearchTextResponse } from "../../../client/places"


export class SearchTextResponseData implements SearchTextResponse {

    constructor(
        public places: Array<PlaceDetails>
    ) {
        this.places = places
    }
}