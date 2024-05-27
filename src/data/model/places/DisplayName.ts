import { DisplayName } from "../../../client/places"


export class DisplayNameData implements DisplayName {

    constructor(
        public text: string,
        public lenguageCode: string
    ) {
        this.text = text
        this.lenguageCode = lenguageCode
    }
}