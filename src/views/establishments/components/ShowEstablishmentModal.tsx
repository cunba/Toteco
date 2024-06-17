import { Checkbox } from "native-base";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PublicationCard, { PublicationProps } from "../../../components/Publication/PublicationCard";
import { commonStyles } from "../../../config/Styles";
import { Establishment } from "../../../data/model/toteco/Establishment";
import { Publication } from "../../../data/model/toteco/Publication";
import i18n from "../../../infrastructure/localization/i18n";
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
    establishment: Establishment
    publications: Publication[]
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
                <View style={[showEstablishmentModalStyles.information, { backgroundColor: color.background }]}>
                    <Checkbox
                        value={i18n.t("add_establishment.is_computer_allowed")}
                        colorScheme='pink'
                        isDisabled={true}
                        isChecked={props.establishment.is_computer_allowed}
                    >
                        <Text style={[commonStyles.text, { color: color.text }]}>{i18n.t("show_establishment.is_computer_allowed")}</Text>
                    </Checkbox>
                    <Text style={[commonStyles.text, { color: color.text, paddingTop: 5 }]}>{props.establishment.score.toString() + '/5 ☆'}</Text>
                </View>
                <ScrollView style={showEstablishmentModalStyles.productItems}>
                    {props.publications?.map(publication => {
                        const publicationProps: PublicationProps = {
                            colorScheme: color,
                            publication: publication
                        }
                        return <PublicationCard {...publicationProps} />
                    })}
                </ScrollView>
                <View style={showEstablishmentModalStyles.containerOkCancel}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                            borderRightColor: 'grey',
                            borderRightWidth: 1
                        }}
                        onPress={props.onRequestClose}>
                        <Text style={[showEstablishmentModalStyles.textButton, { color: color.text }]}>{i18n.t("close")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
    )
}