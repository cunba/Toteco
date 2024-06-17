import { SearchTextRequest } from "../../../client"


export class SearchTextRequestData implements SearchTextRequest {

    constructor(
        public textQuery: string
    ) {
        this.textQuery = textQuery
    }
}