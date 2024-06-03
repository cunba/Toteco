import { Dimensions, StyleSheet } from "react-native";

export const publicationStyles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        height: 200,
        width: '90%',
        justifyContent: 'center',
        alignContent: 'space-around',
        // paddingTop: 20,
        // marginBottom: 20,
        borderBottomWidth: 1
    },
    productsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 3,
        height: 200
    },
    titleSeparator: {
        borderBottomWidth: 1,
        width: '90%'
    },
    totalContainer: {
        flexDirection: 'row',
        height: 200,
        width: '90%',
        justifyContent: 'center',
        alignContent: 'space-around'
    }
})