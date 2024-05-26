import { Menu, MenuDTO } from "../../../client/toteco";
import { ProductData } from "./Product";

export class MenuData implements Menu {
    constructor(
        public id: string,
        public created: number,
        public updated: number,
        public price: number,
        public score: number,
        public products?: ProductData[]
    ) {
        this.id = id
        this.created = created
        this.updated = updated
        this.price = price
        this.score = score
        this.products = products
    }
}

export class MenuDataDTO implements MenuDTO {
    constructor(
        public price: number,
        public score: number
    ) {
        this.price = price
        this.score = score
    }
}