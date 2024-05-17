import { Dimensions, StyleSheet } from "react-native";
import { SIZES } from "../../config/Sizes";

export const alertPopUpStyles = StyleSheet.create({
    titleView: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    title: {
        textAlign: 'center',
        fontSize: SIZES.subtitle,
        padding: 10
    },
    alertContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#1F1F1F',
        width: '100%',
        height: '100%',
        opacity: 0.7,
        position: 'absolute'
    },
    calendarContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        padding: 40,
        position: 'relative'
    },
    containerOptions: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingVertical: '4%',
        borderTopWidth: 1,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2
    },
    containerAlertMessage: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        margin: '15%',
        height: 'auto',
        position: 'relative',
        borderRadius: 2,
        marginTop: '70%',
    },
    containerModifyProduct: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        position: 'relative',
        borderRadius: 2,
        marginTop: '70%',
    },
    containerAddProduct: {
        display: "flex",
        
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        position: 'relative',
        borderRadius: 2,
        marginTop: '70%',
    },
    productItems: {
        marginBottom: 20, 
        marginTop: 20,
        gap: 10
    },
    containerDelete: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        height: 160,
        position: 'relative',
        borderRadius: 2,
        marginTop: '70%',
    },
    containerAlertNoMessage: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '15%',
        marginHorizontal: '30%',
        position: 'relative',
        borderRadius: 5,
        marginTop: '70%',
    },
    text: {
        textAlign: 'left',
        fontSize: SIZES.text_touchables,
        paddingBottom: 10,
        paddingHorizontal: '10%'
    },
    textButton: {
        textAlign: 'center',
        fontSize: SIZES.text_touchables,
        paddingHorizontal: 20,
        paddingBottom: 5
    },
    containerInOut: {
        flex: 1,
        width: '100%',
        paddingHorizontal: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerOkCancel: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: 'grey',
        borderTopWidth: 1,
    },
    containerObservations: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5
    },
    input: {
        fontSize: SIZES.text_input,
        width: 300,
        height: 40,
        paddingLeft: 20
    },
})