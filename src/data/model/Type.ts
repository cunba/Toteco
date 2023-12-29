import { Type, TypeDTO } from "../../client";

export class TypeData implements Type {
    constructor(
        public id?: number,
        public type?: string,
        public productName?: string
    ) {
        this.id = id
        this.type = type
        this.productName = productName
    }
}

export class TypeDataDTO implements TypeDTO {
    constructor(
        public type?: string,
        public productName?: string
    ) {
        this.type = type
        this.productName = productName
    }

}