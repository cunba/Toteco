import { Menu, MenuDTO } from "../../client";
import { ProductData } from "./Product";

export class MenuData implements Menu {
    constructor(
        public id: string,
        public score: number,
        public price: number,
        public products?: ProductData[]
    ) {
        this.id = id
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