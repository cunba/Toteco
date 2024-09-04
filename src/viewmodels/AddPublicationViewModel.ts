import { makeAutoObservable } from "mobx";
import { Location } from "react-native-location";
import { firebaseStorage, geolocation } from "../App";
import { LocationData, PlaceDetailsData } from "../data/model/places/PlaceDetails";
import { CircleData, LocationRestrictionData, SearchNearbyRequestData } from "../data/model/places/SearchNearbyRequest";
import { Establishment, EstablishmentDTO } from "../data/model/toteco/Establishment";
import { ProductDTO } from "../data/model/toteco/Product";
import { PublicationDTO } from "../data/model/toteco/Publication";
import { SearchNearbyRepository } from "../data/repositories/places/impl/SearchNearbyRepository";
import { EstablishmentsRepository } from "../data/repositories/toteco/impl/EstablishmentsRepository";
import { ProductsRepository } from "../data/repositories/toteco/impl/ProductsRepository";
import { PublicationsRepository } from "../data/repositories/toteco/impl/PublicationsRepository";
import { UsersRepository } from "../data/repositories/toteco/impl/UsersRepository";
import { SessionStoreFactory } from "../infrastructure/data/SessionStoreFactory";
import { UserData } from "../data/model/toteco/User";

export class AddPublicationViewModel {

    establishment?: Establishment
    newEstablishment?: EstablishmentDTO
    establishmentScore?: number
    products: ProductDTO[]
    totalScore: number
    totalPrice: number
    comment: string
    image?: string
    initialLocation?: Location
    placesNearby: PlaceDetailsData[]
    placeSelected?: PlaceDetailsData
    user?: UserData | null

    constructor() {
        makeAutoObservable(this)
        this.getUser()
        this.products = []
        this.placesNearby = []
        this.totalScore = 0
        this.totalPrice = 0
        this.comment = ""
        this.initialLocation = geolocation === undefined ? { latitude: 0.0, longitude: 0.0 } as Location : geolocation
        this.getPlacesNearby()
    }

    async getUser() {
        this.user = await SessionStoreFactory.getSessionStore().getUser()
    }

    setTotalScore() {
        let productScore = 0
        this.products.map(product => productScore = productScore + product.score!)
        let establishmentScore = this.establishmentScore ?? 0
        this.totalScore = Math.round((establishmentScore + productScore) / (this.products.length + 1) * 100) / 100
    }

    setTotalPrice() {
        let price = 0
        this.products.map(product => price = price + product.price!)
        this.totalPrice = Math.round(price * 100) / 100
    }

    setImage(imageUri: string) {
        this.image = imageUri
    }

    addProduct(product: ProductDTO) {
        this.products.push(product)
        this.setTotalScore()
        this.setTotalPrice()
    }

    editProduct(product: ProductDTO, index: number) {
        this.products[index] = product
        this.setTotalScore()
        this.setTotalPrice()
    }

    removeProduct(index: number) {
        this.products.splice(index, 1)
        this.setTotalScore()
        this.setTotalPrice()
    }

    async addEstablishment(establishment: EstablishmentDTO) {
        establishment.is_computer_allowed = establishment.is_computer_allowed ?? false
        const existEstablishment = await new EstablishmentsRepository().getByMapsId(establishment.maps_id)

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
        const circle = new CircleData(center, 100)
        const locationRestriction = new LocationRestrictionData(circle)
        const searchNearbyRequest = new SearchNearbyRequestData(locationRestriction)
        const response: PlaceDetailsData[] = await new SearchNearbyRepository().searchNearby(searchNearbyRequest)
        const newPlaces: PlaceDetailsData[] = []
        response.map(place => { if (!this.placesNearby.some(value => value.id === place.id)) newPlaces.push(place) })
        this.placesNearby.push(...newPlaces)
    }

    async getPlacesNearby() {
        const center = new LocationData(this.initialLocation!.latitude, this.initialLocation!.longitude)
        const circle = new CircleData(center, 100)
        const locationRestriction = new LocationRestrictionData(circle)
        const searchNearbyRequest = new SearchNearbyRequestData(locationRestriction)
        const response: PlaceDetailsData[] = await new SearchNearbyRepository().searchNearby(searchNearbyRequest)
        this.placesNearby = response
    }

    async createPublication() {
        let establishmentId
        if (this.newEstablishment) {
            const establishmentExists = await new EstablishmentsRepository().getByMapsId(this.placeSelected?.id!)

            if (establishmentExists && establishmentExists.length > 0) {
                establishmentId = establishmentExists[0].id
                await new EstablishmentsRepository().updateScore(establishmentExists[0].score + this.establishmentScore!, establishmentId)
            } else {
                const newEstablishment = await this.createEstablihment()
                establishmentId = newEstablishment?.id
            }
        } else if (this.establishment === undefined)
            return false
        else
            establishmentId = this.establishment.id

        const user = await SessionStoreFactory.getSessionStore().getUser()

        const imageName = this.image!.substring(this.image!.lastIndexOf('/') + 1)
        const response = await firebaseStorage.ref(imageName).putFile(this.image!)
        if (response.state === 'success')
            this.image = await firebaseStorage.ref(imageName).getDownloadURL()

        const newPublication = new PublicationDTO(
            this.totalPrice!,
            this.totalScore!,
            this.image!,
            this.comment,
            establishmentId,
            user!.id
        )

        const publication = await new PublicationsRepository().save(newPublication)
        await new UsersRepository().updateMoneySpentAndPublicationsNumber(this.totalPrice, user!.id)

        if (this.products.length > 0)
            this.createProducts(publication!.id)
    }

    async createEstablihment() {
        this.newEstablishment!.location = `{'latitude': ${this.placeSelected?.location.latitude}, 'longitude': ${this.placeSelected?.location.longitude}}`
        this.newEstablishment!.score = this.totalScore
        const establishment = await new EstablishmentsRepository().save(this.newEstablishment!)
        return establishment
    }

    createProducts(publicationId: string, menuId?: string) {
        this.products.map(async product => {
            product.publication_id = publicationId
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