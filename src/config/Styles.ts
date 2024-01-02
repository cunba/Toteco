import { StyleSheet } from "react-native";
import { SIZES } from "./Sizes";

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50
    },
    spinner: {
        paddingBottom: 15,
        backgroundColor: 'white',
    },
    title: {
        textAlign: 'center',
        fontSize: SIZES.title,
        // width: '100%',
        flex: 1
    },
    titleToolbar: {
        textAlign: 'center',
        fontSize: 25
    },
    text: {
        textAlign: 'center',
        fontSize: SIZES.text
    },
    textButton: {
        textAlign: 'center',
        fontSize: SIZES.text_touchables
    },
    textInOut: {
        textAlign: 'center',
        fontSize: SIZES.text,
        paddingBottom: 5,
    },
    containerOptions: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 60,
        paddingRight: 60,
        paddingTop: 30,
    },
    containerInOut: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerRadioButtonIn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 'auto',
    },
    containerRadioButtonOut: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 'auto',
        marginRight: -7
    },
    labelContainer: {
        position: 'absolute',
        backgroundColor: '#FFF',
        top: -7,
        left: 10,
        paddingHorizontal: 5,
        zIndex: 50
    }
})

export const formStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: SIZES.title,
        paddingBottom: 20
    },
    input: {
        fontSize: SIZES.text_input,
        width: 300,
        height: 40,
        paddingLeft: 20
    },
    button: {
        textAlign: 'center',
        fontSize: SIZES.text_touchables,
        width: 300,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10
    }
})