import { Product, ProductDTO, Publication } from "../../../client/toteco";
import { MenuData } from "./Menu";

export class ProductData implements Product {

    constructor(
        public id: string,
        public name: string,
        public created: number,
        public inMenu: boolean,
        public score: number,
        public updated?: number,
        public price?: number,
        public publication?: Publication,
        public menu?: MenuData
    ) {
        this.id = id
        this.name = name
        this.created = created
        this.updated = updated
        this.inMenu = inMenu
        this.price = price
        this.score = score
        this.menu = menu
        this.publication = publication
    }
}

export class ProductDataDTO implements ProductDTO {

    constructor(
        public name?: string,
        public inMenu?: boolean,
        public score?: number,
        public publicationId?: string,
        public menuId?: string,
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