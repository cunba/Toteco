import { useRoute } from "@react-navigation/native";
import { Icon, NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import { Appearance, Dimensions, Text, TouchableOpacity, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { ROUTES } from "../../config/Constants";
import { commonStyles, formStyles, stylesRicyclerList } from "../../config/Styles";
import { UserListData } from "../../data/model/UserListData";
import i18n from "../../infrastructure/localization/i18n";
import { addScreen, back } from "../../infrastructure/navigation/RootNavigation";
import { FunctionalView } from "../../infrastructure/views/FunctionalView";
import { UserListViewModel } from "../../viewmodels/UserListViewModel";
import UserListRow, { UserListRowProps } from "./components/UserListRow";

export const UserListView: FunctionalView<UserListViewModel> = ({ vm }) => {
    const [refresh, setRefresh] = useState(false)
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);
    const [scroll, setScroll] = useState<any>()

    const route = useRoute()
    const userList = route.params as UserListData

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })
    useEffect(() => { setRefresh(false) }, [refresh])

    const setList = async () => {
        await vm.getUser()
        if (userList !== null && userList !== undefined) {
            if (userList.title === i18n.t('user_list.followers'))
                vm.setUserList('follower', userList.userList)
            else if (userList.title === i18n.t('user_list.following'))
                vm.setUserList('following', userList.userList)
        }
        setRefresh(true)
    }
    useEffect(() => { setList() }, [])

    const [dataSource, setDataSource] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    )

    const getDataSource = (): DataProvider => {
        return dataSource.cloneWithRows(vm.userList)
    }

    const layoutProvider = new LayoutProvider(
        index => {
            return 0
        },
        (type, dim) => {
            dim.height = 70
            dim.width = Dimensions.get('window').width
        },
    )

    const rowRender = (type: any, user: any, index: number) => {
        const props: UserListRowProps = {
            colorScheme: COLORS,
            rowData: user,
            onPress: () => addScreen(ROUTES.PROFILE, user.user),
            onPressFollow: async () => {
                await vm.follow(user)
                setRefresh(true)
            },
            onPressUnfollow: async () => {
                await vm.unfollow(user)
                setRefresh(true)
            },
            following: user.user.id === vm.user!.id ? 'unused' : user.following ? 'following' : 'not following'
        }
        return (<UserListRow {...props} />)
    }

    const getUsers = async () => {

    }

    return (
        <>
            <NativeBaseProvider>
                <View style={[commonStyles.container, { backgroundColor: COLORS.background }]}>
                    <View style={[commonStyles.toolbar, { borderColor: COLORS.shadowToolbar }]}>
                        <TouchableOpacity onPress={() => back()} style={commonStyles.toolbarButton}>
                            <Icon as={<AntDesign name='left' />} size={7} mr="2" color={COLORS.touchable} />
                        </TouchableOpacity>
                        <Text style={[commonStyles.titleToolbar, { color: COLORS.text }]}>{userList.title}</Text>
                        <Text style={{ flex: 1 }}></Text>
                    </View>
                    <View style={formStyles.container}>
                        {vm.userList.length > 0 ?
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
                                            onRefresh={getUsers}
                                        />
                                    )
                                }}
                            />
                            :
                            <ScrollView refreshControl=
                                {<RefreshControl
                                    refreshing={refresh}
                                    onRefresh={getUsers}
                                />}
                            >
                                <Text style={{ fontSize: 200, color: COLORS.background }}>No data</Text>
                            </ScrollView>
                        }
                    </View>
                </View>
            </NativeBaseProvider>
        </>
    )
}