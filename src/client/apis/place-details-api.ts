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
import { GOOGLE_MAPS_KEY } from '../../config/Constants';
import { BASE_PATH, BaseAPI, RequestArgs, RequiredError } from '../base';
import { PlaceDetails } from '../models';
/**
 * PlaceDetailsApi - axios parameter creator
 * @export
 */
export const PlaceDetailsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * PlaceDetails
         * @param {string} [id] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        placeDetails: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id', 'Required parameter id was null or undefined when calling getById.');
            }
            const localVarPath = `/places/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions: AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarHeaderParameter['X-Goog-Api-Key'] = GOOGLE_MAPS_KEY;
            localVarHeaderParameter['X-Goog-FieldMask'] = 'places.displayName,places.id,places.location,places.formattedAddress';

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

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PlaceDetailsApi - functional programming interface
 * @export
 */
export const PlaceDetailsApiFp = function (configuration?: Configuration) {
    return {
        /**
         * PlaceDetails
         * @param {string} [id]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async placeDetails(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<PlaceDetails>>> {
            const localVarAxiosArgs = await PlaceDetailsApiAxiosParamCreator(configuration).placeDetails(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs: AxiosRequestConfig = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * PlaceDetailsApi - factory interface
 * @export
 */
export const PlaceDetailsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * PlaceDetails
         * @param {string} [id]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async placeDetails(id: string, options?: AxiosRequestConfig): Promise<AxiosResponse<PlaceDetails>> {
            return PlaceDetailsApiFp(configuration).placeDetails(id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PlaceDetailsApi - object-oriented interface
 * @export
 * @class PlaceDetailsApi
 * @extends {BaseAPI}
 */
export class PlaceDetailsApi extends BaseAPI {
    /**
     * PlaceDetails
     * @param {string} [id]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlaceDetailsApi
     */
    public async placeDetails(id: string, options?: AxiosRequestConfig): Promise<AxiosResponse<PlaceDetails>> {
        return PlaceDetailsApiFp(this.configuration).placeDetails(id, options).then((request) => request(this.axios, this.basePath));
    }
}
