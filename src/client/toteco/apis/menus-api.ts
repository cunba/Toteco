/* tslint:disable */
/* eslint-disable */
/**
 * TOTECO SERVICE
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
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
import { Menu, MenuDTO } from '../models';
/**
 * MenusApi - axios parameter creator
 * @export
 */
export const MenusApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Delete all menus
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteAll: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/menus`;
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
         * Get all menus
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAll: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/menus`;
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
         * Get menu by id
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getById: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id', 'Required parameter id was null or undefined when calling getById.');
            }
            const localVarPath = `/menus/id/{id}`
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
         * Create new menu
         * @param {MenuDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        save: async (body?: MenuDTO, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/menus`;
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
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Update menu
         * @param {Menu} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        update: async (body?: Menu, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/menus`;
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
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data = needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * MenusApi - functional programming interface
 * @export
 */
export const MenusApiFp = function (configuration?: Configuration) {
    return {
        /**
         * Delete all menus
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteAll(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<number>>> {
            const localVarAxiosArgs = await MenusApiAxiosParamCreator(configuration).deleteAll(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs: AxiosRequestConfig = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get all menus
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAll(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<Menu>>>> {
            const localVarAxiosArgs = await MenusApiAxiosParamCreator(configuration).getAll(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs: AxiosRequestConfig = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get menu by id
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getById(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Menu>>> {
            const localVarAxiosArgs = await MenusApiAxiosParamCreator(configuration).getById(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs: AxiosRequestConfig = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Create new menu
         * @param {MenuDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async save(body?: MenuDTO, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Menu>>> {
            const localVarAxiosArgs = await MenusApiAxiosParamCreator(configuration).save(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs: AxiosRequestConfig = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update menu
         * @param {Menu} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async update(body?: Menu, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<number>>> {
            const localVarAxiosArgs = await MenusApiAxiosParamCreator(configuration).update(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs: AxiosRequestConfig = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * MenusApi - factory interface
 * @export
 */
export const MenusApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Delete all menus
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteAll(options?: AxiosRequestConfig): Promise<AxiosResponse<number>> {
            return MenusApiFp(configuration).deleteAll(options).then((request) => request(axios, basePath));
        },
        /**
         * Get all menus
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAll(options?: AxiosRequestConfig): Promise<AxiosResponse<Array<Menu>>> {
            return MenusApiFp(configuration).getAll(options).then((request) => request(axios, basePath));
        },
        /**
         * Get menu by id
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getById(id: string, options?: AxiosRequestConfig): Promise<AxiosResponse<Menu>> {
            return MenusApiFp(configuration).getById(id, options).then((request) => request(axios, basePath));
        },
        /**
         * Create new menu
         * @param {MenuDTO} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async save(body?: MenuDTO, options?: AxiosRequestConfig): Promise<AxiosResponse<Menu>> {
            return MenusApiFp(configuration).save(body, options).then((request) => request(axios, basePath));
        },
        /**
         * Update menu
         * @param {Menu} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async update(body?: Menu, options?: AxiosRequestConfig): Promise<AxiosResponse<number>> {
            return MenusApiFp(configuration).update(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * MenusApi - object-oriented interface
 * @export
 * @class MenusApi
 * @extends {BaseAPI}
 */
export class MenusApi extends BaseAPI {
    /**
     * Delete all menus
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MenusApi
     */
    public async deleteAll(options?: AxiosRequestConfig): Promise<AxiosResponse<number>> {
        return MenusApiFp(this.configuration).deleteAll(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get all menus
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MenusApi
     */
    public async getAll(options?: AxiosRequestConfig): Promise<AxiosResponse<Array<Menu>>> {
        return MenusApiFp(this.configuration).getAll(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get menu by id
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MenusApi
     */
    public async getById(id: string, options?: AxiosRequestConfig): Promise<AxiosResponse<Menu>> {
        return MenusApiFp(this.configuration).getById(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Create new menu
     * @param {MenuDTO} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MenusApi
     */
    public async save(body?: MenuDTO, options?: AxiosRequestConfig): Promise<AxiosResponse<Menu>> {
        return MenusApiFp(this.configuration).save(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update menu
     * @param {Menu} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MenusApi
     */
    public async update(body?: Menu, options?: AxiosRequestConfig): Promise<AxiosResponse<number>> {
        return MenusApiFp(this.configuration).update(body, options).then((request) => request(this.axios, this.basePath));
    }
}
