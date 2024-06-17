import { Modal, Text, TouchableOpacity, View } from "react-native"
import Publication, { PublicationProps } from "../../../components/Publication/PublicationCard"
import i18n from "../../../infrastructure/localization/i18n"
import { showPublicationModalStyles } from "./ShowPublicationModalStyles"


export enum AnimationType {
    NONE = 'none',
    SLIDE = 'slide',
    FADE = 'fade'
}

export interface ShowPublicationModalProps {
    colorScheme: any
    animationType: AnimationType
    visible: boolean
    publicationProps: PublicationProps
    onPressOk?: () => void
    onRequestClose: () => void
}

export const ShowPublicationModal = (props: ShowPublicationModalProps) => {
    const color = props.colorScheme

    return (
        <Modal animationType={props.animationType} transparent={true} visible={props.visible} onRequestClose={props.onRequestClose}>
            <View style={showPublicationModalStyles.alertContainer} />
            <View style={[showPublicationModalStyles.containerShowPublication, { backgroundColor: color.background }]}>
                <Publication {...props.publicationProps} />
                <View style={showPublicationModalStyles.containerOkCancel}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%'
                        }}
                        onPress={props.onRequestClose}>
                        <Text style={[showPublicationModalStyles.textButton, { color: color.text }]}>{i18n.t("close")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}