import { Icon, Image, NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Appearance, Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Location } from "react-native-location";
import AntDesign from "react-native-vector-icons/AntDesign";
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";
import { geolocation } from "../../App";
import { AnimationType } from "../../components/Alert";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { ROUTES } from "../../config/Constants";
import { SIZES } from "../../config/Sizes";
import { commonStyles, formStyles, stylesRicyclerList } from "../../config/Styles";
import { ProductDataDTO } from "../../data/model/toteco/Product";
import i18n from "../../infrastructure/localization/i18n";
import { back, navigate } from "../../infrastructure/navigation/RootNavigation";
import { FunctionalView } from "../../infrastructure/views/FunctionalView";
import { AddPublicationViewModel } from "../../viewmodels/AddPublicationViewModel";
import { addPublicationStyles } from "./AddPublicationStyles";
import { AddProductModal, AddProductModalProps } from "./components/AddProductModal";
import { EditProductModal, EditProductModalProps } from "./components/EditProductModal";
import { RenderProduct, RenderProductProps } from "./components/RenderProduct";

export const AddPublicationView: FunctionalView<AddPublicationViewModel> = ({ vm }) => {
    const [showSpinner, setShowSpinner] = useState(false)
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
    const [COLORS, setCurrentColor] = useState(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT);

    Appearance.addChangeListener(() => {
        setCurrentColor(Appearance.getColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT)
    })

    useEffect(() => vm.constructorFuncions(), [])

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

    const addProductOptions: AddProductModalProps = {
        visible: addProduct,
        onRequestClose: () => setAddProduct(!addProduct),
        onPressOk: () => {
            vm.addProduct(newProduct)
            setAddProduct(!addProduct)
        },
        colorScheme: COLORS,
        animationType: AnimationType.FADE,
        onNameChange: (name: string) => { newProduct.name = name },
        onPriceChange: (price: number) => { newProduct.price = price },
        onScoreChange: (score: number) => { newProduct.score = score },
        onInMenuChange: (inMenu: boolean) => { newProduct.inMenu = inMenu }
    }

    const editProductOptions: EditProductModalProps = {
        visible: editProduct,
        onRequestClose: () => setEditProduct(!editProduct),
        onPressOk: () => {
            vm.editProduct(productModified, indexProductModified)
            setEditProduct(!editProduct)
        },
        colorScheme: COLORS,
        animationType: AnimationType.FADE,
        name: productModified.name,
        inMenu: productModified.inMenu,
        price: productModified.price,
        score: productModified.score,
        onNameChange: (name: string) => { productModified.name = name },
        onPriceChange: (price: number) => { productModified.price = price },
        onScoreChange: (score: number) => { productModified.score = score },
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
                            {vm.products.length === 0 ?
                                <></>
                                :
                                <RecyclerListView
                                    ref={(c) => { setScroll(c) }}
                                    showsVerticalScrollIndicator={false}
                                    style={stylesRicyclerList.recyclerListView}
                                    layoutProvider={layoutProvider}
                                    dataProvider={getDataSource()}
                                    rowRenderer={rowRender}
                                />
                            }
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => { navigate(ROUTES.ADD_ESTABLISHMENT, null); close() }} style={[formStyles.button, { backgroundColor: COLORS.background_second }]}>
                                <Text style={[commonStyles.textButton, { color: COLORS.text_touchable }]}>{i18n.t('add_publication.establishment.label')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[formStyles.button, { backgroundColor: COLORS.background_second }]} onPress={() => { setAddProduct(!addProduct); close() }}>
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
                <AddProductModal {...addProductOptions} />
                <EditProductModal {...editProductOptions} />
            </NativeBaseProvider>
        </>
    )
}