/* tslint:disable */
/* eslint-disable */
/**
 * GOOGLE PLACES SERVICE
 *
 * OpenAPI spec version: 1.0.0
 * Contact: ire.cunba@gmail.com
 */

import { DisplayName, Location } from ".";

/**
* 
*
* @export
* @interface SearchNearbyResponse
*/
export interface SearchNearbyResponse {

    /**
     * @type {Array<PlacesSearchNearby>}
     * @memberof SearchNearbyResponse
     */
    places?: Array<PlacesSearchNearby>;
}

export interface PlacesSearchNearby {
    /**
     * @type {string}
     * @memberof PlacesSearchNearby
     */
    id?: string;

    /**
     * @type {Location}
     * @memberof PlacesSearchNearby
     */
    location?: Location;

    /**
     * @type {DisplayName}
     * @memberof PlacesSearchNearby
     */
    displayName?: DisplayName;
}
