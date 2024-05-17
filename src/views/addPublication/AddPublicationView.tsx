import { Icon, Image, NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Appearance, Text, TouchableOpacity, View } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Card } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import { AlertProps, AlertType } from "../../components/Alert";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { ROUTES } from "../../config/Constants";
import { SIZES } from "../../config/Sizes";
import { commonStyles, formStyles } from "../../config/Styles";
import i18n from "../../infrastructure/localization/i18n";
import { back, navigate } from "../../infrastructure/navigation/RootNavigation";
import { FunctionalView } from "../../infrastructure/views/FunctionalView";
import { AddPublicationViewModel } from "../../viewmodels/AddPublicationViewModel";
import { addPublicationStyles } from "./AddPublicationStyles";

export const AddPublicationView: FunctionalView<AddPublicationViewModel> = ({ vm }) => {
    const [showSpinner, setShowSpinner] = useState(false)
    const [hideErrorMessage, setHideErrorMessage] = useState(true);
    const [loading, setLoading] = useState(false)
    const [imageUri, setImageUri] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [addProduct, setAddProduct] = useState(false)
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })

    useEffect(() => {

    }, [])

    const camera = async () => {
        const result = await launchCamera({
            mediaType: 'photo',
            cameraType: 'back',
            includeBase64: false,
            saveToPhotos: true
        })
        if (result.assets) {
            setImageUri(result.assets[0].uri!)
            vm.setImage(result.assets[0].uri!)
        }
        console.log(result)
    }

    const gallery = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            selectionLimit: 1
        })
        if (result.assets) {
            setImageUri(result.assets![0].uri!)
            vm.setImage(result.assets[0].uri!)
        }
    }

    const pickImageAlert = () => {
        Alert.alert(
            i18n.t('add_publication.alert.title'),
            '',
            [
                {
                    text: i18n.t('add_publication.alert.camera'),
                    onPress: camera,
                    style: 'default'
                },
                {
                    text: i18n.t('add_publication.alert.gallery'),
                    onPress: gallery
                },
                {
                    text: i18n.t('add_publication.alert.cancel'),
                    style: 'cancel'
                },
            ],
            {
                cancelable: true
            }
        )
    }

    const modifyProduct = () => {

    }

    const addProductOptions: AlertProps = {
        type: AlertType.ADD_PRODUCT,
        visible: addProduct,
        onRequestClose: () => { setAddProduct(!addProduct) },
        colorScheme: COLORS,
        bgColor: COLORS.background
    }

    return (
        <>
            <NativeBaseProvider>
                <View style={[commonStyles.container, { backgroundColor: COLORS.background }]}>
                    <View style={[commonStyles.toolbar, { borderColor: COLORS.shadowToolbar }]}>
                        <TouchableOpacity onPress={() => back()} style={commonStyles.toolbarButton}>
                            <Icon as={<AntDesign name='left' />} size={7} mr="2" color={COLORS.touchable} />
                        </TouchableOpacity>
                        <Text style={[commonStyles.titleToolbar, { color: COLORS.text }]}>{i18n.t('add_publication.title')}</Text>
                        <Text style={{ flex: 1 }}></Text>
                    </View>
                    <View style={formStyles.container}>
                        <View style={{ flex: 2, paddingTop: 20 }}>
                            <View style={addPublicationStyles.publicationContainer}>
                                <TouchableOpacity style={{ flex: 2 }} onPress={pickImageAlert}>
                                    {imageUri === '' ?
                                        <Image size={200} borderRadius={10} source={require("../../assets/images/no-image.jpg")} alt="No image" />
                                        :
                                        <Image size={200} borderRadius={10} source={{ uri: imageUri }} alt="Alternate Text" />
                                    }
                                </TouchableOpacity>
                                <View style={addPublicationStyles.totalContainer}>
                                    <Text style={[commonStyles.text, { color: COLORS.text, fontSize: SIZES.text_touchables, paddingBottom: 20 }]}>
                                        {i18n.t('add_publication.total_score') + '\n' + Math.round(vm.totalScore * 10) / 10 + ' / 5 ☆'}
                                    </Text>
                                    <Text style={[commonStyles.text, { color: COLORS.text, fontSize: SIZES.text_touchables, paddingTop: 20 }]}>
                                        {i18n.t('add_publication.total_price') + '\n' + Math.round(vm.totalPrice * 100) / 100 + ' €'}
                                    </Text>
                                </View>
                            </View>
                            {vm.products.length === 0 ?
                                <></>
                                :
                                vm.products.map(product => {
                                    return <Card
                                        style={[addPublicationStyles.card, { backgroundColor: COLORS.background, shadowColor: COLORS.shadow }]}
                                        onPress={modifyProduct}>
                                        <Card.Content>
                                            <TouchableOpacity onPress={() => modifyProduct()}>
                                                <Text style={{ color: COLORS.text }}>{'- ' + product.name + ' (' + Math.round(product.price! * 100) / 100 + '€, ' + Math.round(product.score * 10) / 10 + '/5 ⭐️'}</Text>
                                            </TouchableOpacity>
                                        </Card.Content>
                                    </Card>
                                })
                            }
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => navigate(ROUTES.ADD_ESTABLISHMENT, null)} style={[formStyles.button, { backgroundColor: COLORS.background_second }]}>
                                <Text style={[commonStyles.textButton, { color: COLORS.text_touchable }]}>{i18n.t('add_publication.establishment.label')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[formStyles.button, { backgroundColor: COLORS.background_second }]} onPress={() => setAddProduct(!addProduct)}>
                                <Text style={[commonStyles.textButton, { color: COLORS.text_touchable }]}>{i18n.t('add_publication.product.label')}</Text>
                            </TouchableOpacity>
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
                                <TouchableOpacity style={[formStyles.button, { backgroundColor: COLORS.touchable }]} onPress={() => navigate(ROUTES.ADD_ESTABLISHMENT, null)} >
                                    <Text style={[commonStyles.textButton, { color: COLORS.text_touchable }]}>{i18n.t('add_publication.title')}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
            </NativeBaseProvider>
        </>
    )
}