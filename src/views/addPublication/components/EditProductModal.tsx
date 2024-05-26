import { Checkbox, Input } from "native-base"
import { Modal, Text, TouchableOpacity, View } from "react-native"
import i18n from "../../../infrastructure/localization/i18n"
import { productModalStyles } from "./ProductModalStyles"


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
    inMenu?: boolean
    name?: string
    price?: number
    score?: number
    onNameChange: (name: string) => void
    onPriceChange: (price: number) => void
    onScoreChange: (score: number) => void
    onInMenuChange: (inMenu: boolean) => void
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
                    <Checkbox
                        value={i18n.t("edit_product.in_menu")}
                        colorScheme='pink'
                        onChange={(isSelected) => props.onInMenuChange(isSelected)}
                        defaultIsChecked={props.inMenu}
                    >
                        {i18n.t("edit_product.in_menu")}
                    </Checkbox>
                    <Input
                        style={[productModalStyles.input, { color: color.text }]}
                        w={{ base: "75%", md: "25%" }}
                        placeholder={i18n.t('edit_product.name').toString()}
                        onChangeText={(name) => props.onNameChange(name)}
                        borderRadius={10}
                        defaultValue={props.name}
                    />
                    <Input
                        style={[productModalStyles.input, { color: color.text }]}
                        w={{ base: "75%", md: "25%" }}
                        placeholder={i18n.t('edit_product.score').toString()}
                        onChangeText={(score) => props.onScoreChange(Number(score))}
                        borderRadius={10}
                        inputMode="numeric"
                        keyboardType="number-pad"
                        defaultValue={props.score?.toString()}
                    />
                    <Input
                        style={[productModalStyles.input, { color: color.text }]}
                        w={{ base: "75%", md: "25%" }}
                        placeholder={i18n.t('edit_product.price').toString()}
                        onChangeText={(price) => props.onPriceChange(Number(price))}
                        borderRadius={10}
                        keyboardType="number-pad"
                        inputMode="numeric"
                        defaultValue={props.price?.toString()}
                    />
                </View>
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