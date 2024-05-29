import { makeAutoObservable } from "mobx";
import { Location } from "react-native-location";
import { geolocation } from "../App";
import { LocationData, PlaceDetailsData } from "../data/model/places/PlaceDetails";
import { CircleData, LocationRestrictionData, SearchNearbyRequestData } from "../data/model/places/SearchNearbyRequest";
import { EstablishmentData, EstablishmentDataDTO } from "../data/model/toteco/Establishment";
import { SearchNearbyRepository } from "../data/repositories/places/impl/SearchNearbyRepository";

export class AddEstablishmentViewModel {

    establishment?: EstablishmentData
    newEstablishment?: EstablishmentDataDTO
    establishmentScore?: number
    comment: string
    initialLocation?: Location
    placesNearby: PlaceDetailsData[]
    placeSelected?: PlaceDetailsData

    constructor() {
        makeAutoObservable(this)
        this.placesNearby = []
        this.comment = ""
    }

    constructorFuncions() {
        this.placesNearby = []
        this.initialLocation = geolocation === undefined ? { latitude: 0.0, longitude: 0.0 } as Location : geolocation
        this.getPlacesNearby()
    }

    addEstablishment(establishment: EstablishmentDataDTO) {
        this.newEstablishment = establishment
    }

    async renderEstablishments(region: any) {
        const center = new LocationData(region.latitude, region.longitude)
        const circle = new CircleData(center, 1000)
        const locationRestriction = new LocationRestrictionData(circle)
        const searchNearbyRequest = new SearchNearbyRequestData(locationRestriction)
        const response: PlaceDetailsData[] = await new SearchNearbyRepository().searchNearby(searchNearbyRequest)
        response.filter((value, index) => { if (this.placesNearby.includes(value)) response.splice(index, 1) })
        this.placesNearby.push(...response)
    }

    async getPlacesNearby() {
        const center = new LocationData(this.initialLocation!.latitude, this.initialLocation!.longitude)
        const circle = new CircleData(center, 1000)
        const locationRestriction = new LocationRestrictionData(circle)
        const searchNearbyRequest = new SearchNearbyRequestData(locationRestriction)
        const response: PlaceDetailsData[] = await new SearchNearbyRepository().searchNearby(searchNearbyRequest)
        this.placesNearby = response
    }
}