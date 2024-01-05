import { StyleSheet } from "react-native";

export const multiLevelFabButtonStyles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 18,
        height: 22,
        color: 'black',
    },
    overlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: "transparent",
    },
    circleContainer: {
        flexDirection: "column",
        padding: 10,
    },
    circleBarItem: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    btn: {
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: "#444",
        shadowRadius: 1,
    },
    btnText: {
        marginTop: -4,
        fontSize: 24,
        backgroundColor: "transparent",
        position: "relative",
    },
});