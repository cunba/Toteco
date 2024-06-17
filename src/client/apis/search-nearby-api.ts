/* tslint:disable */
/* eslint-disable */
/**
 * GOOGLE PLACES SERVICE
 *
 * OpenAPI spec version: 1.0.0
 * Contact: ire.cunba@gmail.com
 */

import globalAxios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, BaseAPI, RequestArgs, RequiredError } from '../base';
import { SearchNearbyRequest, SearchNearbyResponse } from '../models';
/**
 * SearchNearbyApi - axios parameter creator
 * @export
 */
export const SearchNearbyApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * SearchNearby
         * @param {SearchNearbyRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        searchNearby: async (body?: SearchNearbyRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/places:searchNearby`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarHeaderParameter['X-Goog-Api-Key'] = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
            localVarHeaderParameter['X-Goog-FieldMask'] = 'places.displayName,places.id,places.location';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers!['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SearchNearbyApi - functional programming interface
 * @export
 */
export const SearchNearbyApiFp = function (configuration?: Configuration) {
    return {
        /**
         * SearchNearby
         * @param {SearchNearbyRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async searchNearby(body?: SearchNearbyRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<SearchNearbyResponse>>> {
            const localVarAxiosArgs = await SearchNearbyApiAxiosParamCreator(configuration).searchNearby(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs: AxiosRequestConfig = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * SearchNearbyApi - factory interface
 * @export
 */
export const SearchNearbyApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * SearchNearby
         * @param {SearchNearbyRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async searchNearby(body?: SearchNearbyRequest, options?: AxiosRequestConfig): Promise<AxiosResponse<SearchNearbyResponse>> {
            return SearchNearbyApiFp(configuration).searchNearby(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SearchNearbyApi - object-oriented interface
 * @export
 * @class SearchNearbyApi
 * @extends {BaseAPI}
 */
export class SearchNearbyApi extends BaseAPI {
    /**
     * SearchNearby
     * @param {SearchNearbyRequest} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SearchNearbyApi
     */
    public async searchNearby(body?: SearchNearbyRequest, options?: AxiosRequestConfig): Promise<AxiosResponse<SearchNearbyResponse>> {
        return SearchNearbyApiFp(this.configuration).searchNearby(body, options).then((request) => request(this.axios, this.basePath));
    }
}
