import { Checkbox, Input } from "native-base";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Location } from "../../../client/places";
import { PlaceDetailsData } from "../../../data/model/places/PlaceDetails";
import i18n from "../../../infrastructure/localization/i18n";
import { mapStyle } from "../../mapStyle";
import { EstablishmentData } from "../../../data/model/toteco/Establishment";
import { PublicationData } from "../../../data/model/toteco/Publication";
import { showEstablishmentModalStyles } from "./ShowEstablishmentModalStyles";

export enum AnimationType {
    NONE = 'none',
    SLIDE = 'slide',
    FADE = 'fade'
}

export interface ShowEstablishmentModalProps {
    colorScheme: any
    animationType: AnimationType
    visible: boolean
    establishment: EstablishmentData
    publications: PublicationData[]
    onPressOk?: () => void
    onRequestClose: () => void
}

export const ShowEstablishmentModal = (props: ShowEstablishmentModalProps) => {
    const color = props.colorScheme

    return (
        <Modal animationType={props.animationType} transparent={true} visible={props.visible} onRequestClose={props.onRequestClose} >
            <View style={[showEstablishmentModalStyles.containerShowEstablishment, { backgroundColor: color.background }]}>
                <View style={[showEstablishmentModalStyles.titleView, { backgroundColor: color.touchable }]}>
                    <Text style={[showEstablishmentModalStyles.title, { color: color.text_touchable }]}>{props.establishment.name}</Text>
                </View>
                <View style={showEstablishmentModalStyles.productItems}>
                    
                </View>
                <View style={showEstablishmentModalStyles.containerOkCancel}>
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
                        <Text style={[showEstablishmentModalStyles.textButton, { color: color.text }]}>{i18n.t("cancel")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '50%',
                            height: '100%'
                        }}
                        onPress={props.onPressOk}>
                        <Text style={[showEstablishmentModalStyles.textButton, { color: color.text }]}>{i18n.t("ok")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
    )
}