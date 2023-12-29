import React from 'react';
import { Pressable } from 'react-native';
import { Button } from 'react-native-paper';

export interface IGlobalButton {
    text: string
    onPress: Function
    disabled?: boolean
    icon?: string
    style?: any
    labelStyle?: any
    mode?: "text" | "outlined" | "contained"
    buttonStyle?: any
}

export default function GlobalButton(params: IGlobalButton) {

    const onPress = () => {
        params.onPress()
    }
    return <Pressable disabled={params.disabled || false} onPress={onPress} style={({ pressed }) => [params.style, { justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }]} >
        <Button disabled={params.disabled || false} style={params.buttonStyle} labelStyle={[params.labelStyle, {}]} icon={params.icon} mode={params.mode} >{params.text}</Button>
    </Pressable>

}