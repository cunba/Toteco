import { StyleSheet } from "react-native";
import { SIZES } from "../../config/Sizes";

export const addPublicationStyles = StyleSheet.create({
    publicationContainer: {
        flexDirection: 'row',
        height: 200,
        width: '80%',
        justifyContent: 'center',
        alignContent: 'space-around',
        marginBottom: 20
    },
    totalContainer: {
        flexDirection: 'column',
        // paddingLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 3
    },
    totalTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'space-around',
        flexDirection: 'column',
        flex: 2
    },
    card: {
        maxWidth: '80%',
        marginBottom: 20,
        alignSelf: 'center'
    }
})