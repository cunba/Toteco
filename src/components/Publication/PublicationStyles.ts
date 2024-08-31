import { Dimensions, StyleSheet } from "react-native";

export const publicationStyles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'space-around',
        marginVertical: 10
    },
    productsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 3,
        height: 200,
        width: '100%'
    },
    titleSeparator: {
        borderBottomWidth: 1,
        width: '100%'
    },
    totalContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        width: '100%',
        justifyContent: 'space-between',
        borderTopWidth: 1
    },
    titleContainer: { 
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        paddingBottom: 5,
        alignItems: 'center'
    },
    title: {
        lineHeight: 15,
        textAlign: 'left'
        // paddingTop: 10
    }
})