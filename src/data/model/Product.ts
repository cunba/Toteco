import { Product, ProductDTO, Publication, Type } from "../../client";
import { MenuData } from "./Menu";

export class ProductData implements Product {

    constructor(
        public id?: number,
        public type?: Type,
        public date?: string,
        public price?: number,
        public score?: number,
        public menu?: MenuData,
        public publication?: Publication
    ) {
        this.id = id
        this.type = type
        this.date = date
        this.price = price
        this.score = score
        this.menu = menu
        this.publication = publication
    }
}

export class ProductDataDTO implements ProductDTO {

    constructor(
        public typeId?: number,
        public inMenu?: boolean,
        public price?: number,
        public score?: number,
        public menuId?: number,
        public publicationId?: number
    ) {
        this.typeId = typeId
        this.inMenu = inMenu
        this.price = price
        this.score = score
        this.menuId = menuId
        this.publicationId = publicationId
    }
}