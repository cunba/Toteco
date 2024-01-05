import { Icon, Image, NativeBaseProvider } from "native-base";
import React, { useState } from "react";
import { Appearance, ScrollView, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../../App";
import { MultiLevelFabButton, MultiLevelFabButtonType } from "../../components/MultiLevelFabButton";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { SIZES } from "../../config/Sizes";
import { commonStyles } from "../../config/Styles";
import i18n from "../../infrastructure/localization/i18n";
import { FunctionalView } from "../../infrastructure/views/FunctionalView";
import { HomeViewModel } from "../../viewmodels/HomeViewModel";
import { homeStyles } from "./HomeStyles";

export const HomeView: FunctionalView<HomeViewModel> = ({ vm }) => {
    const [open, setOpen] = useState(false)
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })

    const { signOut } = React.useContext(AuthContext)

    const handlerButton = () => {

    }

    const options = {
        type: MultiLevelFabButtonType.CIRCULAR,
        size: SIZES.fabButton,
        onPress: () => !open ? handlerButton() : setOpen(false),
        onLongPress: () => setOpen(true),
        icon: <MaterialIcons
            name="add"
            color={COLORS.text_touchable}
            size={SIZES.icons}
        />,
        bgColor: COLORS.touchable,
        color: COLORS.text,
        children: [
            {
                icon: (
                    <View style={[homeStyles.iconContainer, { borderColor: COLORS.touchable, backgroundColor: COLORS.background_second }]}>
                        <Icon as={<Foundation name='map' />} size={SIZES.icons_small} mr="2" color={COLORS.text_touchable} style={{ paddingLeft: 5 }} />
                    </View>
                ),
                title: 'establishments',
                onPress: () => console.log('entra a establishments'),
                color: COLORS.background_second
                // onPress: () => navigate(ROUTES.ESTABLISHMENTS, null)
            },
            {
                icon: (
                    <View style={[homeStyles.iconContainer, { borderColor: COLORS.touchable, backgroundColor: COLORS.background_second }]}>
                        <Icon as={<MaterialCommunityIcons name='account-search-outline' />} size={SIZES.icons_small} mr="2" color={COLORS.text_touchable} style={{ paddingLeft: 5 }} />
                    </View>
                ),
                title: 'search',
                onPress: () => console.log('entra a settings'),
                color: COLORS.touchable
                // onPress: () => navigate(ROUTES.ESTABLISHMENTS, null)
            },
            {
                icon: (
                    <View style={[homeStyles.iconContainer, { borderColor: COLORS.touchable, backgroundColor: COLORS.background_second }]}>
                        {vm.user?.image === '' ?
                            <Image size={10} borderRadius={100} source={require("../../assets/images/default-user.png")} alt="Alternate Text" />
                            :
                            <Image size={10} borderRadius={100} source={{ uri: vm.user?.image }} alt="Alternate Text" />
                        }
                    </View>
                ),
                title: 'settings',
                onPress: () => console.log('entra a profile'),
                color: COLORS.touchable
                // onPress: () => navigate(ROUTES.ESTABLISHMENTS, null)
            },
            {
                icon: (
                    <View style={[homeStyles.iconContainer, { borderColor: COLORS.touchable, backgroundColor: COLORS.background_second }]}>
                        <Icon as={<FontAwesome name='sign-out' />} size={SIZES.icons_small} mr="2" color={COLORS.text_touchable} style={{ paddingLeft: 5 }} />
                    </View>
                ),
                title: 'sign-out',
                onPress: () => signOut(),
                color: COLORS.touchable
            },
            // {} as MultiLevelFabButtonInnerItem
        ]
    };

    return (
        <>
            <NativeBaseProvider>
                <ScrollView contentContainerStyle={[commonStyles.container, { backgroundColor: COLORS.background }]}>
                    <View style={[commonStyles.toolbar, { borderBottomColor: COLORS.shadow }]}>
                        <Text style={[commonStyles.title, { color: COLORS.touchable }]}>{i18n.t('app_name').toUpperCase()}</Text>
                    </View>
                </ScrollView>
                <MultiLevelFabButton {...options} />
            </NativeBaseProvider>
        </>
    )
}