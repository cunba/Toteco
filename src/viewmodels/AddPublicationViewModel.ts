import { makeAutoObservable } from "mobx";
import { EstablishmentData } from "../data/model/Establishment";
import { MenuDataDTO } from "../data/model/Menu";
import { ProductDataDTO } from "../data/model/Product";
import { PublicationDataDTO } from "../data/model/Publication";
import { SessionStoreFactory } from "../infrastructure/data/SessionStoreFactory";

export class AddPublicationViewModel {

    establishment?: EstablishmentData
    establishmentScore?: number
    products: ProductDataDTO[]
    menus: MenuDataDTO[]
    totalScore: number
    totalPrice: number
    image?: string

    constructor() {
        makeAutoObservable(this)
        this.products = []
        this.menus = []
        this.totalScore = 0
        this.totalPrice = 0
    }

    setTotalScore() {
        let productScore = 0
        this.products.map(product => productScore = productScore + product.score)
        let menusScore = 0
        this.menus.map(menu => menusScore = menusScore + menu.score)
        this.totalScore = (this.establishmentScore! + productScore + menusScore) / (this.products.length + this.menus.length + 1)
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