import { AxiosResponse } from "axios"
import { SearchTextRequestData } from "../../model/places/SearchTextRequest"
import { SearchTextResponseData } from "../../model/places/SearchTextResponse"


export interface ISearchTextApi {

    searchText(searchTextRequest: SearchTextRequestData): Promise<AxiosResponse<SearchTextResponseData>>

}