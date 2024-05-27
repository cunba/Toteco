import { SearchTextRequest } from "../../../client/places"


export class SearchTextRequestData implements SearchTextRequest {

    constructor(
        public textQuery: string
    ) {
        this.textQuery = textQuery
    }
}