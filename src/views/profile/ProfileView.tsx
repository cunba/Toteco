import { useRoute } from "@react-navigation/native";
import { Icon, Image, NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import { Appearance, Dimensions, FlatList, Linking, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { AlertPopUp, AlertProps, AlertType, AnimationType } from "../../components/Alert";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { ROUTES } from "../../config/Constants";
import { SIZES } from "../../config/Sizes";
import { commonStyles, formStyles } from "../../config/Styles";
import { UserListData } from "../../data/model/UserListData";
import { Publication } from "../../data/model/toteco/Publication";
import { SessionStoreFactory } from "../../infrastructure/data/SessionStoreFactory";
import i18n from "../../infrastructure/localization/i18n";
import { addScreen, back } from "../../infrastructure/navigation/RootNavigation";
import { FunctionalView } from "../../infrastructure/views/FunctionalView";
import { ProfileViewModel } from "../../viewmodels/ProfileViewModel";
import { profileStyles } from "./ProfileStyles";
import { ShowPublicationModal, ShowPublicationModalProps } from "./components/ShowPublicationModal";

export const ProfileView: FunctionalView<ProfileViewModel> = ({ vm }) => {
    const [refresh, setRefresh] = useState(false)
    const [showPublication, setShowPublication] = useState(false)
    const [publicationSelected, setPublicationSelected] = useState(new Publication(0, 0, '', ''))
    const [isUserLogged, setIsUserLogged] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);
    const [popUpVisible, setPopUpVisible] = useState(false)
    const [iosLink, setIosLink] = useState('')
    const [androidLink, setAndroidLink] = useState('')

    const route = useRoute()
    const user = route.params

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })

    useEffect(() => { setRefresh(false) }, [refresh])

    const getPublications = async () => {
        const userLogged = await SessionStoreFactory.getSessionStore().getUser()
        if (user === null) {
            await vm.getUser();
            setRefresh(true)
        } else
            vm.setUser(user)

        if (userLogged!.id === vm.user!.id)
            setIsUserLogged(true)
        else
            setIsUserLogged(false)

        await vm.getPublications();
        await vm.getFriends()

        if (!isUserLogged && vm.followers?.findIndex(friend => friend.follower.id === userLogged!.id) !== -1)
            setIsFollowing(true)

        setRefresh(true);
    }
    useEffect(() => { getPublications() }, [])

    const showPublicationProps: ShowPublicationModalProps = {
        colorScheme: COLORS,
        animationType: AnimationType.FADE,
        visible: showPublication,
        publicationProps: {
            colorScheme: COLORS,
            publication: publicationSelected,
            styles: { width: "100%", marginVertical: 0 },
            onPressLink: () => {
                const establishmentLocation = JSON.parse(publicationSelected.establishment!.location.replaceAll("'", '"'))
                setIosLink(`maps://${establishmentLocation.latitude},${establishmentLocation.longitude}?q=${publicationSelected.establishment!.name.replaceAll(' ', '%20').replaceAll('&', '%26')}`)
                setAndroidLink(publicationSelected.establishment!.maps_url)
                setShowPublication(false)
                setPopUpVisible(true)
            }
        },
        onRequestClose: () => setShowPublication(false)
    }

    const rowRender = (publication: Publication) => {
        return (
            <TouchableOpacity style={{ borderWidth: 1, borderColor: COLORS.background }} onPress={() => { setPublicationSelected(publication); setShowPublication(true) }}>
                <Image size={Dimensions.get('screen').width / 3} source={{ uri: publication.photo }} alt={vm.user?.username ?? ''} />
            </TouchableOpacity>
        )
    }

    const onPressFollow = async () => {
        await vm.follow()
        setIsFollowing(true)
    }

    const onPressUnfollow = async () => {
        await vm.unfollow()
        setIsFollowing(false)
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
                    <View style={[commonStyles.toolbar, { borderColor: COLORS.shadowToolbar }]}>
                        <TouchableOpacity onPress={() => back()} style={commonStyles.toolbarButton}>
                            <Icon as={<AntDesign name='left' />} size={7} mr="2" color={COLORS.touchable} />
                        </TouchableOpacity>
                        <Text style={[commonStyles.titleToolbar, { color: COLORS.text }]}>{vm.user?.username}</Text>
                        <Text style={{ flex: 1 }}></Text>
                    </View>
                    <View style={[profileStyles.headerContainer, { borderBottomColor: COLORS.shadowToolbar }]}>
                        <View style={profileStyles.profileInfoContainer}>
                            {vm.user?.photo === null || vm.user?.photo === undefined ?
                                <Image size={20} borderRadius={100} source={require("../../assets/images/default-user.png")} alt={''} />
                                :
                                <Image size={20} borderRadius={100} source={{ uri: vm.user?.photo }} alt={vm.user?.username ?? ''} />
                            }
                            <View style={{ paddingTop: 15 }}>
                                <Text style={[commonStyles.text, { color: COLORS.text, fontSize: SIZES.subtitle }]}>{vm.user?.publications_number ?? 0}</Text>
                                <Text style={[commonStyles.text, { color: COLORS.text }]}>{i18n.t('profile.total_publications')}</Text>
                            </View>
                            <TouchableOpacity style={{ paddingTop: 15 }} onPress={() => addScreen(ROUTES.USER_LIST, new UserListData(i18n.t('user_list.followers'), vm.followers!))}>
                                <Text style={[commonStyles.text, { color: COLORS.text, fontSize: SIZES.subtitle }]}>{vm.followers?.length ?? 0}</Text>
                                <Text style={[commonStyles.text, { color: COLORS.text }]}>{i18n.t('profile.followers')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ paddingTop: 15 }} onPress={() => addScreen(ROUTES.USER_LIST, new UserListData(i18n.t('user_list.following'), vm.following!))}>
                                <Text style={[commonStyles.text, { color: COLORS.text, fontSize: SIZES.subtitle }]}>{vm.following?.length ?? 0}</Text>
                                <Text style={[commonStyles.text, { color: COLORS.text }]}>{i18n.t('profile.following')}</Text>
                            </TouchableOpacity>
                        </View>
                        {isUserLogged ?
                            null :
                            <TouchableOpacity
                                style={[formStyles.button, profileStyles.followButton, { backgroundColor: isFollowing ? COLORS.background_second : COLORS.touchable }]}
                                onPress={isFollowing ? onPressUnfollow : onPressFollow}
                            >
                                <Text style={[commonStyles.text, { color: COLORS.text_touchable, fontSize: SIZES.text }]}>{isFollowing ? i18n.t('profile.button.unfollow') : i18n.t('profile.button.follow')}</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    {(vm.publications && vm.publications!.length > 0) ?
                        <FlatList
                            numColumns={3}
                            data={vm.publications}
                            renderItem={({ item }) => rowRender(item)}
                            refreshControl={(
                                <RefreshControl
                                    refreshing={refresh}
                                    onRefresh={getPublications}
                                />
                            )}
                        />
                        : null
                    }
                </View>
                <ShowPublicationModal {...showPublicationProps} />
                <AlertPopUp {...alertPopUp} />
            </NativeBaseProvider>
        </>
    )
}