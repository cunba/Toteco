import { Icon, Image, NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import { Appearance, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Location } from "react-native-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import AntDesign from "react-native-vector-icons/AntDesign";
import { geolocation } from "../../App";
import { AnimationType } from "../../components/Alert";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { commonStyles, formStyles } from "../../config/Styles";
import { Establishment } from "../../data/model/toteco/Establishment";
import i18n from "../../infrastructure/localization/i18n";
import { back } from "../../infrastructure/navigation/RootNavigation";
import { FunctionalView } from "../../infrastructure/views/FunctionalView";
import { EstablishmentsViewModel } from "../../viewmodels/EstablishmentsViewModel";
import { mapStyle } from "../mapStyle";
import { ShowEstablishmentModal, ShowEstablishmentModalProps } from "./components/ShowEstablishmentModal";

export const EstablishmentsView: FunctionalView<EstablishmentsViewModel> = ({ vm }) => {
    const [refresh, setRefresh] = useState(false)
    const [showEstablishment, setShowEstablishment] = useState(false)
    const [establishmentSelected, setEstablishmentSelected] = useState<Establishment>(new Establishment('', '', '', false, '', 0, ''))
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })

    const getEstablishments = async () => {
        await vm.getEstablishments()
        setRefresh(true)
    }
    useEffect(() => { getEstablishments() }, [])
    useEffect(() => { setRefresh(false) }, [refresh])

    const location: Location = geolocation === undefined ? { latitude: 0.0, longitude: 0.0 } as Location : geolocation

    const showEstablishmentOptions: ShowEstablishmentModalProps = {
        colorScheme: COLORS,
        animationType: AnimationType.FADE,
        visible: showEstablishment,
        establishment: establishmentSelected!,
        publications: establishmentSelected!.publications!,
        onRequestClose: () => setShowEstablishment(false)
    }

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
                                latitudeDelta: 0.03,
                                longitudeDelta: 0.03
                            }}
                            onRegionChange={(region) => { setRefresh(true) }}
                            provider={PROVIDER_GOOGLE}
                            customMapStyle={mapStyle}
                            mapType="standard"
                            style={StyleSheet.absoluteFillObject}
                        >
                            <Marker
                                key={'user'}
                                title={vm.user?.username}
                                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                            >
                                {vm.user?.photo === null || vm.user?.photo === undefined ?
                                    <Image size={8} borderRadius={100} source={require("../../assets/images/default-user.png")} alt={''} />
                                    :
                                    <Image size={8} borderRadius={100} source={{ uri: vm.user?.photo }} alt={vm.user?.username ?? ''} />
                                }
                            </Marker>
                            {vm.establishments!.length > 0 ?
                                vm.establishments!.map(establishment => {
                                    return <Marker
                                        key={establishment.id}
                                        title={establishment.name}
                                        coordinate={JSON.parse(establishment.location.replaceAll("'", '"'))}
                                        pinColor={COLORS.touchable}
                                        onPress={() => { setEstablishmentSelected(establishment); setShowEstablishment(true) }}
                                    />
                                })
                                :
                                null
                            }
                        </MapView>
                    </View>
                </View>
                <ShowEstablishmentModal {...showEstablishmentOptions} />
            </NativeBaseProvider>
        </>
    )
}