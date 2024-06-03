import { StyleSheet } from "react-native";
import { SIZES } from "../../config/Sizes";

export const profileStyles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around',
        alignContent: 'center',
        paddingTop: 20,
        marginBottom: 20
    },
    card: {
        fontSize: SIZES.icons
    }
})