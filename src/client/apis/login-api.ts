/* tslint:disable */
/* eslint-disable */
/**
 * TOTECO API
 * API to manage publications about products (coffee, tea or toast) like a social media. The idea is to create a community that publishes photos of their toasts with coffee or tea adding the price and being able to rate the products and the establishments.
 *
 * OpenAPI spec version: 1.0
 * Contact: a25540@svalero.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { Exception } from '../models';
import { JwtRequest } from '../models';
import { JwtResponse } from '../models';
/**
 * LoginApi - axios parameter creator
 * @export
 */
export const LoginApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Login with an existing user
         * @summary Login
         * @param {JwtRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login: async (body?: JwtRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * LoginApi - functional programming interface
 * @export
 */
export const LoginApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Login with an existing user
         * @summary Login
         * @param {JwtRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async login(body?: JwtRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<JwtResponse>>> {
            const localVarAxiosArgs = await LoginApiAxiosParamCreator(configuration).login(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * LoginApi - factory interface
 * @export
 */
export const LoginApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Login with an existing user
         * @summary Login
         * @param {JwtRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async login(body?: JwtRequest, options?: AxiosRequestConfig): Promise<AxiosResponse<JwtResponse>> {
            return LoginApiFp(configuration).login(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * LoginApi - object-oriented interface
 * @export
 * @class LoginApi
 * @extends {BaseAPI}
 */
export class LoginApi extends BaseAPI {
    /**
     * Login with an existing user
     * @summary Login
     * @param {JwtRequest} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoginApi
     */
    public async login(body?: JwtRequest, options?: AxiosRequestConfig) : Promise<AxiosResponse<JwtResponse>> {
        return LoginApiFp(this.configuration).login(body, options).then((request) => request(this.axios, this.basePath));
    }
}
