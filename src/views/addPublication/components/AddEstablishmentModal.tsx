import { Checkbox, Input } from "native-base";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Location } from "../../../client";
import { commonStyles } from "../../../config/Styles";
import { PlaceDetailsData } from "../../../data/model/places/PlaceDetails";
import i18n from "../../../infrastructure/localization/i18n";
import { mapStyle } from "../../mapStyle";
import { productModalStyles } from "./ProductModalStyles";

export enum AnimationType {
    NONE = 'none',
    SLIDE = 'slide',
    FADE = 'fade'
}

export interface AddEstablishmentModalProps {
    colorScheme: any
    animationType: AnimationType
    visible: boolean
    location: Location
    places: PlaceDetailsData[]
    name: string
    errorMessage: string
    hideErrorMessage: boolean
    onPressOk?: () => void
    onRequestClose: () => void
    onNameChange: (name: string) => void
    onScoreChange: (score: number) => void
    onPlaceChange: (place: PlaceDetailsData) => void
    onIsComputerAllowedChange: (isComputerAllowed: boolean) => void
    onRegionChange: (region: any) => void
}

export const AddEstablishmentModal = (props: AddEstablishmentModalProps) => {
    const color = props.colorScheme

    return (
        <Modal animationType={props.animationType} transparent={true} visible={props.visible} onRequestClose={props.onRequestClose} >
            <View style={[productModalStyles.containerAddEstablishment, { backgroundColor: color.background }]}>
                <View style={[productModalStyles.titleView, { backgroundColor: color.touchable }]}>
                    <Text style={[productModalStyles.title, { color: color.text_touchable }]}>{i18n.t("add_establishment.title").toUpperCase()}</Text>
                </View>
                <View style={productModalStyles.productItems}>
                    <Checkbox
                        value={i18n.t("add_establishment.is_computer_allowed")}
                        colorScheme='pink'
                        onChange={(isSelected) => props.onIsComputerAllowedChange(isSelected)}
                    >
                        <Text style={[commonStyles.text, { color: color.text }]}>{i18n.t("add_establishment.is_computer_allowed")}</Text>
                    </Checkbox>
                    <Input
                        style={[productModalStyles.input, { color: color.text }]}
                        w={{ base: "75%", md: "25%" }}
                        placeholder={i18n.t('add_establishment.name').toString()}
                        onChangeText={(name) => props.onNameChange(name)}
                        borderRadius={10}
                        defaultValue={props.name}
                        editable={false}
                    />
                    <Input
                        style={[productModalStyles.input, { color: color.text }]}
                        w={{ base: "75%", md: "25%" }}
                        placeholder={i18n.t('add_establishment.score').toString()}
                        onChangeText={(score) => props.onScoreChange(Number(score))}
                        borderRadius={10}
                        inputMode="numeric"
                        keyboardType="number-pad"
                    />
                </View>
                {!props.hideErrorMessage ? (
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ marginBottom: 5, color: 'red' }}>
                            {props.errorMessage}
                        </Text>
                    </View>
                ) : null}
                <MapView
                    initialRegion={{
                        latitude: props.location.latitude!,
                        longitude: props.location.longitude!,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                    onRegionChange={(region) => props.onRegionChange(region)}
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={mapStyle}
                    mapType="standard"
                    style={{ width: '100%', height: '65%' }}
                >
                    {props.places.length > 0 ?
                        props.places.map(place => {
                            return <Marker
                                key={place.id}
                                title={place.displayName.text}
                                coordinate={place.location}
                                onPress={() => props.onPlaceChange(place)}
                                pinColor={color.touchable}
                            />
                        })
                        :
                        <></>
                    }
                </MapView>
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