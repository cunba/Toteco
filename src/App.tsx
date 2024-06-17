import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { DrawerContent, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInWithPasswordCredentials, createClient } from '@supabase/supabase-js';
import { Heading, NativeBaseProvider } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { NativeModules, Text, View } from 'react-native';
import RNLocation, { Location } from 'react-native-location';
import "react-native-url-polyfill/auto";
import { SearchNearbyApi } from './client';
import { PlaceDetailsApi } from './client/apis/place-details-api';
import { SearchTextApi } from './client/apis/search-text-api';
import { COLORS_DARK, COLORS_LIGHT } from './config/Colors';
import { COLOR_MODE, PLATFORM, ROUTES, SUPABASE_ANON_KEY, SUPABASE_URL } from './config/Constants';
import { SIZES } from './config/Sizes';
import { commonStyles } from './config/Styles';
import { UserDTO, UserData } from './data/model/toteco/User';
import { UsersRepository } from './data/repositories/toteco/impl/UsersRepository';
import PlacesApiClient, { PlacesApi } from './infrastructure/data/PlacesApiClient';
import { SessionStoreFactory } from './infrastructure/data/SessionStoreFactory';
import i18n from './infrastructure/localization/i18n';
import { navigationRef } from './infrastructure/navigation/RootNavigation';
import { AddPublicationViewModel } from './viewmodels/AddPublicationViewModel';
import { EstablishmentsViewModel } from './viewmodels/EstablishmentsViewModel';
import { HomeViewModel } from './viewmodels/HomeViewModel';
import { LoginViewModel } from './viewmodels/LoginViewModel';
import { ProfileViewModel } from './viewmodels/ProfileViewModel';
import { RecoveryEmailViewModel } from './viewmodels/RecoveryEmailViewModel';
import { RecoveryViewModel } from './viewmodels/RecoveryViewModel';
import { SignUpViewModel } from './viewmodels/SignUpViewModel';
import { AddPublicationView } from './views/addPublication/AddPublicationView';
import { EstablishmentsView } from './views/establishments/EstablishmentsView';
import { HomeView } from './views/home/HomeView';
import { LoginView } from './views/login/LoginView';
import { ProfileView } from './views/profile/ProfileView';
import { RecoveryView } from './views/recovery/RecoveryView';
import { RecoveryEmailView } from './views/recoveryEmail/RecoveryEmailView';
import { SignUpView } from './views/signup/SignUpView';

// PLACES API
PlacesApiClient.register(PlacesApi.PlaceDetailsApi, new PlaceDetailsApi)
PlacesApiClient.register(PlacesApi.SearchNearbyApi, new SearchNearbyApi)
PlacesApiClient.register(PlacesApi.SearchTextApi, new SearchTextApi)

let locale: string = PLATFORM === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale : NativeModules.I18nManager.localeIdentifier;
locale.length > 2 ? i18n.changeLanguage(locale.substring(0, 2)) : i18n.changeLanguage(locale)
if (locale === undefined) {
    // iOS 13 workaround, take first of AppleLanguages array  ["en", "en-NZ"]
    locale = NativeModules.SettingsManager.settings.AppleLanguages[0]
    if (locale === undefined) {
        locale = "en" // default language
    }
}

auth()
    .signInAnonymously()
    .then(() => {
        console.log('User signed in anonymously');
    })
    .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
            console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
    });

export const firebaseStorage = storage()

export const AuthContext = React.createContext<any>({});
export let geolocation: Location | undefined = undefined
let locationSubscription = undefined

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const LoginScreen = () => <LoginView vm={new LoginViewModel()} />
const SignUpScreen = () => <SignUpView vm={new SignUpViewModel()} />
const RecoveryScreen = () => <RecoveryView vm={new RecoveryViewModel()} />
const RecoveryEmailScreen = () => < RecoveryEmailView vm={new RecoveryEmailViewModel()} />

const HomeScreen = () => <HomeView vm={new HomeViewModel()} />
const AddPublicationScreen = () => <AddPublicationView vm={new AddPublicationViewModel()} />
const EstablishmentsScreen = () => <EstablishmentsView vm={new EstablishmentsViewModel()} />
const ProfileScreen = () => <ProfileView vm={new ProfileViewModel()} />

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();
const drawerContent = (props: any) => <DrawerContent {...props} />;

// const NavigationDrawer = () => {
//     const { width } = Dimensions.get('window');

//     return (
//         <Drawer.Navigator
//             screenOptions={{
//                 swipeEdgeWidth: width * 0.8,
//                 headerShown: false
//             }}
//             initialRouteName={ROUTES.HOME}
//             drawerContent={drawerContent}
//             backBehavior={'history'}
//         >
//             <Drawer.Screen
//                 options={{
//                     title: i18n.t('home.title'),
//                 }}
//                 name={ROUTES.HOME}
//                 component={HomeScreen}
//             />
//             <Drawer.Screen
//                 options={{
//                     title: i18n.t('add_publication.title'),
//                 }}
//                 name={ROUTES.ADD_PUBLICATION}
//                 component={AddPublicationScreen}
//             />
//         </Drawer.Navigator>
//     );
// };

function App(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(true)

    const loadDataCallback = useCallback(async () => {
        setTimeout(() => { setLoading(false); }, 3000);
    }, []);

    const [state, dispatch] = React.useReducer(
        (prevState: any, action: any) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
                case 'SIGN_UP':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null
                    }
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        },
    );

    useEffect(() => {
        const bootstrapAsync = async () => {
            const isLogged = await SessionStoreFactory.getSessionStore().isLoggedIn()

            if (isLogged) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                let userToken = ''
                if (credentials !== undefined && credentials !== null) {
                    const response = await supabase.auth.signInWithPassword(credentials)
                    if (response.error !== null) {
                        console.log(response.error)
                        throw response.error
                    }
                    userToken = response.data.session.access_token
                }
                dispatch({ type: 'RESTORE_TOKEN', token: userToken });
            }
        }
        bootstrapAsync()
    }, []);

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event == "PASSWORD_RECOVERY") {
                console.log(session?.user)
                console.log('password recovery')
                // const newPassword = prompt("What would you like your new password to be?");
                // const { data, error } = await supabase.auth
                //     .updateUser({ password: newPassword })

                // if (data) alert("Password updated successfully!")
                // if (error) alert("There was an error updating your password.")
            }
        })
    }, [])

    const authContext = React.useMemo(
        () => ({
            signIn: async (email: string, password: string) => {
                const credentials: SignInWithPasswordCredentials = {
                    email: email,
                    password: password
                }
                const response = await supabase.auth.signInWithPassword(credentials)
                if (response.error !== null && response.error !== undefined) {
                    throw response.error
                }

                SessionStoreFactory.getSessionStore().setToken(response.data.session.access_token);
                SessionStoreFactory.getSessionStore().setCredentials(credentials)
                SessionStoreFactory.getSessionStore().setUser(response.data.user as UserData)
                dispatch({ type: 'SIGN_IN', token: response.data.session.access_token });
            },
            signOut: async () => {
                await supabase.auth.signOut()
                SessionStoreFactory.getSessionStore().setToken('');
                SessionStoreFactory.getSessionStore().setCredentials(undefined)
                SessionStoreFactory.getSessionStore().setUser(undefined);
                dispatch({ type: 'SIGN_OUT' });
            },
            signUp: async (user: UserDTO) => {
                try {
                    await new UsersRepository().save(user)
                    dispatch({ type: 'SIGN_UP' });
                } catch (e) {
                    throw e
                }
            }
        }),
        [],
    );

    useEffect(() => {
        loadDataCallback();
    }, [loadDataCallback]);

    useEffect(() => {

        RNLocation.configure({
            distanceFilter: 1, // Meters
            desiredAccuracy: {
                ios: "best",
                android: "balancedPowerAccuracy"
            },
            // Android only
            androidProvider: "auto",
            interval: 5000, // Milliseconds
            fastestInterval: 10000, // Milliseconds
            maxWaitTime: 5000, // Milliseconds
            // iOS Only
            activityType: "other",
            allowsBackgroundLocationUpdates: true,
            headingFilter: 1, // Degrees
            headingOrientation: "portrait",
            pausesLocationUpdatesAutomatically: false,
            showsBackgroundLocationIndicator: false,
        })

        RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
                detail: "coarse"
            }
        }).then(granted => {
            if (granted) {
                locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
                    geolocation = {
                        latitude: locations[0].latitude,
                        longitude: locations[0].longitude
                    } as Location
                })
            }
        })
    }, [geolocation])

    const [COLOR, setCurrentColor] = useState(COLOR_MODE === 'dark' ? COLORS_DARK : COLORS_LIGHT);

    useEffect(() => {
        setCurrentColor(COLOR_MODE === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    }, [])

    return (
        <>
            {!loading ?
                <AuthContext.Provider value={authContext}>
                    <NavigationContainer ref={navigationRef}>
                        <Stack.Navigator>
                            {!state.userToken || state.userToken.length === 0 ? (
                                <>
                                    <Stack.Screen
                                        name={ROUTES.LOGIN}
                                        component={LoginScreen}
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen
                                        name={ROUTES.SIGN_UP}
                                        component={SignUpScreen}
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen
                                        name={ROUTES.RECOVERY}
                                        component={RecoveryScreen}
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen
                                        name={ROUTES.RECOVERY_CODE}
                                        component={RecoveryEmailScreen}
                                        options={{ headerShown: false }}
                                    />
                                </>
                            ) : (
                                <>
                                    <Stack.Screen
                                        name={ROUTES.HOME}
                                        component={HomeScreen}
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen
                                        name={ROUTES.ADD_PUBLICATION}
                                        component={AddPublicationScreen}
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen
                                        name={ROUTES.ESTABLISHMENTS}
                                        component={EstablishmentsScreen}
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen
                                        name={ROUTES.PROFILE}
                                        component={ProfileScreen}
                                        options={{ headerShown: false }}
                                    />
                                </>
                            )}
                        </Stack.Navigator>
                    </NavigationContainer>
                </AuthContext.Provider>
                :
                <View style={{ width: '100%', height: '100%' }}>
                    <View style={{ flex: 4, flexDirection: 'row', alignItems: "center", backgroundColor: COLOR.background, paddingTop: 50 }}>
                        <NativeBaseProvider>
                            <Heading style={{ color: COLOR.touchable, fontSize: 50, paddingTop: 50, alignSelf: 'center' }}>{i18n.t('app_name').toUpperCase()}</Heading>
                        </NativeBaseProvider>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingBottom: 30, flexDirection: 'row', backgroundColor: COLOR.background }}>
                        <Text style={[commonStyles.text, { color: COLOR.text, fontSize: SIZES.text_touchables, paddingRight: 10 }]}>{i18n.t('init')}</Text>
                    </View>
                </View>
            }
        </>
    );
}

export default App;