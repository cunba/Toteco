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

import { Product } from './product';
 /**
 * 
 *
 * @export
 * @interface Establishment
 */
export interface Establishment {

    /**
     * @type {string}
     * @memberof Establishment
     */
    id?: string;

    /**
     * @type {string}
     * @memberof Establishment
     */
    name?: string;

    /**
     * @type {number}
     * @memberof Establishment
     */
    created?: number;

    /**
     * @type {number}
     * @memberof Establishment
     */
    updated?: number;

    /**
     * @type {string}
     * @memberof Establishment
     */
    location?: string;

    /**
     * @type {boolean}
     * @memberof Establishment
     */
    isOpen?: boolean;

    /**
     * @type {boolean}
     * @memberof Establishment
     */
    isComputerAllowed?: boolean;

    /**
     * @type {string}
     * @memberof Establishment
     */
    comments?: string;

    /**
     * @type {number}
     * @memberof Establishment
     */
    score?: number;

    /**
     * @type {Array<Product>}
     * @memberof Establishment
     */
    publications?: Array<Product>;
}
