/* tslint:disable */
/* eslint-disable */
/**
 * Toteco Service
 * Toteco API
 *
 * OpenAPI spec version: v0.0.1
 * Contact: ire.cunba@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import {
    
} from ".";

/**
 * Product transfer object
 *
 * @export
 * @interface ProductDTO
 */
export interface ProductDTO {

    /**
     * @type {string}
     * @memberof ProductDTO
     */
    name: string;

    /**
     * @type {boolean}
     * @memberof ProductDTO
     */
    inMenu: boolean;

    /**
     * @type {number}
     * @memberof ProductDTO
     */
    price?: number;

    /**
     * @type {number}
     * @memberof ProductDTO
     */
    score: number;

    /**
     * @type {string}
     * @memberof ProductDTO
     */
    menuId?: string;

    /**
     * @type {string}
     * @memberof ProductDTO
     */
    publicationId: string;
}
