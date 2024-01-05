import { Platform } from "react-native"

export const APP = "MoviSign"

export enum ROUTES {
    LOGIN = "Login",
    HOME = "Home",
    NFC_SIGN = "NFCSign",
    QR_SIGN = "QRSign",
    MANUAL_SIGN = "ManualSign",
    HISTORY = "History",
    STATS = "Statistics",
    CALENDAR = "Calendar",
    MISSED_SIGN = "MissedSignings",
    QR_SIGNING_LOGED = "QrSigningLoged",
    SETTINGS = "Settings"
}

export const isAndroid = Platform.OS === 'android'
export const isiOS = !isAndroid

export const PHOTO_ALBUM_NAME = APP
export const SHARED_PREFERENCES_PACKAGE_NAME = APP.toLowerCase() + "_preferences" 
export const VERSION = "0.0.1"

export const REQUEST_TRIES_LIMIT = 3
export const REQUEST_RETRY_DELAY = 60
export const RELOAD_TIMEOUT = 5000

export const MINUTES_TO_URGENT = 30
export const MAX_PHOTOS = 10