import { DrawerActions } from "@react-navigation/native";
import { Icon, NativeBaseProvider } from "native-base";
import { useState } from "react";
import { Appearance, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { commonStyles } from "../../config/Styles";
import i18n from "../../infrastructure/localization/i18n";
import { dispatch } from "../../infrastructure/navigation/RootNavigation";
import { FunctionalView } from "../../infrastructure/views/FunctionalView";
import { HomeViewModel } from "../../viewmodels/HomeViewModel";

export const HomeView: FunctionalView<HomeViewModel> = ({ vm }) => {
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })

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
            </NativeBaseProvider>
        </>
    )
}