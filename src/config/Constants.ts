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
    PROFILE = 'Profile'
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

export const SUPABASE_URL = 'https://jalmjlkrxjacxpoyxgrq.supabase.co'
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphbG1qbGtyeGphY3hwb3l4Z3JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY3MDE4MTEsImV4cCI6MTk4MjI3NzgxMX0.dcECUZzJbNIkQudD-Pwks769inW4CMSYQxTjqzht91Y'