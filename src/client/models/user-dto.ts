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
 * User transfer object
 *
 * @export
 * @interface UserDTO
 */
export interface UserDTO {

    /**
     * @type {string}
     * @memberof UserDTO
     */
    username: string;

    /**
     * @type {string}
     * @memberof UserDTO
     */
    name: string;

    /**
     * @type {string}
     * @memberof UserDTO
     */
    surname: string;

    /**
     * @type {number}
     * @memberof UserDTO
     */
    birthDate?: number;

    /**
     * @type {string}
     * @memberof UserDTO
     */
    email: string;

    /**
     * @type {string}
     * @memberof UserDTO
     */
    password: string;

    /**
     * @type {string}
     * @memberof UserDTO
     */
    role: string;
}
