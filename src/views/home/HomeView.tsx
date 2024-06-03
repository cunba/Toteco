import { Icon, Image, NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import { Appearance, Dimensions, RefreshControl, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";
import { AuthContext } from "../../App";
import { MultiLevelFabButton, MultiLevelFabButtonType } from "../../components/MultiLevelFabButton";
import Publication, { PublicationProps } from "../../components/Publication/Publication";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { ROUTES } from "../../config/Constants";
import { SIZES } from "../../config/Sizes";
import { commonStyles, stylesRicyclerList } from "../../config/Styles";
import { PublicationData } from "../../data/model/toteco/Publication";
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

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })
    const getPublications = async () => {
        await vm.getPublications();
        setRefresh(true);
    }
    useEffect(() => { getPublications() }, [])

    useEffect(() => { setRefresh(false) }, [refresh])

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
                        {vm.user?.photo === '' ?
                            <Image size={10} borderRadius={100} source={require("../../assets/images/default-user.png")} alt={vm.user.username ?? ''} />
                            :
                            <Image size={10} borderRadius={100} source={{ uri: vm.user?.photo }} alt={vm.user?.username ?? ''} />
                        }
                    </View>
                ),
                title: 'profile',
                color: COLORS.touchable,
                // onPress: () => console.log('profile')
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

    const rowRender = (type: any, publication: PublicationData, index: number) => {
        const props: PublicationProps = {
            colorScheme: COLORS,
            publication: publication,
            onPressIcon: () => navigate(ROUTES.PROFILE, publication.user)
        }
        return (<Publication {...props} />)
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
                        : null
                    }
                </View>
                <MultiLevelFabButton {...options} />
            </NativeBaseProvider>
        </>
    )
}