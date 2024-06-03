import { Icon, Image, Input, NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Appearance, Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Location } from "react-native-location";
import AntDesign from "react-native-vector-icons/AntDesign";
import Foundation from "react-native-vector-icons/Foundation";
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";
import { geolocation } from "../../App";
import { AnimationType } from "../../components/Alert";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { SIZES } from "../../config/Sizes";
import { commonStyles, formStyles, stylesRicyclerList } from "../../config/Styles";
import { PlaceDetailsData } from "../../data/model/places/PlaceDetails";
import { EstablishmentDataDTO } from "../../data/model/toteco/Establishment";
import { ProductDataDTO } from "../../data/model/toteco/Product";
import i18n from "../../infrastructure/localization/i18n";
import { back } from "../../infrastructure/navigation/RootNavigation";
import { FunctionalView } from "../../infrastructure/views/FunctionalView";
import { AddPublicationViewModel } from "../../viewmodels/AddPublicationViewModel";
import { addPublicationStyles } from "./AddPublicationStyles";
import { AddEstablishmentModal, AddEstablishmentModalProps } from "./components/AddEstablishmentModal";
import { AddProductModal, AddProductModalProps } from "./components/AddProductModal";
import { EditProductModal, EditProductModalProps } from "./components/EditProductModal";
import { RenderProduct, RenderProductProps } from "./components/RenderProduct";

export const AddPublicationView: FunctionalView<AddPublicationViewModel> = ({ vm }) => {
    const [showSpinner, setShowSpinner] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [hideErrorMessage, setHideErrorMessage] = useState(true);
    const [loading, setLoading] = useState(false)
    const [imageUri, setImageUri] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [addProduct, setAddProduct] = useState(false)
    const [editProduct, setEditProduct] = useState(false)
    const [newProduct, setNewProduct] = useState(new ProductDataDTO())
    const [productModified, setProductModified] = useState(new ProductDataDTO())
    const [indexProductModified, setIndexProductModified] = useState(0)
    const [optionsVisible, setOptionsVisible] = useState(false)
    const [scroll, setScroll] = useState<any>()
    const [swipableRowRef, setSwipableRowRef] = useState<Swipeable[]>([])
    const [addEstablishment, setAddEstablishment] = useState(false)
    const [newEstablishment, setNewEstablishment] = useState(new EstablishmentDataDTO("", "", false, ""))
    const [establishmentErrorMessage, setEstablishmentErrorMessage] = useState("")
    const [hideEstablishmentErrorMessage, setHideEstablishmentErrorMessage] = useState(true)
    const [productErrorMessage, setProductErrorMessage] = useState("")
    const [hideProductErrorMessage, setHideProductErrorMessage] = useState(true)
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })

    useEffect(() => { setRefresh(false) }, [refresh])

    const [dataSource, setDataSource] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    )

    const getDataSource = (): DataProvider => {
        return dataSource.cloneWithRows(vm.products)
    }

    const layoutProvider = new LayoutProvider(
        index => {
            return 0
        },
        (type, dim) => {
            dim.height = 90
            dim.width = Dimensions.get('window').width
        },
    )

    const camera = async () => {
        await launchCamera({
            mediaType: 'photo',
            cameraType: 'back',
            includeBase64: false,
            saveToPhotos: true
        }).then(result => {
            setImageUri(result.assets![0].uri!)
            vm.setImage(result.assets![0].uri!)
        })
    }

    const gallery = async () => {
        await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            selectionLimit: 1
        }).then(result => {
            setImageUri(result.assets![0].uri!)
            vm.setImage(result.assets![0].uri!)
        })
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

    const addProductOptions: AddProductModalProps = {
        visible: addProduct,
        onRequestClose: () => setAddProduct(!addProduct),
        onPressOk: () => {
            if (newProduct.name === undefined || newProduct.name === '') {
                setProductErrorMessage(i18n.t('add_product.error.no_name'))
                setHideProductErrorMessage(false)
                setRefresh(true)
            } else if (newProduct.price === undefined || newProduct.price < 0) {
                setProductErrorMessage(i18n.t('add_product.error.no_price'))
                setHideProductErrorMessage(false)
                setRefresh(true)
            } else if (newProduct.score === undefined || newProduct.score < 0 || newProduct.score > 5) {
                setProductErrorMessage(i18n.t('add_product.error.no_score'))
                setHideProductErrorMessage(false)
                setRefresh(true)
            } else {
                vm.addProduct(newProduct)
                setAddProduct(!addProduct)
                setNewProduct(new ProductDataDTO())
                setProductErrorMessage('')
                setHideProductErrorMessage(true)
                setRefresh(true)
            }
        },
        colorScheme: COLORS,
        animationType: AnimationType.FADE,
        hideErrorMessage: hideProductErrorMessage,
        errorMessage: productErrorMessage,
        onNameChange: (name: string) => { newProduct.name = name },
        onPriceChange: (price: number) => { newProduct.price = Number(price) },
        onScoreChange: (score: number) => { newProduct.score = Number(score) },
        onInMenuChange: (inMenu: boolean) => { newProduct.inMenu = inMenu }
    }

    const editProductOptions: EditProductModalProps = {
        visible: editProduct,
        onRequestClose: () => setEditProduct(!editProduct),
        onPressOk: () => {
            if (productModified.name === undefined || productModified.name === '') {
                setProductErrorMessage(i18n.t('add_product.error.no_name'))
                setHideProductErrorMessage(false)
                setRefresh(true)
            } else if (productModified.price === undefined || productModified.price < 0) {
                setProductErrorMessage(i18n.t('add_product.error.no_price'))
                setHideProductErrorMessage(false)
                setRefresh(true)
            } else if (productModified.score === undefined || productModified.score < 0 || productModified.score > 5) {
                setProductErrorMessage(i18n.t('add_product.error.no_score'))
                setHideProductErrorMessage(false)
                setRefresh(true)
            } else {
                vm.editProduct(productModified, indexProductModified)
                setEditProduct(!editProduct)
                setProductErrorMessage('')
                setHideProductErrorMessage(true)
                setRefresh(true)
            }
        },
        colorScheme: COLORS,
        animationType: AnimationType.FADE,
        name: productModified.name,
        inMenu: productModified.inMenu,
        price: productModified.price,
        score: productModified.score,
        hideErrorMessage: hideProductErrorMessage,
        errorMessage: productErrorMessage,
        onNameChange: (name: string) => { productModified.name = name },
        onPriceChange: (price: number) => { productModified.price = Number(price) },
        onScoreChange: (score: number) => { productModified.score = Number(score) },
        onInMenuChange: (inMenu: boolean) => { productModified.inMenu = inMenu }
    }

    const close = () => {
        swipableRowRef.map((item: any) => {
            if (item !== null) item.close()
        })
        setSwipableRowRef([])
    };

    const onPressTrashItem = (index: number) => {
        setOptionsVisible(!optionsVisible)
        vm.removeProduct(index)
        close()
    }

    const onPressEditItem = (product: ProductDataDTO, index: number) => {
        setProductModified(product)
        setIndexProductModified(index)
        setEditProduct(!editProduct)
        close()
    }

    const rowRender = (type: any, product: ProductDataDTO, index: number) => {
        const props: RenderProductProps = {
            onPressTrashIcon: onPressTrashItem,
            onPressEditIcon: onPressEditItem,
            swipableRowRef: (ref: any) => swipableRowRef.push(ref!),
            colorScheme: COLORS,
            product: product,
            index: index
        }

        return (<RenderProduct {...props} />)
    }

    const location: Location = geolocation === undefined ? { latitude: 0.0, longitude: 0.0 } as Location : geolocation

    const addEstablishmentOptions: AddEstablishmentModalProps = {
        colorScheme: COLORS,
        animationType: AnimationType.FADE,
        visible: addEstablishment,
        location: location,
        places: vm.placesNearby,
        name: newEstablishment.name,
        hideErrorMessage: hideEstablishmentErrorMessage,
        errorMessage: establishmentErrorMessage,
        onPressOk: () => {
            if (newEstablishment.mapsId === "") {
                setEstablishmentErrorMessage(i18n.t('add_establishment.error.no_establishment'))
                setHideEstablishmentErrorMessage(false)
                setRefresh(true)
            } else if (vm.establishmentScore === undefined || vm.establishmentScore < 0 || vm.establishmentScore > 5) {
                setEstablishmentErrorMessage(i18n.t('add_establishment.error.score_error'))
                setHideEstablishmentErrorMessage(false)
                setRefresh(true)
            } else {
                vm.addEstablishment(newEstablishment)
                setAddEstablishment(!addEstablishment)
                setRefresh(true)
            }
        },
        onRequestClose: () => setAddEstablishment(!addEstablishment),
        onNameChange: (name: string) => newEstablishment.name = name,
        onScoreChange: (score: number) => vm.establishmentScore = score,
        onPlaceChange: (place: PlaceDetailsData) => {
            vm.setPlaceSelected(place)
            newEstablishment.name = place.displayName.text
            newEstablishment.mapsId = place.id
            setRefresh(true)
        },
        onIsComputerAllowedChange: (isComputerAllowed: boolean) => newEstablishment.isComputerAllowed = isComputerAllowed,
        onRegionChange: (region: any) => {
            vm.renderEstablishments(region)
            setRefresh(true)
        }
    }

    const onAddPublicationClick = () => {
        if (vm.isValid()) {
            setHideErrorMessage(true)
            vm.createPublication()
            back()
        } else {
            if (!vm.isEstablishmentValid()) {
                selectErrorMessage(1)
                setHideErrorMessage(false)
            } else if (vm.isProductsValid()) {
                selectErrorMessage(2)
                setHideErrorMessage(false)
            } else if (vm.isPhotoValid()) {
                selectErrorMessage(3)
                setHideErrorMessage(false)
            } else if (vm.isTotalScoreValid()) {
                selectErrorMessage(4)
                setHideErrorMessage(false)
            } else if (vm.isTotalPriceValid()) {
                selectErrorMessage(5)
                setHideErrorMessage(false)
            }
        }
    }

    const selectErrorMessage = (value: number): void => {
        switch (value) {
            case 1:
                setErrorMessage(i18n.t('add_publication.error.no_establishment')!);
                break;
            case 2:
                setErrorMessage(i18n.t('add_publication.error.no_products')!);
                break;
            case 3:
                setErrorMessage(i18n.t('add_publication.error.no_image')!);
                break;
            case 4:
                setErrorMessage(i18n.t('add_publication.error.score_error')!);
                break
            case 5:
                setErrorMessage(i18n.t('add_publication.error.price_error')!);
                break
        }
    }

    const onAddEstablishmentClick = () => {
        setHideEstablishmentErrorMessage(true)
        setEstablishmentErrorMessage('')
        setAddEstablishment(!addEstablishment)
        close()
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
                        {newEstablishment.name !== '' ?
                            <View style={addPublicationStyles.establishmentContainer}>
                                <Foundation name='marker' size={SIZES.icons} color={COLORS.text} />
                                <Text style={[commonStyles.text, { color: COLORS.text, fontSize: SIZES.subtitle }]}>{'\t' + newEstablishment.name}</Text>
                            </View>
                            :
                            <></>
                        }
                        <View style={addPublicationStyles.publicationContainer}>
                            <TouchableOpacity style={{ flex: 2, height: 200 }} onPress={pickImageAlert}>
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
                        <View style={{ flex: 1 }}>
                            {vm.products.length !== 0 ?
                                <RecyclerListView
                                    ref={(c) => { setScroll(c) }}
                                    showsVerticalScrollIndicator={false}
                                    style={stylesRicyclerList.recyclerListView}
                                    layoutProvider={layoutProvider}
                                    dataProvider={getDataSource()}
                                    rowRenderer={rowRender}
                                />
                                : null
                            }
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Input
                                style={[formStyles.input, { height: 60, color: COLORS.text }]}
                                w={{ base: "90%", md: "25%" }}
                                placeholder={i18n.t('add_publication.comment').toString()}
                                onChangeText={(comment) => vm.setComment(comment)}
                                borderRadius={10}
                                maxLength={500}
                                multiline={true}
                            />
                        </View>
                        <View style={addPublicationStyles.buttonsContainer}>
                            <TouchableOpacity onPress={onAddEstablishmentClick} style={[formStyles.button, { width: '45%', backgroundColor: COLORS.background_second }]}>
                                <Text style={[commonStyles.textButton, { color: COLORS.text_touchable }]}>{i18n.t('add_publication.establishment.label')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[formStyles.button, { width: '45%', backgroundColor: COLORS.background_second }]} onPress={() => { setAddProduct(!addProduct); close() }}>
                                <Text style={[commonStyles.textButton, { color: COLORS.text_touchable }]}>{i18n.t('add_publication.product.label')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, width: '90%' }}>
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
                                <TouchableOpacity style={[formStyles.button, { width: '100%', backgroundColor: COLORS.touchable }]} onPress={onAddPublicationClick} >
                                    <Text style={[commonStyles.textButton, { color: COLORS.text_touchable }]}>{i18n.t('add_publication.title')}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
                <AddProductModal {...addProductOptions} />
                <EditProductModal {...editProductOptions} />
                <AddEstablishmentModal {...addEstablishmentOptions} />
            </NativeBaseProvider>
        </>
    )
}