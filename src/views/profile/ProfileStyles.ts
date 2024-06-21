import { StyleSheet } from "react-native";
import { SIZES } from "../../config/Sizes";

export const profileStyles = StyleSheet.create({
    profileInfoContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignContent: 'center'
    },
    card: {
        fontSize: SIZES.icons
    },
    headerContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        width: '100%'
    }
})