import { useRoute } from "@react-navigation/native";
import { Icon, Image, NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import { Appearance, Dimensions, FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { AnimationType } from "../../components/Alert";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { SIZES } from "../../config/Sizes";
import { commonStyles } from "../../config/Styles";
import { PublicationData } from "../../data/model/toteco/Publication";
import i18n from "../../infrastructure/localization/i18n";
import { back } from "../../infrastructure/navigation/RootNavigation";
import { FunctionalView } from "../../infrastructure/views/FunctionalView";
import { ProfileViewModel } from "../../viewmodels/ProfileViewModel";
import { profileStyles } from "./ProfileStyles";
import { ShowPublicationModal, ShowPublicationModalProps } from "./components/ShowPublicationModal";

export const ProfileView: FunctionalView<ProfileViewModel> = ({ vm }) => {
    const [refresh, setRefresh] = useState(false)
    const [showPublication, setShowPublication] = useState(false)
    const [publicationSelected, setPublicationSelected] = useState(new PublicationData('', 0, 0, 0, '', ''))
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);

    const route = useRoute()
    const user = route.params

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })
    
    const getPublications = async () => {
        if (user === null)
            await vm.getUser();
        else
            vm.setUser(user)
        await vm.getPublications();
        setRefresh(true);
    }
    useEffect(() => { getPublications() }, [])

    useEffect(() => { setRefresh(false) }, [refresh])

    const showPublicationProps: ShowPublicationModalProps = {
        colorScheme: COLORS,
        animationType: AnimationType.FADE,
        visible: showPublication,
        publicationProps: {
            colorScheme: COLORS,
            publication: publicationSelected,
            styles: { width: "100%", marginVertical: 0 }
        },
        onRequestClose: () => setShowPublication(false)
    }

    const rowRender = (publication: PublicationData) => {
        return (
            <TouchableOpacity onPress={() => { setPublicationSelected(publication); setShowPublication(true) }}>
                <Image size={Dimensions.get('screen').width / 3} source={{ uri: publication.photo }} alt={vm.user?.username ?? ''} />
            </TouchableOpacity>
        )
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
                    <View style={profileStyles.headerContainer}>
                        <Image size={20} borderRadius={100} source={{ uri: vm.user?.photo }} alt={vm.user?.username ?? ''} />
                        <View style={{ paddingTop: 15 }}>
                            <Text style={[commonStyles.text, { color: COLORS.text, fontSize: SIZES.subtitle }]}>{vm.user?.publicationsNumber}</Text>
                            <Text style={[commonStyles.text, { color: COLORS.text }]}>{i18n.t('profile.total_publications')}</Text>
                        </View>
                        <View style={{ paddingTop: 15 }}>
                            <Text style={[commonStyles.text, { color: COLORS.text, fontSize: SIZES.subtitle }]}>{vm.user?.moneySpent}</Text>
                            <Text style={[commonStyles.text, { color: COLORS.text }]}>{i18n.t('profile.money_spent')}</Text>
                        </View>
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
            </NativeBaseProvider>
        </>
    )
}