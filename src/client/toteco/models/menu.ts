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

import { Product } from './product';
 /**
 * 
 *
 * @export
 * @interface Menu
 */
export interface Menu {

    /**
     * @type {string}
     * @memberof Menu
     */
    id?: string;

    /**
     * @type {number}
     * @memberof Menu
     */
    created?: number;

    /**
     * @type {number}
     * @memberof Menu
     */
    updated?: number;

    /**
     * @type {number}
     * @memberof Menu
     */
    price?: number;

    /**
     * @type {number}
     * @memberof Menu
     */
    score?: number;

    /**
     * @type {Array<Product>}
     * @memberof Menu
     */
    products?: Array<Product>;
}