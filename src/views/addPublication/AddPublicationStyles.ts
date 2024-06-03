import { Dimensions, StyleSheet } from "react-native";

export const addPublicationStyles = StyleSheet.create({
    publicationContainer: {
        flexDirection: 'row',
        height: 200,
        width: '90%',
        justifyContent: 'center',
        alignContent: 'space-around',
        paddingTop: 20,
        marginBottom: 20
    },
    buttonsContainer: {
        flexDirection: 'row',
        height: 'auto',
        width: '90%',
        justifyContent: 'center',
        alignContent: 'space-around',
        marginBottom: 20
    },
    establishmentContainer: {
        flexDirection: 'row',
        height: 'auto',
        width: '90%',
        justifyContent: 'flex-start',
        alignContent: 'space-around',
        paddingTop: 20,
    },
    totalContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 3,
        height: 200
    },
    totalTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'space-around',
        flexDirection: 'column',
        flex: 2
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10
    },
    mapStyle: {
        width: Dimensions.get('screen').width,
        height: '80%'
    }
})