import { Product, ProductDTO, Publication } from "../../client";
import { MenuData } from "./Menu";

export class ProductData implements Product {

    constructor(
        public id: string,
        public name: string,
        public inMenu: boolean,
        public score: number,
        public price?: number,
        public menu?: MenuData,
        public publication?: Publication
    ) {
        this.id = id
        this.name = name
        this.inMenu = inMenu
        this.price = price
        this.score = score
        this.menu = menu
        this.publication = publication
    }
}

export class ProductDataDTO implements ProductDTO {

    constructor(
        public name: string,
        public inMenu: boolean,
        public score: number,
        public menuId: string,
        public publicationId: string,
        public price?: number
    ) {
        this.name = name
        this.inMenu = inMenu
        this.price = price
        this.score = score
        this.menuId = menuId
        this.publicationId = publicationId
    }
}