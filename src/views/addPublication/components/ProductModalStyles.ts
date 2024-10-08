import { Dimensions, StyleSheet } from "react-native";
import { SIZES } from "../../../config/Sizes";

export const productModalStyles = StyleSheet.create({
    titleView: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    title: {
        textAlign: 'center',
        fontSize: SIZES.subtitle,
        padding: 10
    },
    alertContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#1F1F1F',
        width: '100%',
        height: '100%',
        opacity: 0.7,
        position: 'absolute'
    },
    containerModifyProduct: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        position: 'relative',
        borderRadius: 2,
        marginTop: '70%',
    },
    containerAddProduct: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        position: 'relative',
        borderRadius: 2,
        marginTop: '70%'
    },
    containerAddEstablishment: {
        display: "flex",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        position: 'relative',
        borderRadius: 2,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    productItems: {
        marginBottom: 20,
        marginTop: 20,
        gap: 10
    },
    textButton: {
        textAlign: 'center',
        fontSize: SIZES.text_touchables,
        paddingHorizontal: 20,
        paddingBottom: 5
    },
    containerOkCancel: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: 'grey',
        borderTopWidth: 1,
    },
    input: {
        fontSize: SIZES.text_input,
        width: 300,
        height: 40,
        paddingLeft: 20
    },
})