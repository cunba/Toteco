import { Icon, NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import { Appearance, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Location } from "react-native-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import AntDesign from "react-native-vector-icons/AntDesign";
import { geolocation } from "../../App";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { commonStyles, formStyles } from "../../config/Styles";
import i18n from "../../infrastructure/localization/i18n";
import { back } from "../../infrastructure/navigation/RootNavigation";
import { FunctionalView } from "../../infrastructure/views/FunctionalView";
import { EstablishmentsViewModel } from "../../viewmodels/EstablishmentsViewModel";
import { mapStyle } from "../mapStyle";

export const EstablishmentsView: FunctionalView<EstablishmentsViewModel> = ({ vm }) => {
    const [refresh, setRefresh] = useState(false)
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })

    useEffect(() => { setRefresh(false) }, [refresh])

    const location: Location = geolocation === undefined ? { latitude: 0.0, longitude: 0.0 } as Location : geolocation

    return (
        <>
            <NativeBaseProvider>
                <View style={[commonStyles.container, { backgroundColor: COLORS.background }]}>
                    <View style={[commonStyles.toolbar, { borderColor: COLORS.shadowToolbar }]}>
                        <TouchableOpacity onPress={() => back()} style={commonStyles.toolbarButton}>
                            <Icon as={<AntDesign name='left' />} size={7} mr="2" color={COLORS.touchable} />
                        </TouchableOpacity>
                        <Text style={[commonStyles.titleToolbar, { color: COLORS.text }]}>{i18n.t('establishments.title')}</Text>
                        <Text style={{ flex: 1 }}></Text>
                    </View>
                    <View style={formStyles.container}>
                        <MapView
                            initialRegion={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            onRegionChange={(region) => { vm.renderEstablishments(region); setRefresh(true) }}
                            provider={PROVIDER_GOOGLE}
                            customMapStyle={mapStyle}
                            mapType="standard"
                            style={StyleSheet.absoluteFillObject}
                        >
                            {vm.placesNearby.length > 0 ?
                                vm.placesNearby.map(place => {
                                    return <Marker
                                        key={place.id}
                                        title={place.displayName.text}
                                        coordinate={place.location}
                                    // onPress={() => vm.placeSelected = place}
                                    />
                                })
                                :
                                <></>
                            }
                        </MapView>
                    </View>
                </View>
            </NativeBaseProvider>
        </>
    )
}