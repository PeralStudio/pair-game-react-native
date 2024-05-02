import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Header extends React.Component {
    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.header_text}>MemoryGame</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: "column",
        alignSelf: "stretch",
        paddingTop: 30,
        paddingBottom: 10,
        backgroundColor: "#323338"
    },
    header_text: {
        fontFamily: "sans-serif-condensed",
        fontWeight: "bold",
        fontSize: 20,
        color: "#fff",
        textAlign: "center"
    }
});
