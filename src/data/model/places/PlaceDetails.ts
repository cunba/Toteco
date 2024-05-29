import { DisplayName, Location, PlaceDetails, RegularOpeningHours } from "../../../client/places"


export class PlaceDetailsData implements PlaceDetails {

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

export class DisplayNameData implements DisplayName {

    constructor(
        public text: string,
        public lenguageCode: string
    ) {
        this.text = text
        this.lenguageCode = lenguageCode
    }
}

export class LocationData implements Location {

    constructor(
        public latitude: number,
        public longitude: number
    ) {
        this.latitude = latitude
        this.longitude = longitude
    }
}