import { DrawerContent, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Heading, NativeBaseProvider } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { NativeModules, Text, View } from 'react-native';
import RNLocation, { Location } from 'react-native-location';
import "react-native-url-polyfill/auto";
import { SearchNearbyApi } from './client/places';
import { PlaceDetailsApi } from './client/places/apis/place-details-api';
import { SearchTextApi } from './client/places/apis/search-text-api';
import { EstablishmentsApi, LoginApi, MenusApi, ProductsApi, PublicationsApi, UsersApi } from './client/toteco';
import { COLORS_DARK, COLORS_LIGHT } from './config/Colors';
import { COLOR_MODE, PLATFORM, ROUTES } from './config/Constants';
import { SIZES } from './config/Sizes';
import { commonStyles } from './config/Styles';
import { LoginRequestData } from './data/model/toteco/LoginData';
import { UserDataDTO } from './data/model/toteco/User';
import { LoginRepository } from './data/repositories/toteco/impl/LoginRepository';
import { UsersRepository } from './data/repositories/toteco/impl/UsersRepository';
import PlacesApiClient, { PlacesApi } from './infrastructure/data/PlacesApiClient';
import { SessionStoreFactory } from './infrastructure/data/SessionStoreFactory';
import TotecosApiClient, { TotecoApi } from './infrastructure/data/TotecoApiClient';
import i18n from './infrastructure/localization/i18n';
import { navigate, navigationRef } from './infrastructure/navigation/RootNavigation';
import { AddPublicationViewModel } from './viewmodels/AddPublicationViewModel';
import { EstablishmentsViewModel } from './viewmodels/EstablishmentsViewModel';
import { HomeViewModel } from './viewmodels/HomeViewModel';
import { LoginViewModel } from './viewmodels/LoginViewModel';
import { RecoveryViewModel } from './viewmodels/RecoveryViewModel';
import { SignUpViewModel } from './viewmodels/SignUpViewModel';
import { AddPublicationView } from './views/addPublication/AddPublicationView';
import { EstablishmentsView } from './views/establishments/EstablishmentsView';
import { HomeView } from './views/home/HomeView';
import { LoginView } from './views/login/LoginView';
import { RecoveryView } from './views/recovery/RecoveryView';
import { SignUpView } from './views/signup/SignUpView';

// TOTECO API
TotecosApiClient.register(TotecoApi.EstablishmentsApi, new EstablishmentsApi)
TotecosApiClient.register(TotecoApi.LoginApi, new LoginApi)
TotecosApiClient.register(TotecoApi.MenusApi, new MenusApi)
TotecosApiClient.register(TotecoApi.ProductsApi, new ProductsApi)
TotecosApiClient.register(TotecoApi.PublicationsApi, new PublicationsApi)
TotecosApiClient.register(TotecoApi.UsersApi, new UsersApi)

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

export const AuthContext = React.createContext<any>({});
export let geolocation: Location | undefined = undefined
let locationSubscription = undefined

const LoginScreen = () => <LoginView vm={new LoginViewModel()} />
const SignUpScreen = () => <SignUpView vm={new SignUpViewModel()} />
const RecoveryScreen = () => <RecoveryView vm={new RecoveryViewModel()} />

const HomeScreen = () => <HomeView vm={new HomeViewModel()} />
const AddPublicationScreen = () => <AddPublicationView vm={new AddPublicationViewModel()} />
const EstablishmentsScreen = () => <EstablishmentsView vm={new EstablishmentsViewModel()} />

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
            const recoverPassword = await SessionStoreFactory.getSessionStore().getRecoverPassword()

            if (isLogged) {
                const credentials = await SessionStoreFactory.getSessionStore().getCredentials()
                let userToken = ''
                if (credentials && credentials.password && credentials.username) {
                    const response: any = await new LoginRepository().login(credentials)
                    userToken = response.token!
                }
                dispatch({ type: 'RESTORE_TOKEN', token: userToken });
            }

            if (recoverPassword) {
                navigate(ROUTES.RECOVERY, null)
            }
        }
        bootstrapAsync()
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (username: string, password: string) => {
                const credentials = new LoginRequestData(username, password)
                const response = await new LoginRepository().login(credentials)
                SessionStoreFactory.getSessionStore().setToken(response.token);
                SessionStoreFactory.getSessionStore().setCredentials(credentials)

                const user = await new UsersRepository().getUserLogged()
                SessionStoreFactory.getSessionStore().setUser(user)
                dispatch({ type: 'SIGN_IN', token: response.token });

            },
            signOut: () => {
                SessionStoreFactory.getSessionStore().setToken('');
                SessionStoreFactory.getSessionStore().setCredentials(undefined)
                SessionStoreFactory.getSessionStore().setUser(undefined);
                dispatch({ type: 'SIGN_OUT' });
            },
            signUp: async (user: UserDataDTO) => {
                await new UsersRepository().save(user)
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