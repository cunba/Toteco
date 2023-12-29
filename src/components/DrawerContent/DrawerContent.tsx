import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { AuthContext } from '../../App';
import { COLORS_DARK, COLORS_LIGHT } from '../../config/Colors';
import i18n from '../../infrastructure/localization/i18n';
import React, { useState } from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Drawer, Title } from 'react-native-paper';
import { SessionStoreFactory } from '../../infrastructure/data/SessionStoreFactory';
import { dispatch } from '../../infrastructure/navigation/RootNavigation';
import GlobalButton from '../GlobalButton/GlobalButton';

const styles = StyleSheet.create({
  userInfoSection: {
    paddingTop: 20,
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold'
  },
  bottom: {
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
});

export interface IDrawerContentProps {
  props: DrawerContentComponentProps;
  onLogOutPress: () => void;
}

export default function DrawerContent(props: any) {
  const color = useColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')

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
        backgroundColor: color.appBackground
      }}>
      <Drawer.Section >
        <TouchableOpacity
          style={{
            flexDirection: 'row-reverse',
            marginHorizontal: '10%',
            top: 10
          }}
          onPress={() => dispatch(DrawerActions.closeDrawer())}>
        </TouchableOpacity>
        <View style={styles.userInfoSection}>
          <Avatar.Text
            style={{ backgroundColor: color.button }}
            label={name.substring(0, 1).toUpperCase() + '' + surname.substring(0, 1).toUpperCase()}
            size={100}
          />
          <Title style={[styles.title, { color: color.button }]}>{name} {surname}</Title>
          <Text style={{ color: color.text }}>{email}</Text>
        </View>
        <View
          style={{
            backgroundColor: color.button,
            height: 2,
            marginHorizontal: '10%'
          }}
        />
      </Drawer.Section>
      <Drawer.Section style={{ flex: 4.2 }}>
        <ScrollView style={{ flex: 1, minHeight: '48%', backgroundColor: color.appBackgroundSecond }}>
          <DrawerItemList {...props} />
        </ScrollView>
      </Drawer.Section>
      <View style={styles.bottom}>
        <View
          style={{
            backgroundColor: color.button,
            height: 2,
            marginHorizontal: '10%',
            marginBottom: '10%',
          }}
        />
        <GlobalButton
          onPress={() => {
            logout()
          }}
          text={i18n.t('logout')}
          style={{
            backgroundColor: color.button,
            borderRadius: 25,
            marginHorizontal: '15%',
            color: color.textButtons,
          }}
          labelStyle={{ color: color.textButtons }}
        />
      </View>
    </DrawerContentScrollView>
  );
}
