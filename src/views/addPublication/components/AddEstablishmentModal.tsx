import { Checkbox, Input } from "native-base"
import { Modal, Text, TouchableOpacity, View } from "react-native"
import MapView from "react-native-maps"
import i18n from "../../../infrastructure/localization/i18n"
import { productModalStyles } from "./ProductModalStyles"


export enum AnimationType {
    NONE = 'none',
    SLIDE = 'slide',
    FADE = 'fade'
}

export interface AddEstablishmentModalProps {
    colorScheme: any
    animationType: AnimationType
    visible: boolean
    onPressOk?: () => void
    onRequestClose: () => void
    onNameChange: (name: string) => void
    onLocationChange: (location: number) => void
    onScoreChange: (score: number) => void
    onIsComputerAllowedChange: (isComputerAllowed: boolean) => void
}

export const AddEstablishmentModal = (props: AddEstablishmentModalProps) => {
    const color = props.colorScheme

    return (
        <Modal animationType={props.animationType} transparent={true} visible={props.visible} onRequestClose={props.onRequestClose} >
            <View style={[productModalStyles.containerAddEstablishment, { backgroundColor: color.background }]}>
                <View style={[productModalStyles.titleView, { backgroundColor: color.touchable }]}>
                    <Text style={[productModalStyles.title, { color: color.text_touchable }]}>{i18n.t("add_establishemnt.title").toUpperCase()}</Text>
                </View>
                <View style={productModalStyles.productItems}>
                    <Checkbox
                        value={i18n.t("add_establishemnt.is_computer_allowed")}
                        colorScheme='pink'
                        onChange={(isSelected) => props.onIsComputerAllowedChange(isSelected)}
                    >
                        {i18n.t("add_establishemnt.is_computer_allowed")}
                    </Checkbox>
                    <Input
                        style={[productModalStyles.input, { color: color.text }]}
                        w={{ base: "75%", md: "25%" }}
                        placeholder={i18n.t('add_establishemnt.name').toString()}
                        onChangeText={(name) => props.onNameChange(name)}
                        borderRadius={10}
                    />
                    <Input
                        style={[productModalStyles.input, { color: color.text }]}
                        w={{ base: "75%", md: "25%" }}
                        placeholder={i18n.t('add_establishemnt.score').toString()}
                        onChangeText={(score) => props.onScoreChange(Number(score))}
                        borderRadius={10}
                        inputMode="numeric"
                        keyboardType="number-pad"
                    />
                </View>
                <MapView
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
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
        </Modal >
    )
}