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

import { Establishment } from './establishment';
import { Product } from './product';
import { UserModel } from './user-model';

/**
 * 
 *
 * @export
 * @interface Publication
 */
export interface Publication {

    /**
     * @type {string}
     * @memberof Publication
     */
    id?: string;

    /**
     * @type {number}
     * @memberof Publication
     */
    created?: number;

    /**
     * @type {number}
     * @memberof Publication
     */
    totalPrice: number;

    /**
     * @type {number}
     * @memberof Publication
     */
    totalScore: number;

    /**
     * @type {string}
     * @memberof Publication
     */
    image?: string;

    /**
     * @type {UserModel}
     * @memberof Publication
     */
    user: UserModel;

    /**
     * @type {Establishment}
     * @memberof Publication
     */
    establishment: Establishment;

    /**
     * @type {Array<Product>}
     * @memberof Publication
     */
    products?: Array<Product>;
}
