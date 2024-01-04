import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { Appearance, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Drawer, Title } from 'react-native-paper';
import { AuthContext } from '../../App';
import { COLORS_DARK, COLORS_LIGHT } from '../../config/Colors';
import { SessionStoreFactory } from '../../infrastructure/data/SessionStoreFactory';
import i18n from '../../infrastructure/localization/i18n';
import { dispatch } from '../../infrastructure/navigation/RootNavigation';
import GlobalButton from '../GlobalButton/GlobalButton';
import { drawerStyles } from './DrawerStyles';

export interface IDrawerContentProps {
    props: DrawerContentComponentProps;
    onLogOutPress: () => void;
}

export default function DrawerContent(props: any) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })

    const { signOut } = React.useContext(AuthContext);

    const logout = async () => {
        signOut()
    }

    SessionStoreFactory.getSessionStore()
        .getUser()
        .then((response) => {
            setName(response!.name!)
            setSurname(response!.surname!)
            setEmail(response!.email!);
        });

    //TODO: Change the hardcoded for the new user details in the cloud
    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
            <Drawer.Section >
                <TouchableOpacity
                    style={{
                        flexDirection: 'row-reverse',
                        marginHorizontal: '10%',
                        top: 10,
                    }}
                    onPress={() => dispatch(DrawerActions.closeDrawer())}>
                </TouchableOpacity>
                <TouchableOpacity style={drawerStyles.userInfoSection}>
                    <Avatar.Text
                        style={{ backgroundColor: COLORS.touchable }}
                        label={name.substring(0, 1).toUpperCase() + '' + surname.substring(0, 1).toUpperCase()}
                        size={100}
                    />
                    <Title style={drawerStyles.title}>{name} {surname}</Title>
                    <Text style={{ color: 'black' }}>{email}</Text>
                </TouchableOpacity>
                <View
                    style={{
                        backgroundColor: COLORS.touchable,
                        height: 2,
                        marginHorizontal: '10%',
                    }}></View>
            </Drawer.Section>
            <ScrollView style={{ flex: 1, minHeight: '48%' }}>
                <DrawerItemList {...props} />
            </ScrollView>
            <View style={drawerStyles.bottom}>
                <View
                    style={{
                        backgroundColor: COLORS.touchable,
                        height: 2,
                        marginHorizontal: '10%',
                        marginVertical: '10%',
                    }}></View>
                <GlobalButton
                    onPress={() => {
                        logout()
                    }}
                    text={i18n.t('logout')}
                    style={{
                        backgroundColor: COLORS.touchable,
                        borderRadius: 25,
                        marginHorizontal: '15%',
                        color: 'white',
                    }}
                    labelStyle={{ color: 'white' }}
                />
            </View>
        </DrawerContentScrollView>
    );
}
