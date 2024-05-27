import { PlacesSearchText, SearchTextResponse } from "../../../client/places"
import { DisplayNameData } from "./DisplayName"
import { LocationData } from "./Location"


export class SearchTextResponseData implements SearchTextResponse {

    constructor(
        public places: Array<PlacesSearchTextData>
    ) {
        this.places = places
    }
}

export class PlacesSearchTextData implements PlacesSearchText {

    constructor(
        public id: string,
        public location: LocationData,
        public displayName: DisplayNameData,
        public formattedAddress: string
    ) {
        this.id = id
        this.location = location
        this.displayName = displayName
        this.formattedAddress = formattedAddress
    }
}