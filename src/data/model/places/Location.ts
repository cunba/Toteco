import { Location } from "../../../client/places"


export class LocationData implements Location {

    constructor(
        public latitude: number,
        public longitude: number
    ) {
        this.latitude = latitude
        this.longitude = longitude
    }
}