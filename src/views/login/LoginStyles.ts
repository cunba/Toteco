// import { StyleSheet } from "react-native/types";
import { StyleSheet } from "react-native";
import { COLORS_DARK, COLORS_LIGHT } from "../../config/Colors";
import { COLOR_MODE } from "../../config/Constants";
import { SIZES } from "../../config/Sizes";

const COLORS = COLOR_MODE === 'light' ? COLORS_LIGHT : COLORS_DARK

export const loginStyles = StyleSheet.create({
    textRecover: {
        textAlign: 'center',
        fontSize: SIZES.text,
        paddingTop: 5,
        paddingBottom: 10,
        color: COLORS.text
    },
    titleView: {
        flex: 4,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        width: 300,
        marginTop: -10
    }
})