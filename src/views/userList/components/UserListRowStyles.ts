import { StyleSheet } from "react-native";

export const userListRowStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10,
        height: 70,
        alignItems: 'center'
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        height: '100%',
        alignItems: 'center'
    },
    followButton: {
        width: 120,
        alignSelf: 'center',
        height: 30,
        paddingVertical: 5,
        marginBottom: 0
    }
})