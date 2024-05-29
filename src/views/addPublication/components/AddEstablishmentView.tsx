import { Checkbox, Icon, Input, NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator, Appearance, Text, TouchableOpacity, View } from "react-native";
import { Location } from "react-native-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import AntDesign from "react-native-vector-icons/AntDesign";
import { geolocation } from "../../../App";
import { COLORS_DARK, COLORS_LIGHT } from "../../../config/Colors";
import { ROUTES } from "../../../config/Constants";
import { commonStyles, formStyles } from "../../../config/Styles";
import i18n from "../../../infrastructure/localization/i18n";
import { back, navigate } from "../../../infrastructure/navigation/RootNavigation";
import { FunctionalView } from "../../../infrastructure/views/FunctionalView";
import { AddEstablishmentViewModel } from "../../../viewmodels/AddEstablishmentViewModel";
import { mapStyle } from "../../mapStyle";
import { productModalStyles } from "./ProductModalStyles";

export const AddEstablishmentView: FunctionalView<AddEstablishmentViewModel> = ({ vm }) => {
    const [showSpinner, setShowSpinner] = useState(false)
    const [hideErrorMessage, setHideErrorMessage] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })

    useEffect(() => vm.constructorFuncions(), [])

    const location: Location = geolocation === undefined ? { latitude: 0.0, longitude: 0.0 } as Location : geolocation

    return (
        <>
            <NativeBaseProvider>
                <View style={[commonStyles.container, { backgroundColor: COLORS.background }]}>
                    <View style={[commonStyles.toolbar, { borderColor: COLORS.shadowToolbar }]}>
                        <TouchableOpacity onPress={() => back()} style={commonStyles.toolbarButton}>
                            <Icon as={<AntDesign name='left' />} size={7} mr="2" color={COLORS.touchable} />
                        </TouchableOpacity>
                        <Text style={[commonStyles.titleToolbar, { color: COLORS.text }]}>{i18n.t('add_establishment.title')}</Text>
                        <Text style={{ flex: 1 }}></Text>
                    </View>
                    <View style={formStyles.container}>
                        <View style={productModalStyles.productItems}>
                            <Checkbox
                                value={i18n.t("add_establishment.is_computer_allowed")}
                                colorScheme='pink'
                                onChange={(isSelected) => vm.newEstablishment!.isComputerAllowed = isSelected}
                            >
                                {i18n.t("add_establishment.is_computer_allowed")}
                            </Checkbox>
                            <Input
                                style={[productModalStyles.input, { color: COLORS.text }]}
                                w={{ base: "75%", md: "25%" }}
                                placeholder={i18n.t('add_establishment.name').toString()}
                                borderRadius={10}
                            />
                            <Input
                                style={[productModalStyles.input, { color: COLORS.text }]}
                                w={{ base: "75%", md: "25%" }}
                                placeholder={i18n.t('add_establishment.score').toString()}
                                onChangeText={(score) => vm.establishmentScore = Number(score)}
                                borderRadius={10}
                                inputMode="numeric"
                                keyboardType="number-pad"
                            />
                        </View>
                        <MapView
                            initialRegion={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            onRegionChange={(region) => vm.renderEstablishments(region)}
                            provider={PROVIDER_GOOGLE}
                            customMapStyle={mapStyle}
                            mapType="standard"
                            style={{ width: '100%', height: '65%' }}
                        >
                            {vm.placesNearby.length > 0 ?
                                vm.placesNearby.map(place => {
                                    return <Marker
                                        key={place.id}
                                        title={place.displayName.text}
                                        coordinate={place.location}
                                        onPress={() => vm.placeSelected = place}
                                    />
                                })
                                :
                                <></>
                            }
                        </MapView>
                        <View style={{ flex: 1 }}>
                            {!hideErrorMessage ? (
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ marginBottom: 5, color: 'red' }}>
                                        {errorMessage}
                                    </Text>
                                </View>
                            ) : null}

                            {showSpinner ?
                                <ActivityIndicator style={commonStyles.spinner} size='large' animating={true} color={COLORS.touchable} />
                                :
                                <TouchableOpacity style={[formStyles.button, { backgroundColor: COLORS.touchable }]} onPress={() => navigate(ROUTES.ADD_PUBLICATION, null)} >
                                    <Text style={[commonStyles.textButton, { color: COLORS.text_touchable }]}>{i18n.t('add_establishment.title')}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
            </NativeBaseProvider>
        </>
    )
}