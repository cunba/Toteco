import { makeAutoObservable } from "mobx";
import { Location } from "react-native-location";
import { geolocation } from "../App";
import { EstablishmentData, EstablishmentDataDTO } from "../data/model/toteco/Establishment";
import { MenuDataDTO } from "../data/model/toteco/Menu";
import { ProductDataDTO } from "../data/model/toteco/Product";
import { PublicationDataDTO } from "../data/model/toteco/Publication";
import { PlacesRepository } from "../data/repositories/maps/PlacesRepository";
import { SessionStoreFactory } from "../infrastructure/data/SessionStoreFactory";

export class AddPublicationViewModel {

    establishment?: EstablishmentData
    newEstablishment?: EstablishmentDataDTO
    establishmentScore?: number
    products: ProductDataDTO[]
    menus: MenuDataDTO[]
    totalScore: number
    totalPrice: number
    image?: string
    initialLocation?: Location
    placesNearby: any[]

    constructor() {
        makeAutoObservable(this)
        this.products = []
        this.menus = []
        this.placesNearby = []
        this.totalScore = 0
        this.totalPrice = 0
    }

    constructorFuncions() {
        this.products = []
        this.menus = []
        this.placesNearby = []
        this.totalScore = 0
        this.totalPrice = 0
        this.initialLocation = geolocation === undefined ? { latitude: 0.0, longitude: 0.0 } as Location : geolocation
        this.getEstablishmentsNearby()
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

    getEstablishmentsNearby() {
        new PlacesRepository().getPlacesNearby().then(places => {
            console.log(places)
        })
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