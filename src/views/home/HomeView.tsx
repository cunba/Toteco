import { Icon, Image, NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import { Appearance, Dimensions, Linking, Text, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";
import { AuthContext } from "../../App";
import { AlertPopUp, AlertProps, AlertType } from "../../components/Alert";
import { MultiLevelFabButton, MultiLevelFabButtonType } from "../../components/MultiLevelFabButton";
import PublicationCard, { PublicationProps } from "../../components/Publication/PublicationCard";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { ROUTES } from "../../config/Constants";
import { SIZES } from "../../config/Sizes";
import { commonStyles, stylesRicyclerList } from "../../config/Styles";
import i18n from "../../infrastructure/localization/i18n";
import { navigate } from "../../infrastructure/navigation/RootNavigation";
import { FunctionalView } from "../../infrastructure/views/FunctionalView";
import { HomeViewModel } from "../../viewmodels/HomeViewModel";
import { homeStyles } from "./HomeStyles";

export const HomeView: FunctionalView<HomeViewModel> = ({ vm }) => {
    const [open, setOpen] = useState(false)
    const [scroll, setScroll] = useState<any>()
    const [refresh, setRefresh] = useState(false)
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);
    const [popUpVisible, setPopUpVisible] = useState(false)
    const [iosLink, setIosLink] = useState('')
    const [androidLink, setAndroidLink] = useState('')

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })
    useEffect(() => { setRefresh(false) }, [refresh])

    const getPublications = async () => {
        await vm.getPublications();
        setRefresh(true);
    }
    useEffect(() => { getPublications() }, [])


    const [dataSource, setDataSource] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    )

    const getDataSource = (): DataProvider => {
        return dataSource.cloneWithRows(vm.publications!)
    }

    const layoutProvider = new LayoutProvider(
        index => {
            return 0
        },
        (type, dim) => {
            dim.height = 370
            dim.width = Dimensions.get('window').width
        },
    )

    const { signOut } = React.useContext(AuthContext)

    const handlerButton = () => {
        navigate(ROUTES.ADD_PUBLICATION, null)
    }

    const options = {
        type: MultiLevelFabButtonType.CIRCULAR,
        size: SIZES.fabButton,
        onPress: () => !open ? handlerButton() : setOpen(false),
        onLongPress: () => setOpen(true),
        icon: <Icon as={<MaterialIcons name='add' />} size={SIZES.icons} mr="2" color={COLORS.text_touchable} style={{ paddingLeft: 5 }} />,
        bgColor: COLORS.touchable,
        color: COLORS.text,
        children: [
            {
                icon: (
                    <View style={[homeStyles.iconContainer, { borderColor: COLORS.touchable, backgroundColor: COLORS.background_second }]}>
                        <Foundation name='map' size={SIZES.icons} color={COLORS.text_touchable} />
                    </View>
                ),
                title: 'establishments',
                color: COLORS.background_second,
                onPress: () => navigate(ROUTES.ESTABLISHMENTS, null)
            },
            {
                icon: (
                    <View style={[homeStyles.iconContainer, { borderColor: COLORS.touchable, backgroundColor: COLORS.background_second }]}>
                        {vm.user?.photo === null || vm.user?.photo === undefined ?
                            <Image size={10} borderRadius={100} source={require("../../assets/images/default-user.png")} alt={''} />
                            :
                            <Image size={10} borderRadius={100} source={{ uri: vm.user?.photo }} alt={vm.user?.username ?? ''} />
                        }
                    </View>
                ),
                title: 'profile',
                color: COLORS.touchable,
                onPress: () => navigate(ROUTES.PROFILE, null)
            },
            // {
            //     icon: (
            //         <View style={[homeStyles.iconContainer, { borderColor: COLORS.touchable, backgroundColor: COLORS.background_second }]}>
            //             <Ionicons name='settings-outline' size={SIZES.icons} color={COLORS.text_touchable} />
            //         </View>
            //     ),
            //     title: 'settings',
            //     onPress: () => console.log('entra a settings'),
            //     color: COLORS.touchable
            //     // onPress: () => navigate(ROUTES.SETTINGS, null)
            // },
            {
                icon: (
                    <View style={[homeStyles.iconContainer, { borderColor: COLORS.touchable, backgroundColor: COLORS.background_second }]}>
                        <FontAwesome name='sign-out' size={SIZES.icons} color={COLORS.text_touchable} style={{ paddingLeft: 5 }} />
                    </View>
                ),
                title: 'sign-out',
                onPress: () => signOut(),
                color: COLORS.touchable
            }
        ]
    };

    const rowRender = (type: any, publication: any, index: number) => {
        const props: PublicationProps = {
            colorScheme: COLORS,
            publication: publication,
            onPressIcon: () => navigate(ROUTES.PROFILE, publication.user),
            onPressLink: () => {
                const establishmentLocation = JSON.parse(publication.establishment!.location.replaceAll("'", '"'))
                setIosLink(`maps://${establishmentLocation.latitude},${establishmentLocation.longitude}?q=${publication.establishment!.name.replaceAll(' ', '%20').replaceAll('&', '%26')}`)
                setAndroidLink(publication.establishment!.maps_url)
                setPopUpVisible(true)
            }
        }
        return (<PublicationCard {...props} />)
    }

    const alertPopUp: AlertProps = {
        type: AlertType.MENU,
        visible: popUpVisible,
        title: i18n.t('open_link'),
        onRequestClose: function (): void {
            setPopUpVisible(false)
            setIosLink('')
            setAndroidLink('')
        },
        colorScheme: COLORS,
        options: [
            {
                text: 'Apple Maps',
                color: COLORS.text,
                onPress: () => {
                    setPopUpVisible(false)
                    Linking.openURL(iosLink)
                    setIosLink('')
                    setAndroidLink('')
                },
                bgColor: 'transparent',
                style: {
                    width: '100%',
                    borderTopWidth: 0.5
                }
            },
            {
                text: 'Google Maps',
                color: COLORS.text,
                onPress: () => {
                    setPopUpVisible(false)
                    Linking.openURL(androidLink)
                    setIosLink('')
                    setAndroidLink('')
                },
                bgColor: 'transparent'
            },
            {
                text: i18n.t('cancel'),
                color: COLORS.text_touchable,
                onPress: () => {
                    setPopUpVisible(false)
                    setIosLink('')
                    setAndroidLink('')
                },
                bgColor: COLORS.touchable,
                style: {
                    width: '100%',
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5
                }
            }
        ]
    }

    return (
        <>
            <NativeBaseProvider>
                <View style={[commonStyles.container, { backgroundColor: COLORS.background }]}>
                    <View style={[commonStyles.toolbar, { borderBottomColor: COLORS.shadowToolbar }]}>
                        <Text style={[commonStyles.title, { color: COLORS.touchable }]}>{i18n.t('app_name').toUpperCase()}</Text>
                    </View>
                    {vm.publications!.length > 0 ?
                        <RecyclerListView
                            ref={(c) => { setScroll(c) }}
                            showsVerticalScrollIndicator={false}
                            style={stylesRicyclerList.recyclerListView}
                            layoutProvider={layoutProvider}
                            dataProvider={getDataSource()}
                            rowRenderer={rowRender}
                            scrollViewProps={{
                                refreshControl: (
                                    <RefreshControl
                                        refreshing={refresh}
                                        onRefresh={getPublications}
                                    />
                                )
                            }}
                        />
                        :
                        <ScrollView refreshControl=
                            {<RefreshControl
                                refreshing={refresh}
                                onRefresh={getPublications}
                            />}
                        />
                    }
                </View>
                <MultiLevelFabButton {...options} />
                <AlertPopUp {...alertPopUp} />
            </NativeBaseProvider>
        </>
    )
}