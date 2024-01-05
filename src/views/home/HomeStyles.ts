import { StyleSheet } from "react-native";
import { SIZES } from "../../config/Sizes";

export const homeStyles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        overflow: 'hidden',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: -10
    },
    icon: {
        fontSize: SIZES.icons
    }
})