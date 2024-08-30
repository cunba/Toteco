import { Dimensions, StyleSheet } from "react-native";
import { SIZES } from "../../config/Sizes";

export const alertPopUpStyles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: SIZES.subtitle,
        padding: 10
    },
    menuTitle: {
        textAlign: 'center',
        fontSize: SIZES.subtitleMini,
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
    containerOptions: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingVertical: '4%',
        borderTopWidth: 1,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2
    },
    containerAlertMessage: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        margin: '15%',
        height: 'auto',
        position: 'relative',
        borderRadius: 2,
        marginTop: '70%',
    },
    containerDelete: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        height: 160,
        position: 'relative',
        borderRadius: 2,
        marginTop: '70%',
    },
    containerAlertNoMessage: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '15%',
        marginHorizontal: '30%',
        position: 'relative',
        borderRadius: 5,
        marginTop: '70%',
    },
    text: {
        textAlign: 'left',
        fontSize: SIZES.text_touchables,
        paddingBottom: 10,
        paddingHorizontal: '10%'
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
})