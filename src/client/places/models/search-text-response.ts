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
* @interface SearchTextResponse
*/
export interface SearchTextResponse {

    /**
     * @type {Array<PlacesSearchText>}
     * @memberof SearchTextResponse
     */
    places?: Array<PlacesSearchText>;
}

export interface PlacesSearchText {
    /**
     * @type {string}
     * @memberof PlacesSearchText
     */
    id?: string;

    /**
     * @type {Location}
     * @memberof PlacesSearchText
     */
    location?: Location;

    /**
     * @type {DisplayName}
     * @memberof PlacesSearchText
     */
    displayName?: DisplayName;

    /**
     * @type {string}
     * @memberof PlacesSearchText
     */
    formattedAddress?: string;
}