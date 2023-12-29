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

import {
    
} from ".";

/**
 * 
 *
 * @export
 * @interface User
 */
export interface User {

    /**
     * @type {number}
     * @memberof User
     * @example 0
     */
    id?: number;

    /**
     * @type {string}
     * @memberof User
     * @example cunba
     */
    username?: string;

    /**
     * @type {string}
     * @memberof User
     * @example Irene
     */
    name?: string;

    /**
     * @type {string}
     * @memberof User
     * @example Cunto
     */
    surname?: string;

    /**
     * @type {string}
     * @memberof User
     * @example 05-09-1995
     */
    birthDate?: string;

    /**
     * @type {string}
     * @memberof User
     * @example a25540@svalero.com
     */
    email?: string;

    /**
     * @type {string}
     * @memberof User
     */
    password?: string;

    /**
     * @type {string}
     * @memberof User
     * @example 04-03-2022
     */
    creationDate?: string;

    /**
     * @type {boolean}
     * @memberof User
     * @example true
     */
    active?: boolean;

    /**
     * @type {number}
     * @memberof User
     * @example 25.4
     */
    moneySpent?: number;

    /**
     * @type {number}
     * @memberof User
     * @example 17
     */
    publicationsNumber?: number;

    /**
     * @type {string}
     * @memberof User
     * @example USER
     */
    role?: string;
}
