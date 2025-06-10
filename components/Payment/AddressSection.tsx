import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function AddressSection() {
    return (
        <View style={styles.addressContainer}>
            <Text style={styles.address}>
                R. Salgado Filho, 590{"\n"}apartamento 2 - Cascavel/PR
            </Text>
            <TouchableOpacity>
                <Text style={styles.change}>Trocar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    addressContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    address: {
        fontSize: 16,
        color: "#333",
    },
    change: {
        color: "#00D361",
        fontWeight: "bold",
    },
});