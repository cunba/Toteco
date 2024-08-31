
import { Image, View } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SIZES } from '../../../config/Sizes';
import { commonStyles, formStyles } from '../../../config/Styles';
import { UserRowData } from '../../../data/model/UserListData';
import i18n from '../../../infrastructure/localization/i18n';
import { userListRowStyles } from './UserListRowStyles';

export interface UserListRowProps {
    colorScheme: any
    rowData: UserRowData
    styles?: any
    onPress?: () => void
    following?: 'following' | 'not following' | 'unused'
    onPressFollow?: () => void
    onPressUnfollow?: () => void
}

export default function UserListRow(props: UserListRowProps) {
    const color = props.colorScheme

    return <>
        <TouchableWithoutFeedback style={[userListRowStyles.container, props.styles, { backgroundColor: color.background }]} onPress={props.onPress}>
            <View style={userListRowStyles.userContainer}>
                {props.rowData.user.photo ?
                    <Image size={50} borderRadius={100} source={{ uri: props.rowData.user.photo }} alt={props.rowData.user.username ?? ''} />
                    :
                    <Image size={50} borderRadius={100} source={require("../../../assets/images/default-user.png")} alt={props.rowData.user.username ?? ''} />
                }
                <Text style={[commonStyles.subtitle, { color: color.text }]}>{props.rowData.user.username ?? ''}</Text>
            </View>
            {props.following === 'unused' ?
                null :
                <TouchableOpacity
                    style={[formStyles.button, userListRowStyles.followButton, { backgroundColor: props.following === 'following' ? color.background_second : color.touchable }]}
                    onPress={props.following === 'following' ? props.onPressUnfollow : props.onPressFollow}
                >
                    <Text style={[commonStyles.text, { color: color.text_touchable, fontSize: SIZES.text }]}>{props.following === 'following' ? i18n.t('profile.button.unfollow') : i18n.t('profile.button.follow')}</Text>
                </TouchableOpacity>
            }
        </TouchableWithoutFeedback>
    </>

}
