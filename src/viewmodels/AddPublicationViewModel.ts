import { makeAutoObservable } from "mobx";
import { Location } from "react-native-location";
import { geolocation } from "../App";
import { LocationData, PlaceDetailsData } from "../data/model/places/PlaceDetails";
import { CircleData, LocationRestrictionData, SearchNearbyRequestData } from "../data/model/places/SearchNearbyRequest";
import { EstablishmentData, EstablishmentDataDTO } from "../data/model/toteco/Establishment";
import { MenuDataDTO } from "../data/model/toteco/Menu";
import { ProductDataDTO } from "../data/model/toteco/Product";
import { PublicationDataDTO } from "../data/model/toteco/Publication";
import { SearchNearbyRepository } from "../data/repositories/places/impl/SearchNearbyRepository";
import { SessionStoreFactory } from "../infrastructure/data/SessionStoreFactory";

export class AddPublicationViewModel {

    establishment?: EstablishmentData
    newEstablishment?: EstablishmentDataDTO
    establishmentScore?: number
    products: ProductDataDTO[]
    menus: MenuDataDTO[]
    totalScore: number
    totalPrice: number
    comment: string
    image?: string
    initialLocation?: Location
    placesNearby: PlaceDetailsData[]

    constructor() {
        makeAutoObservable(this)
        this.products = []
        this.menus = []
        this.placesNearby = []
        this.totalScore = 0
        this.totalPrice = 0
        this.comment = ""
    }

    constructorFuncions() {
        this.products = []
        this.menus = []
        this.placesNearby = []
        this.totalScore = 0
        this.totalPrice = 0
        this.initialLocation = geolocation === undefined ? { latitude: 0.0, longitude: 0.0 } as Location : geolocation
        this.getPlacesNearby()
    }

    setTotalScore() {
        let productScore = 0
        this.products.map(product => productScore = productScore + product.score!)
        let menusScore = 0
        this.menus.map(menu => menusScore = menusScore + menu.score)
        let establishmentScore = this.establishmentScore ?? 0
        this.totalScore = (establishmentScore + productScore + menusScore) / (this.products.length + this.menus.length + 1)
    }

    setTotalPrice() {
        let price = 0
        if (this.menus.length > 0) {
            this.products.map(product => !product.inMenu ? (price = price + product.price!) : '')
            this.menus.map(menu => price = price + menu.price)
        } else {
            this.products.map(product => price = price + product.price!)
        }
        this.totalPrice = price
    }

    setImage(imageUri: string) {
        this.image = imageUri
    }

    async setPublication() {
        const user = await SessionStoreFactory.getSessionStore().getUser()
        new PublicationDataDTO(
            this.totalScore!,
            this.totalPrice!,
            this.comment,
            user!.id,
            this.establishment!.id,
            this.image
        )
    }

    addProduct(product: ProductDataDTO) {
        product.inMenu = product.inMenu ?? false
        console.log(product)
        this.products.push(product)
        console.log(this.products)
        this.setTotalScore()
        this.setTotalPrice()
    }

    editProduct(product: ProductDataDTO, index: number) {
        this.products[index] = product
        this.setTotalScore()
        this.setTotalPrice()
    }

    removeProduct(index: number) {
        this.products.splice(index, 1)
        this.setTotalScore()
        this.setTotalPrice()
    }

    async getPlacesNearby() {
        const center = new LocationData(this.initialLocation!.latitude, this.initialLocation!.longitude)
        const circle = new CircleData(center, 1000)
        const locationRestriction = new LocationRestrictionData(circle)
        const searchNearbyRequest = new SearchNearbyRequestData(locationRestriction)
        const response: any = await new SearchNearbyRepository().searchNearby(searchNearbyRequest)
        this.placesNearby = response
    }

    isProductsValid() {
        if (this.products) {
            return this.products.length > 0
        }
        else { return false }
    }

    isEstablishmentValid() {
        if (this.establishment) {
            return true
        }
        else { return false }
    }

    isTotalPriceValid() {
        if (this.totalPrice) {
            return this.totalPrice > 0
        }
        else { return false }
    }

    isTotalScoreValid() {
        if (this.totalScore) {
            return true
        }
        else { return false }
    }

    isValid() {

        return (
            this.isProductsValid() === true
            &&
            this.isEstablishmentValid() === true
            &&
            this.isTotalPriceValid() === true
            &&
            this.isTotalScoreValid() === true
        )
    }
}