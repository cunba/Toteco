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

 /**
 * 
 *
 * @export
 * @interface Exception
 */
export interface Exception {

    /**
     * @type {number}
     * @memberof Exception
     */
    code?: number;

    /**
     * @type {{ [key: string]: string; }}
     * @memberof Exception
     */
    errors?: { [key: string]: string; };

    /**
     * @type {string}
     * @memberof Exception
     */
    message?: string;
}