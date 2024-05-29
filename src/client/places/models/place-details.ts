/* tslint:disable */
/* eslint-disable */
/**
 * GOOGLE PLACES SERVICE
 *
 * OpenAPI spec version: 1.0.0
 * Contact: ire.cunba@gmail.com
 */

/**
* 
*
* @export
* @interface PlaceDetailsResponse
*/
export interface PlaceDetails {
    /**
     * @type {string}
     * @memberof PlacesDetails
     */
    id?: string;

    /**
     * @type {Location}
     * @memberof PlacesDetails
     */
    location?: Location;

    /**
     * @type {DisplayName}
     * @memberof PlacesDetails
     */
    displayName?: DisplayName;

    /**
     * @type {string}
     * @memberof PlacesDetails
     */
    formattedAddress?: string;

    /**
     * @type {string}
     * @memberof PlacesDetails
     */
    regularOpeningHours?: string;
}

export interface RegularOpeningHours {
    /**
     * @type {boolean}
     * @memberof RegularOpeningHours
     */
    openNow?: boolean;

    /**
     * @type {any}
     * @memberof RegularOpeningHours
     */
    periods?: any;

    /**
     * @type {Array<string>}
     * @memberof RegularOpeningHours
     */
    weekdayDescriptions?: Array<string>;
}

export interface Location {
    /**
     * @type {number}
     * @memberof Location
     */
    latitude?: number;

    /**
     * @type {number}
     * @memberof Location
     */
    longitude?: number;
}

export interface DisplayName {
    /**
     * @type {string}
     * @memberof DisplayName
     */
    text?: string;

    /**
     * @type {string}
     * @memberof DisplayName
     */
    languageCode?: string;
}