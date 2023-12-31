import { StyleSheet } from "react-native";
import { SIZES } from "../../config/Sizes";

export const loginStyles = StyleSheet.create({
    textRecover: {
        textAlign: 'center',
        fontSize: SIZES.text,
        paddingTop: 5,
        paddingBottom: 10
    },
    titleView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center'
    },
    header: {
        fontSize: SIZES.app_name,
        paddingTop: 50,
        alignSelf: 'center'
    },
    formView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center"
    }
})