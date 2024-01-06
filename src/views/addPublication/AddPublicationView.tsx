import { Icon, Image, NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Appearance, Dimensions, Text, TouchableOpacity, View } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { ROUTES } from "../../config/Constants";
import { SIZES } from "../../config/Sizes";
import { commonStyles, formStyles, stylesRicyclerList } from "../../config/Styles";
import { ProductDataDTO } from "../../data/model/Product";
import i18n from "../../infrastructure/localization/i18n";
import { back, navigate } from "../../infrastructure/navigation/RootNavigation";
import { FunctionalView } from "../../infrastructure/views/FunctionalView";
import { AddPublicationViewModel } from "../../viewmodels/AddPublicationViewModel";
import { addPublicationStyles } from "./AddPublicationStyles";

export const AddPublicationView: FunctionalView<AddPublicationViewModel> = ({ vm }) => {
    const [scroll, setScroll] = useState<any>()
    const [showSpinner, setShowSpinner] = useState(false)
    const [hideErrorMessage, setHideErrorMessage] = useState(true);
    const [loading, setLoading] = useState(false)
    const [imageUri, setImageUri] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [dataSource, setDataSource] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    )
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })

    useEffect(() => {

    }, [])

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

    const camera = async () => {
        const result = await launchCamera({
            mediaType: 'photo',
            cameraType: 'front',
            includeBase64: false,
            saveToPhotos: true
        })
        if (result.assets) {
            setImageUri(result.assets[0].uri!)
            vm.setImage(result.assets[0].base64!)
        }
        console.log(result)
    }

    const getDataSource = (): DataProvider => {
        return dataSource.cloneWithRows(vm.products)
    }

    const layoutProvider = new LayoutProvider(
        index => {
            return 0
        },
        (type, dim) => {
            dim.height = 20
            dim.width = Dimensions.get('screen').width
        },
    )

    const rowRender = (type: any, item: ProductDataDTO) => {
        return <Text>{'- ' + item.name + ' (' + Math.round(item.price! * 100) / 100 + '€, ' + Math.round(item.score * 10) / 10 + '/5 ⭐️'}</Text>
    }

    const pickImageAlert = () => {
        Alert.alert(
            i18n.t('sign_up.alert.title'),
            '',
            [
                {
                    text: i18n.t('sign_up.alert.camera'),
                    onPress: camera,
                    style: 'default'
                },
                {
                    text: i18n.t('sign_up.alert.gallery'),
                    onPress: gallery
                },
                {
                    text: i18n.t('sign_up.alert.cancel'),
                    style: 'cancel'
                },
            ],
            {
                cancelable: true
            }
        )
    }

    return (
        <>
            <NativeBaseProvider>
                <View style={[commonStyles.container, { backgroundColor: COLORS.background }]}>
                    <View style={commonStyles.toolbar}>
                        <TouchableOpacity onPress={() => back()} style={commonStyles.toolbarButton}>
                            <Icon as={<AntDesign name='left' />} size={7} mr="2" color={COLORS.touchable} />
                        </TouchableOpacity>
                        <Text style={[commonStyles.titleToolbar, { color: COLORS.text }]}>{i18n.t('add_publication.title')}</Text>
                        <Text style={{ flex: 1 }}></Text>
                    </View>
                    <View style={formStyles.container}>
                        <Text style={[formStyles.input, { color: COLORS.text }]}>{vm.establishmentScore ?? i18n.t('add_publication.establishment.score')}</Text>
                        <RecyclerListView
                            ref={(c) => { setScroll(c) }}
                            showsVerticalScrollIndicator={false}
                            style={stylesRicyclerList.recyclerListView}
                            layoutProvider={layoutProvider}
                            dataProvider={getDataSource()}
                            rowRenderer={rowRender}
                        />
                        <View style={addPublicationStyles.publicationContainer}>
                            <TouchableOpacity style={{ flex: 2 }} onPress={pickImageAlert}>
                                {imageUri === '' ?
                                    <Image style={{ flex: 1 }} height={300} borderRadius={10} source={require("../../assets/images/default-user.png")} alt="Alternate Text" />
                                    :
                                    <Image style={{ flex: 1 }} height={300} borderRadius={10} source={{ uri: imageUri }} alt="Alternate Text" />
                                }
                            </TouchableOpacity>
                            <View style={addPublicationStyles.totalContainer}>
                                <Text style={[commonStyles.text, { color: COLORS.text, fontSize: SIZES.text_touchables, paddingBottom: 20 }]}>
                                    {i18n.t('add_publication.total_score') + '\n' + Math.round(vm.totalScore * 10) / 10 + ' / 5 ⭐️'}
                                </Text>
                                <Text style={[commonStyles.text, { color: COLORS.text, fontSize: SIZES.text_touchables, paddingTop: 20 }]}>
                                    {i18n.t('add_publication.total_price') + '\n' + Math.round(vm.totalPrice * 100) / 100 + ' €'}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => navigate(ROUTES.ADD_ESTABLISHMENT, null)} style={[formStyles.button, { backgroundColor: COLORS.background_second }]}>
                            <Text style={[commonStyles.textButton, { color: COLORS.text_touchable }]}>{i18n.t('add_publication.establishment.label')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[formStyles.button, { backgroundColor: COLORS.background_second }]}>
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
            </NativeBaseProvider>
        </>
    )
}