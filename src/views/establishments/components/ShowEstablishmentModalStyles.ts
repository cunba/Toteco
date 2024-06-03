import { Dimensions, StyleSheet } from "react-native";
import { SIZES } from "../../../config/Sizes";

export const showEstablishmentModalStyles = StyleSheet.create({
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
    containerShowEstablishment: {
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
    productItems: {
        marginBottom: 20,
        marginTop: 20,
        gap: 10
    }
})