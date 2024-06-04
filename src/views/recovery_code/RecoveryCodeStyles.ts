import { StyleSheet } from 'react-native';
import { SIZES } from '../../config/Sizes';

export const recoveryCodeStyles = StyleSheet.create({
    titleToolbar: {
        textAlign: 'center',
        fontSize: SIZES.title,
        flex: 2
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 20
    },
    toolbarButton: {
        alignSelf: 'center',
        flex: 1
    }
})