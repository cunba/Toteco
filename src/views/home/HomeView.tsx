import { DrawerActions } from "@react-navigation/native";
import { Icon, NativeBaseProvider } from "native-base";
import React, { useState } from "react";
import { Appearance, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
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
import { dispatch } from "../../infrastructure/navigation/RootNavigation";
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
                        <Icon as={<AntDesign name='setting' />} size={SIZES.icons_small} mr="2" color={COLORS.text_touchable} style={{ paddingLeft: 5 }} />
                    </View>
                ),
                title: 'settings',
                onPress: () => console.log('entra a settings'),
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
                // onPress: () => navigate(ROUTES.ESTABLISHMENTS, null)
            },
            // {} as MultiLevelFabButtonInnerItem
        ]
    };

    return (
        <>
            <NativeBaseProvider>
                <View style={[commonStyles.container, { backgroundColor: COLORS.background }]}>
                    <View style={commonStyles.toolbar}>
                        <TouchableOpacity onPress={() => dispatch(DrawerActions.openDrawer())} style={commonStyles.toolbarButton}>
                            <Icon as={<AntDesign name='menu-fold' />} size={7} mr="2" color={COLORS.touchable} />
                        </TouchableOpacity>
                        <Text style={[commonStyles.title, { color: COLORS.text }]}>{i18n.t('home.title')}</Text>
                        <Text style={{ flex: 1 }}></Text>
                    </View>
                </View>
                <MultiLevelFabButton {...options} />
            </NativeBaseProvider>
        </>
    )
}