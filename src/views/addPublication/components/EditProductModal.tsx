import { Input } from "native-base"
import { Button, InputAccessoryView, Keyboard, Modal, Text, TouchableOpacity, View } from "react-native"
import i18n from "../../../infrastructure/localization/i18n"
import { productModalStyles } from "./ProductModalStyles"
import { formStyles } from "../../../config/Styles"


export enum AnimationType {
    NONE = 'none',
    SLIDE = 'slide',
    FADE = 'fade'
}

export interface EditProductModalProps {
    colorScheme: any
    animationType: AnimationType
    visible: boolean
    onPressOk?: () => void
    onRequestClose: () => void
    name?: string
    price?: number
    score?: number
    hideErrorMessage: boolean
    errorMessage: string
    onNameChange: (name: string) => void
    onPriceChange: (price: number) => void
    onScoreChange: (score: number) => void
}

export const EditProductModal = (props: EditProductModalProps) => {
    const color = props.colorScheme

    return (
        <Modal animationType={props.animationType} transparent={true} visible={props.visible} onRequestClose={props.onRequestClose} >
            <View style={productModalStyles.alertContainer} />
            <View style={[productModalStyles.containerAddProduct, { backgroundColor: color.background }]}>
                <View style={[productModalStyles.titleView, { backgroundColor: color.touchable }]}>
                    <Text style={[productModalStyles.title, { color: color.text_touchable }]}>{i18n.t("edit_product.title").toUpperCase()}</Text>
                </View>
                <View style={productModalStyles.productItems}>
                    <Input
                        style={[productModalStyles.input, { color: color.text }]}
                        w={{ base: "75%", md: "25%" }}
                        placeholder={i18n.t('edit_product.name').toString()}
                        onChangeText={(name) => props.onNameChange(name)}
                        borderRadius={10}
                        defaultValue={props.name}
                        inputAccessoryViewID="name"
                    />
                    <InputAccessoryView nativeID="name">
                        <View style={[formStyles.keyboardOptions, { backgroundColor: color.keyboard }]}>
                            <Button
                                onPress={() => Keyboard.dismiss()}
                                title={i18n.t('ok').toString()}
                            />
                        </View>
                    </InputAccessoryView>
                    <Input
                        style={[productModalStyles.input, { color: color.text }]}
                        w={{ base: "75%", md: "25%" }}
                        placeholder={i18n.t('edit_product.score').toString()}
                        onChangeText={(score) => props.onScoreChange(Number(score.replace(',', '.')))}
                        borderRadius={10}
                        inputMode="decimal"
                        keyboardType="numeric"
                        defaultValue={props.score?.toString()}
                        inputAccessoryViewID="score"
                    />
                    <InputAccessoryView nativeID="score">
                        <View style={[formStyles.keyboardOptions, { backgroundColor: color.keyboard }]}>
                            <Button
                                onPress={() => Keyboard.dismiss()}
                                title={i18n.t('ok').toString()}
                            />
                        </View>
                    </InputAccessoryView>
                    <Input
                        style={[productModalStyles.input, { color: color.text }]}
                        w={{ base: "75%", md: "25%" }}
                        placeholder={i18n.t('edit_product.price').toString()}
                        onChangeText={(price) => props.onPriceChange(Number(price.replace(',', '.')))}
                        borderRadius={10}
                        inputMode="decimal"
                        keyboardType="numeric"
                        defaultValue={props.price?.toString()}
                        inputAccessoryViewID="price"
                    />
                    <InputAccessoryView nativeID="price">
                        <View style={[formStyles.keyboardOptions, { backgroundColor: color.keyboard }]}>
                            <Button
                                onPress={() => Keyboard.dismiss()}
                                title={i18n.t('ok').toString()}
                            />
                        </View>
                    </InputAccessoryView>
                </View>
                {!props.hideErrorMessage ? (
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ marginBottom: 5, color: 'red' }}>
                            {props.errorMessage}
                        </Text>
                    </View>
                ) : null}
                <View style={productModalStyles.containerOkCancel}>
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
                        <Text style={[productModalStyles.textButton, { color: color.text }]}>{i18n.t("cancel")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '50%',
                            height: '100%'
                        }}
                        onPress={props.onPressOk}>
                        <Text style={[productModalStyles.textButton, { color: color.text }]}>{i18n.t("ok")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}