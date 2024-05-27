import { PlaceDetailsResponse, RegularOpeningHours } from "../../../client/places"
import { DisplayNameData } from "./DisplayName"
import { LocationData } from "./Location"


export class PlaceDetailsResponseData implements PlaceDetailsResponse {

    constructor(
        public id: string,
        public location: LocationData,
        public displayName: DisplayNameData,
        public formattedAddress: string,
        public regularOpeningHours: string
    ) {
        this.id = id
        this.location = location
        this.displayName = displayName
        this.formattedAddress = formattedAddress
        this.regularOpeningHours = regularOpeningHours
    }
}

export class RegularOpeningHoursData implements RegularOpeningHours {

    constructor(
        public openNow: boolean,
        public periods: any,
        public weekdayDescriptions: Array<string>
    ) {
        this.openNow = openNow
        this.periods = periods
        this.weekdayDescriptions = weekdayDescriptions
    }
}