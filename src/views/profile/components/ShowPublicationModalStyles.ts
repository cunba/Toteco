import { StyleSheet } from "react-native";
import { SIZES } from "../../../config/Sizes";

export const showPublicationModalStyles = StyleSheet.create({
    alertContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#1F1F1F',
        width: '100%',
        height: '100%',
        opacity: 0.7,
        position: 'absolute'
    },
    containerShowPublication: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        position: 'relative',
        borderRadius: 2,
        marginTop: '70%'
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
        alignItems: 'center'
    }
})