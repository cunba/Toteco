/* tslint:disable */
/* eslint-disable */
/**
 * TOTECO SERVICE
 * Toteco API
 *
 * OpenAPI spec version: 1.0.0
 * Contact: ire.cunba@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import globalAxios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, BaseAPI, RequestArgs, RequiredError } from '../base';
import { Establishment, EstablishmentDTO } from '../models';
/**
 * EstablishmentsApi - axios parameter creator
 * @export
 */
export const EstablishmentsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Delete all establishments
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteAll: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/establishments`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions: AxiosRequestConfig = { method: 'DELETE', ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

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
        /**
         * Get all establishments
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAll: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/establishments`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions: AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

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
        /**
         * Get establishment by id
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getById: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id', 'Required parameter id was null or undefined when calling getById.');
            }
            const localVarPath = `/establishments/id/{id}`
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

            // authentication BearerAuth required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

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
        /**
         * Get by name
         * @param {string} name 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getByName: async (name: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'name' is not null or undefined
            if (name === null || name === undefined) {
                throw new RequiredError('name', 'Required parameter name was null or undefined when calling getByName.');
            }
            const localVarPath = `/establishments/name/{name}`
                .replace(`{${"name"}}`, encodeURIComponent(String(name)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions: AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

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
        /**
         * Create new establishment
         * @param {EstablishmentDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        save: async (body?: EstablishmentDTO, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/establishments`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

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
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers!['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Update establishment
         * @param {Establishment} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        update: async (body?: Establishment, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/establishments`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions: AxiosRequestConfig = { method: 'PUT', ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication BearerAuth required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

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
 * EstablishmentsApi - functional programming interface
 * @export
 */
export const EstablishmentsApiFp = function (configuration?: Configuration) {
    return {
        /**
         * Delete all establishments
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteAll(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<number>>> {
            const localVarAxiosArgs = await EstablishmentsApiAxiosParamCreator(configuration).deleteAll(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs: AxiosRequestConfig = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get all establishments
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAll(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<Establishment>>>> {
            const localVarAxiosArgs = await EstablishmentsApiAxiosParamCreator(configuration).getAll(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs: AxiosRequestConfig = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get establishment by id
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getById(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Establishment>>> {
            const localVarAxiosArgs = await EstablishmentsApiAxiosParamCreator(configuration).getById(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs: AxiosRequestConfig = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get by name
         * @param {string} name 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getByName(name: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Establishment>>> {
            const localVarAxiosArgs = await EstablishmentsApiAxiosParamCreator(configuration).getByName(name, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs: AxiosRequestConfig = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Create new establishment
         * @param {EstablishmentDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async save(body?: EstablishmentDTO, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Establishment>>> {
            const localVarAxiosArgs = await EstablishmentsApiAxiosParamCreator(configuration).save(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs: AxiosRequestConfig = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update establishment
         * @param {Establishment} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async update(body?: Establishment, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<number>>> {
            const localVarAxiosArgs = await EstablishmentsApiAxiosParamCreator(configuration).update(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs: AxiosRequestConfig = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * EstablishmentsApi - factory interface
 * @export
 */
export const EstablishmentsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Delete all establishments
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteAll(options?: AxiosRequestConfig): Promise<AxiosResponse<number>> {
            return EstablishmentsApiFp(configuration).deleteAll(options).then((request) => request(axios, basePath));
        },
        /**
         * Get all establishments
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAll(options?: AxiosRequestConfig): Promise<AxiosResponse<Array<Establishment>>> {
            return EstablishmentsApiFp(configuration).getAll(options).then((request) => request(axios, basePath));
        },
        /**
         * Get establishment by id
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getById(id: string, options?: AxiosRequestConfig): Promise<AxiosResponse<Establishment>> {
            return EstablishmentsApiFp(configuration).getById(id, options).then((request) => request(axios, basePath));
        },
        /**
         * Get by name
         * @param {string} name 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getByName(name: string, options?: AxiosRequestConfig): Promise<AxiosResponse<Establishment>> {
            return EstablishmentsApiFp(configuration).getByName(name, options).then((request) => request(axios, basePath));
        },
        /**
         * Create new establishment
         * @param {EstablishmentDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async save(body?: EstablishmentDTO, options?: AxiosRequestConfig): Promise<AxiosResponse<Establishment>> {
            return EstablishmentsApiFp(configuration).save(body, options).then((request) => request(axios, basePath));
        },
        /**
         * Update establishment
         * @param {Establishment} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async update(body?: Establishment, options?: AxiosRequestConfig): Promise<AxiosResponse<number>> {
            return EstablishmentsApiFp(configuration).update(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * EstablishmentsApi - object-oriented interface
 * @export
 * @class EstablishmentsApi
 * @extends {BaseAPI}
 */
export class EstablishmentsApi extends BaseAPI {
    /**
     * Delete all establishments
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EstablishmentsApi
     */
    public async deleteAll(options?: AxiosRequestConfig): Promise<AxiosResponse<number>> {
        return EstablishmentsApiFp(this.configuration).deleteAll(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get all establishments
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EstablishmentsApi
     */
    public async getAll(options?: AxiosRequestConfig): Promise<AxiosResponse<Array<Establishment>>> {
        return EstablishmentsApiFp(this.configuration).getAll(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get establishment by id
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EstablishmentsApi
     */
    public async getById(id: string, options?: AxiosRequestConfig): Promise<AxiosResponse<Establishment>> {
        return EstablishmentsApiFp(this.configuration).getById(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get by name
     * @param {string} name 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EstablishmentsApi
     */
    public async getByName(name: string, options?: AxiosRequestConfig): Promise<AxiosResponse<Establishment>> {
        return EstablishmentsApiFp(this.configuration).getByName(name, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Create new establishment
     * @param {EstablishmentDTO} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EstablishmentsApi
     */
    public async save(body?: EstablishmentDTO, options?: AxiosRequestConfig): Promise<AxiosResponse<Establishment>> {
        return EstablishmentsApiFp(this.configuration).save(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update establishment
     * @param {Establishment} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EstablishmentsApi
     */
    public async update(body?: Establishment, options?: AxiosRequestConfig): Promise<AxiosResponse<number>> {
        return EstablishmentsApiFp(this.configuration).update(body, options).then((request) => request(this.axios, this.basePath));
    }
}
