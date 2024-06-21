import { Circle, LocationRestriction, SearchNearbyRequest } from "../../../client"
import { LocationData } from "./PlaceDetails"


export class SearchNearbyRequestData implements SearchNearbyRequest {

    constructor(
        public locationRestriction: LocationRestrictionData,
        public includedTypes?: Array<string>,
    ) {
        this.includedTypes = ["bar", "cafe", "restaurant", "coffee_shop", "breakfast_restaurant", "bakery"]
        this.locationRestriction = locationRestriction
    }
}

export class LocationRestrictionData implements LocationRestriction {

    constructor(
        public circle: CircleData
    ) {
        this.circle = circle
    }
}

export class CircleData implements Circle {

    constructor(
        public center: LocationData,
        public radius: number
    ) {
        this.center = center
        this.radius = radius
    }
}