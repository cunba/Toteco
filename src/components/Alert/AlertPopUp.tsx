import { Checkbox, Input } from "native-base";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { COLORS_LIGHT } from "../../config/Colors";
import { SIZES } from "../../config/Sizes";
import { formStyles } from "../../config/Styles";
import i18n from "../../infrastructure/localization/i18n";
import { alertPopUpStyles } from "./AlertPopUpStyles";

export enum AlertType {
    MENU = "menu",
    MESSAGE = 'message',
    DELETE = 'delete',
    MODIFY = "modify",
    ADD_PRODUCT = "addProduct",
    MODIFY_PRODUCT = "modifyProduct"
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
    productProps?: ProductProps
}

export interface ProductProps {
    inMenu?: boolean
    name?: string
    price?: number
    score?: number
    onNameChange: (name: string) => void
    onPriceChange: (price: number) => void
    onScoreChange: (score: number) => void
    onInMenuChange: (inMenu: boolean) => void
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

    const renderAddProduct = () => <Modal animationType={props.animationType} transparent={true} visible={props.visible} onRequestClose={props.onRequestClose} >
        <View style={alertPopUpStyles.alertContainer} />
        <View style={[alertPopUpStyles.containerAddProduct, { backgroundColor: color.background }]}>
            <View style={[alertPopUpStyles.titleView, { backgroundColor: color.touchable }]}>
                <Text style={[alertPopUpStyles.title, { color: color.text_touchable }]}>{i18n.t("add_product.title").toUpperCase()}</Text>
            </View>
            <View style={alertPopUpStyles.productItems}>
                <Checkbox
                    value={i18n.t("add_product.in_menu")}
                    colorScheme='pink'
                    onChange={(isSelected) => props.productProps!.onInMenuChange(isSelected)}
                >
                    {i18n.t("add_product.in_menu")}
                </Checkbox>
                <Input
                    style={[alertPopUpStyles.input, { color: color.text }]}
                    w={{ base: "75%", md: "25%" }}
                    placeholder={i18n.t('add_product.name').toString()}
                    onChangeText={(name) => props.productProps?.onNameChange(name)}
                    borderRadius={10}
                />
                <Input
                    style={[alertPopUpStyles.input, { color: color.text }]}
                    w={{ base: "75%", md: "25%" }}
                    placeholder={i18n.t('add_product.score').toString()}
                    onChangeText={(score) => props.productProps?.onScoreChange(Number(score))}
                    borderRadius={10}
                    inputMode="numeric"
                    keyboardType="number-pad"
                />
                <Input
                    style={[alertPopUpStyles.input, { color: color.text }]}
                    w={{ base: "75%", md: "25%" }}
                    placeholder={i18n.t('add_product.price').toString()}
                    onChangeText={(price) => props.productProps?.onPriceChange(Number(price))}
                    borderRadius={10}
                    keyboardType="number-pad"
                    inputMode="numeric"
                />
            </View>
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
                    <Text style={[alertPopUpStyles.textButton, { color: color.text }]}>{i18n.t("cancel")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%',
                        height: '100%'
                    }}
                    onPress={props.onPressOk}>
                    <Text style={[alertPopUpStyles.textButton, { color: color.text }]}>{i18n.t("ok")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal >

    const renderModifyProduct = () => <Modal animationType={props.animationType} transparent={true} visible={props.visible} onRequestClose={props.onRequestClose} >
        <View style={alertPopUpStyles.alertContainer} />
        <View style={[alertPopUpStyles.containerModifyProduct, { height: 'auto', backgroundColor: color.background }]}>
            <View style={[alertPopUpStyles.titleView, { backgroundColor: color.touchable }]}>
                <Text style={[alertPopUpStyles.title, { color: color.text_touchable }]}>{i18n.t("modify_product.title").toUpperCase()}</Text>
            </View>
            <View style={alertPopUpStyles.productItems}>
                <Checkbox
                    value={i18n.t("modify_produc.in_menu")}
                    onChange={(isSelected) => props.productProps!.onInMenuChange(isSelected)}
                    isChecked={props.productProps?.inMenu}
                />
                <Input
                    style={[formStyles.input, { color: color.text }]}
                    w={{ base: "75%", md: "25%" }}
                    placeholder={i18n.t('modify_product.name').toString()}
                    onChangeText={(name) => props.productProps?.onNameChange(name)}
                    borderRadius={10}
                    value={props.productProps!.name}
                    isRequired={true}
                />
                <Input
                    style={[formStyles.input, { color: color.text }]}
                    w={{ base: "75%", md: "25%" }}
                    placeholder={i18n.t('modify_product.score').toString()}
                    onChangeText={(score) => props.productProps?.onScoreChange(Number(score))}
                    borderRadius={10}
                    inputMode="numeric"
                    keyboardType="number-pad"
                    value={props.productProps?.score?.toString()}
                    isRequired={true}
                />
                <Input
                    style={[formStyles.input, { color: color.text }]}
                    w={{ base: "75%", md: "25%" }}
                    placeholder={i18n.t('modify_product.price').toString()}
                    onChangeText={(price) => props.productProps?.onPriceChange(Number(price))}
                    borderRadius={10}
                    keyboardType="number-pad"
                    inputMode="numeric"
                    value={props.productProps?.price?.toString()}
                />
            </View>
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
                    <Text style={[alertPopUpStyles.textButton, { color: color.text }]}>{i18n.t("cancel")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%',
                        height: '100%'
                    }}
                    onPress={props.onPressOk}>
                    <Text style={[alertPopUpStyles.textButton, { color: color.text }]}>{i18n.t("ok")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal >

    const options = () => {
        switch (props.type) {
            case AlertType.MESSAGE: return renderMessage()
            case AlertType.DELETE: return renderDelete()
            case AlertType.MENU: return renderMenu()
            case AlertType.ADD_PRODUCT: return renderAddProduct()
            case AlertType.MODIFY_PRODUCT: return renderModifyProduct()
            default: return renderMessage()
        }
    }

    return options()
}