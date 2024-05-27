import { PlacesSearchNearby, SearchNearbyResponse } from "../../../client/places"
import { DisplayNameData } from "./DisplayName"
import { LocationData } from "./Location"


export class SearchNearbyResponseData implements SearchNearbyResponse {

    constructor(
        public places: Array<PlacesSearchNearbyData>
    ) {
        this.places = places
    }
}

export class PlacesSearchNearbyData implements PlacesSearchNearby {

    constructor(
        public id: string,
        public location: LocationData,
        public displayName: DisplayNameData
    ) {
        this.id = id
        this.location = location
        this.displayName = displayName
    }
}