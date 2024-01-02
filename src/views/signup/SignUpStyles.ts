import { StyleSheet } from 'react-native';
import { SIZES } from '../../config/Sizes';

export const signUpStyles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: SIZES.title,
        flex: 2
    },
    textRecover: {
        textAlign: 'center',
        fontSize: SIZES.text,
        paddingTop: 10,
    },
    containerInputDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'grey',
        width: 300,
        marginBottom: 15,
        marginTop: 5
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // alignItems: 'baseline',
        paddingBottom: 20
    },
    toolbarButton: {
        alignSelf: 'center',
        flex: 1
    }
})