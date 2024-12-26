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
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'light-grey',
        width: 300,
        marginBottom: 15,
        marginTop: 5,
        paddingBottom: 3
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 20
    },
    toolbarButton: {
        alignSelf: 'center',
        flex: 1
    },
    editText: { 
        position: 'absolute', 
        top: 111,
        right: 30, 
        backgroundColor: 'grey', 
        opacity: 0.7,
        width: 90,
        height: 40,
        borderRadius: 5,
        borderBottomEndRadius: 90,
        borderBottomStartRadius: 90,
        textAlign: 'center',
        fontSize: SIZES.text_touchables,
        paddingTop: 10
    }
})