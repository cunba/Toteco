import { makeAutoObservable } from "mobx";
import { Location } from "react-native-location";
import { geolocation } from "../App";
import { LocationData, PlaceDetailsData } from "../data/model/places/PlaceDetails";
import { CircleData, LocationRestrictionData, SearchNearbyRequestData } from "../data/model/places/SearchNearbyRequest";
import { EstablishmentData } from "../data/model/toteco/Establishment";
import { SearchNearbyRepository } from "../data/repositories/places/impl/SearchNearbyRepository";
import { EstablishmentsRepository } from "../data/repositories/toteco/impl/EstablishmentsRepository";

export class EstablishmentsViewModel {

    establishments?: EstablishmentData[]
    placesNearby: PlaceDetailsData[]
    initialLocation?: Location

    constructor() {
        makeAutoObservable(this)
        this.placesNearby = []
        this.initialLocation = geolocation === undefined ? { latitude: 0.0, longitude: 0.0 } as Location : geolocation
        this.getEstablishments()
        this.getPlacesNearby()
    }

    async getEstablishments() {
        this.establishments = await new EstablishmentsRepository().getAll()
    }

    async renderEstablishments(region: any) {
        const center = new LocationData(region.latitude, region.longitude)
        const circle = new CircleData(center, 5000)
        const locationRestriction = new LocationRestrictionData(circle)
        const searchNearbyRequest = new SearchNearbyRequestData(locationRestriction)
        const response: PlaceDetailsData[] = await new SearchNearbyRepository().searchNearby(searchNearbyRequest)
        const newPlaces: PlaceDetailsData[] = []
        response.map(place => { if (!this.placesNearby.some(value => value.id === place.id)) newPlaces.push(place) })
        this.placesNearby.push(...newPlaces)
    }

    async getPlacesNearby() {
        const center = new LocationData(this.initialLocation!.latitude, this.initialLocation!.longitude)
        const circle = new CircleData(center, 5000)
        const locationRestriction = new LocationRestrictionData(circle)
        const searchNearbyRequest = new SearchNearbyRequestData(locationRestriction)
        const response: PlaceDetailsData[] = await new SearchNearbyRepository().searchNearby(searchNearbyRequest)
        this.placesNearby = response
    }
}