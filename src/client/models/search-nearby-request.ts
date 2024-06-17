/* tslint:disable */
/* eslint-disable */
/**
 * GOOGLE PLACES SERVICE
 *
 * OpenAPI spec version: 1.0.0
 * Contact: ire.cunba@gmail.com
 */

import { Location } from ".";

/**
* 
*
* @export
* @interface SearchNearbyRequest
*/
export interface SearchNearbyRequest {

    /**
     * @type {Array<string>}
     * @memberof SearchNearbyRequest
     */
    indludedTypes?: Array<string>;

    /**
     * @type {LocationRestriction}
     * @memberof SearchNearbyRequest
     */
    locationRestriction?: LocationRestriction;
}

export interface LocationRestriction {
    /**
     * @type {Circle}
     * @memberof LocationRestriction
     */
    circle?: Circle;
}

export interface Circle {
    /**
     * @type {Location}
     * @memberof Circle
     */
    center?: Location;

    /**
     * @type {number}
     * @memberof Circle
     */
    radius?: number;
}