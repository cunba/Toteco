import { Circle, LocationRestriction, SearchNearbyRequest } from "../../../client/places"
import { LocationData } from "./Location"


export class SearchNearbyRequestData implements SearchNearbyRequest {

    constructor(
        public locationRestriction: LocationRestrictionData,
        public includedTypes?: Array<string>,
    ) {
        this.includedTypes = ['bar', 'cafe', 'meal_delivery', 'meal_takeaway', 'restaurant']
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