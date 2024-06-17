import { Appearance, Platform } from 'react-native'

export const APP = 'Toteco'

export enum ROUTES {
    LOGIN = 'Login',
    HOME = 'Home',
    // DRAWER = 'Drawer',
    RECOVERY = 'Recovery',
    SIGN_UP = 'Sign up',
    ESTABLISHMENTS = 'Establishments',
    ADD_PUBLICATION = 'Add publication',
    PROFILE = 'Profile',
    SEND_EMAIL = 'Send email'
}

export const PLATFORM = Platform.OS
export const COLOR_MODE = Appearance.getColorScheme()

export const PHOTO_ALBUM_NAME = APP
export const SHARED_PREFERENCES_PACKAGE_NAME = APP.toLowerCase() + '_preferences'
export const VERSION = '0.0.1'

export const REQUEST_TRIES_LIMIT = 3
export const REQUEST_RETRY_DELAY = 60
export const RELOAD_TIMEOUT = 5000

export const MINUTES_TO_URGENT = 30
export const MAX_PHOTOS = 10

export const DAY_TIMESTAMP = 86400000

export const SUPABASE_URL = 'https://dopdqjdjuiwnpuwcihbi.supabase.co'
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvcGRxamRqdWl3bnB1d2NpaGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1OTM2MDMsImV4cCI6MjAzNDE2OTYwM30.UO-5O2ALgm-NIIRNPKS5vh1yO1A4iXMP0bbkob7Pi4o'
export const GOOGLE_MAPS_KEY = 'AIzaSyAa0XCtkG9q59pBSR7DLsgdMa9CR-jyAJw'