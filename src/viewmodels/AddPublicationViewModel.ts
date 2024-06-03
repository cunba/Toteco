import { makeAutoObservable } from "mobx";
import { Location } from "react-native-location";
import { geolocation } from "../App";
import { LocationData, PlaceDetailsData } from "../data/model/places/PlaceDetails";
import { CircleData, LocationRestrictionData, SearchNearbyRequestData } from "../data/model/places/SearchNearbyRequest";
import { EstablishmentData, EstablishmentDataDTO } from "../data/model/toteco/Establishment";
import { MenuData, MenuDataDTO } from "../data/model/toteco/Menu";
import { ProductDataDTO } from "../data/model/toteco/Product";
import { PublicationDataDTO } from "../data/model/toteco/Publication";
import { SearchNearbyRepository } from "../data/repositories/places/impl/SearchNearbyRepository";
import { EstablishmentsRepository } from "../data/repositories/toteco/impl/EstablishmentsRepository";
import { MenusRepository } from "../data/repositories/toteco/impl/MenusRepository";
import { ProductsRepository } from "../data/repositories/toteco/impl/ProductsRepository";
import { PublicationsRepository } from "../data/repositories/toteco/impl/PublicationsRepository";
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
    placeSelected?: PlaceDetailsData

    constructor() {
        makeAutoObservable(this)
        this.products = []
        this.menus = []
        this.placesNearby = []
        this.totalScore = 0
        this.totalPrice = 0
        this.comment = ""
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
        this.products.push(product)
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

    async addEstablishment(establishment: EstablishmentDataDTO) {
        establishment.isComputerAllowed = establishment.isComputerAllowed ?? false
        const existEstablishment = await new EstablishmentsRepository().getByMapsId(establishment.mapsId)
        console.log(existEstablishment)
        if (existEstablishment!.length > 0)
            this.establishment = existEstablishment![0]
        else
            this.newEstablishment = establishment
        this.setTotalScore()
    }

    setPlaceSelected(place: PlaceDetailsData) {
        this.placeSelected = place
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

    async createPublication() {
        let establishmentId
        if (this.newEstablishment) {
            const establishmentExists = await new EstablishmentsRepository().getByMapsId(this.placeSelected?.id!)
            if (establishmentExists instanceof Array && establishmentExists.length < 0) {
                establishmentId = establishmentExists[0].id
            } else {
                const newEstablishment = await this.createEstablihment()
                establishmentId = newEstablishment?.id
            }
        } else if (this.establishment === undefined)
            return false
        else
            establishmentId = this.establishment.id

        let menus: MenuData[] = []
        if (this.menus.length > 0)
            menus = this.createMenus()

        const user = await SessionStoreFactory.getSessionStore().getUser()

        const newPublication = new PublicationDataDTO(
            this.totalPrice,
            this.totalScore,
            this.comment,
            establishmentId!,
            user!.id,
            this.image
        )

        const publication = await new PublicationsRepository().save(newPublication)

        if (this.products.length > 0)
            if (menus.length > 0)
                this.createProducts(publication!.id, menus[0].id)
            else
                this.createProducts(publication!.id)
    }

    async createEstablihment() {
        this.newEstablishment!.location = `{latitude: ${this.placeSelected?.location.latitude}, longitude: ${this.placeSelected?.location.longitude}}`
        const establishment = await new EstablishmentsRepository().save(this.newEstablishment!)
        return establishment
    }

    createMenus() {
        const menus: MenuData[] = []
        this.menus.map(async menu => {
            const newMenu = await new MenusRepository().save(menu)
            if (newMenu !== undefined)
                menus.push(newMenu)
        })

        return menus
    }

    createProducts(publicationId: string, menuId?: string) {
        this.products.map(async product => {
            if (product.inMenu) product.menuId = menuId
            product.publicationId = publicationId
            await new ProductsRepository().save(product)
        })
    }

    setComment(comment: string) {
        this.comment = comment
    }

    isProductsValid() {
        if (this.products)
            return this.products.length > 0
        else
            return false
    }

    isEstablishmentValid() {
        if (this.establishment || this.newEstablishment)
            return true
        else
            return false
    }

    isTotalPriceValid() {
        if (this.totalPrice)
            return this.totalPrice >= 0
        else
            return false
    }

    isTotalScoreValid() {
        if (this.totalScore)
            return this.totalScore >= 0
        else
            return false
    }

    isPhotoValid() {
        if (this.image) {
            return true
        } else {
            return false
        }
    }

    isValid() {

        return (
            this.isProductsValid()
            &&
            this.isEstablishmentValid()
            &&
            this.isTotalPriceValid()
            &&
            this.isTotalScoreValid()
            &&
            this.isPhotoValid()
        )
    }
}