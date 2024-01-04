import { StyleSheet } from "react-native";

export const drawerStyles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingTop: 20,
        alignItems: 'center',
    },
    title: {
        marginVertical: 10,
        fontWeight: 'bold',
        color: 'black'
    },
    subtitle: {
        fontSize: 13,
        color: 'black'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    button: {
        position: 'absolute',
        bottom: 0,
    },
    bottom: {
        width: '90%',
        marginLeft: '5%',
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
    },
});