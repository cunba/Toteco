import { StyleSheet } from 'react-native';
import { SIZES } from '../../config/Sizes';

export const signUpStyles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: SIZES.title,
        paddingBottom: 20
    },
    textinput: {
        fontSize: SIZES.text,
        width: 200,
        height: 40,
        paddingLeft: 20
    },
    button: {
        textAlign: 'center',
        fontSize: SIZES.text_touchables,
        width: 300,
        paddingVertical: 10,
        borderRadius: 10
    },
    textRecover: {
        textAlign: 'center',
        fontSize: SIZES.text,
        paddingTop: 10,
    },
    containerInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 300,
        marginBottom: 10
    },
    containerInputDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'grey',
        width: 300,
        marginBottom: 20
    },
    picker: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
        height: 40,
        paddingLeft: 10
    },
    containerChecked: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 300,
        marginBottom: 20,
        marginTop: 10
    },
    pickerContainer: {
        borderColor: 'grey',
        width: 200
    }
})