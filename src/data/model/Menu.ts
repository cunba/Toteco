import { Menu, MenuDTO } from "../../client";

export class MenuData implements Menu {
    constructor(
        public id?: number,
        public date?: string,
        public score?: number,
        public price?: number
    ) {
        this.id = id
        this.date = date
        this.price = price
        this.score = score
    }
}

export class MenuDataDTO implements MenuDTO {
    constructor(
        public score?: number,
        public price?: number
    ) {
        this.price = price
        this.score = score
    }
}