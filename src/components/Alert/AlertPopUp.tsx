import React from "react";
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { COLORS_LIGHT } from "../../config/Colors";
import { SIZES } from "../../config/Sizes";
import i18n from "../../infrastructure/localization/i18n";
import { alertPopUpStyles } from "./AlertPopUpStyles";

export enum AlertType {
    MENU = "menu",
    MESSAGE = 'message',
    DELETE = 'delete',
}

export enum AnimationType {
    NONE = 'none',
    SLIDE = 'slide',
    FADE = 'fade'
}

export enum PresentationStyle {
    FULL_SCREEN = 'fullScreen',
    PAGE_SHEET = 'pageSheet',
    FORM_SHEET = 'formSheet',
    OVER_FULL_SCREEN = 'overFullScreen'
}

export interface AlertItems {
    text?: string,
    color?: string,
    onPress?: () => void,
    bgColor?: string,
    style?: any
}

export interface AlertProps {
    onPress?: (onPress?: any) => void
    onPressOk?: () => void
    type: AlertType
    bgColor?: string
    options?: AlertItems[]
    color?: string
    title?: string
    visible: boolean
    animationType?: AnimationType
    presentationStyle?: PresentationStyle
    onRequestClose: () => void
    message?: string
    colorScheme: any
}

export interface JsMap<T> {
    [key: string]: T
}

export const defaultOptions: AlertProps = {
    type: AlertType.MESSAGE,
    color: 'black',
    onPress: () => { console.log('Pressed') },
    visible: false,
    onRequestClose: () => { console.log('Close') },
    animationType: AnimationType.NONE,
    bgColor: 'white',
    options: [
        {
            text: 'Alert',
            color: 'black',
            onPress: () => { console.log('Alert') },
            bgColor: 'transparent'
        },
        {
            text: 'Cancel',
            color: 'black',
            onPress: () => { console.log('Cancel') },
            bgColor: 'transparent'
        }
    ],
    colorScheme: COLORS_LIGHT
}

export const AlertPopUp = (config?: AlertProps) => {
    const color = config!.colorScheme

    const props = config ? config : defaultOptions

    const renderMessage = () => <Modal animationType={props.animationType} transparent={true} visible={props.visible} onRequestClose={props.onRequestClose} >
        <View style={alertPopUpStyles.alertContainer} />
        <View style={[alertPopUpStyles.containerAlertMessage, { backgroundColor: color.background }]}>
            <Text style={[alertPopUpStyles.title, { color: color.text }]}>{props.title}</Text>
            <Text style={[alertPopUpStyles.text, { color: color.text }]}>{props.message}</Text>
            <View style={[alertPopUpStyles.containerOptions, { borderTopColor: color.shadow }]}>
                {props.options?.map((item, index) => {
                    return (<TouchableOpacity
                        key={'item-' + index}
                        style={{
                            backgroundColor: item.bgColor,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingRight: 0,
                            paddingLeft: 0
                        }}
                        onPress={item.onPress}>
                        <Text style={{ color: item.color, fontSize: SIZES.text_touchables, }}>{item.text}</Text>
                    </TouchableOpacity>)
                })}
            </View>
        </View>
    </Modal>

    const renderDelete = () => <Modal animationType={props.animationType} transparent={true} visible={props.visible} onRequestClose={props.onRequestClose} >
        <View style={alertPopUpStyles.alertContainer} />
        <View style={[alertPopUpStyles.containerDelete, { backgroundColor: color.background }]}>
            <Text style={alertPopUpStyles.title}>{props.title}</Text>
            <Text style={[alertPopUpStyles.text, { color: color.text }]}>{props.message}</Text>
            <View style={alertPopUpStyles.containerOkCancel}>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%',
                        height: '100%',
                        borderRightColor: 'grey',
                        borderRightWidth: 1
                    }}
                    onPress={props.onRequestClose}>
                    <Text style={[alertPopUpStyles.textButton, { color: color.text_touchable }]}>{i18n.t("cancel")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%',
                        height: '100%'
                    }}
                    onPress={props.onPressOk}>
                    <Text style={[alertPopUpStyles.textButton, { color: color.text_touchable }]}>{i18n.t("delete")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>

    const renderMenu = () => <Modal animationType={props.animationType} transparent={true} visible={props.visible} onRequestClose={props.onRequestClose} >
        <View style={alertPopUpStyles.alertContainer} />
        <View style={[alertPopUpStyles.containerAlertNoMessage, { backgroundColor: color.background }]}>
            {props.options?.map((item, index) => {
                return (<TouchableOpacity
                    key={'item-' + index}
                    style={{
                        backgroundColor: item.bgColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: SIZES.padding_buttons,
                        paddingRight: 0,
                        paddingLeft: 0,
                    }}
                    onPress={item.onPress}>
                    <Text style={{ color: item.color, fontSize: SIZES.text, }}>{item.text}</Text>
                </TouchableOpacity>)
            })}
        </View>
    </Modal>

    const options = () => {
        switch (props.type) {
            case AlertType.MESSAGE: return renderMessage()
            case AlertType.DELETE: return renderDelete()
            case AlertType.MENU: return renderMenu()
            default: return renderMessage()
        }
    }

    return options()
}