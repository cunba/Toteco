import { StyleSheet } from "react-native";
import { SIZES } from "../../config/Sizes";

export const profileStyles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1
    },
    card: {
        fontSize: SIZES.icons
    }
})