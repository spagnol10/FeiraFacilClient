import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    selected: "standard" | "fast";
    onSelect: (value: "standard" | "fast") => void;
}

export function DeliveryOptions({ selected, onSelect }: Props) {
    return (
        <View style={styles.deliveryOptions}>
            <TouchableOpacity
                style={[styles.box, selected === "standard" && styles.selected]}
                onPress={() => onSelect("standard")}
            >
                <Text style={styles.type}>Padrão</Text>
                <Text style={styles.time}>Hoje, 24–34 min</Text>
                <Text style={styles.price}>R$ 2,99</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.box, selected === "fast" && styles.selected]}
                onPress={() => onSelect("fast")}
            >
                <Text style={styles.type}>Rápida</Text>
                <Text style={styles.time}>Hoje, 19–29 min</Text>
                <Text style={styles.price}>R$ 9,99</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    deliveryOptions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 30,
    },
    box: {
        width: "48%",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    selected: {
        borderColor: "#00D361",
        backgroundColor: "#eafff2",
    },
    type: {
        fontWeight: "bold",
        color: "#333",
    },
    time: {
        color: "#666",
        fontSize: 14,
    },
    price: {
        fontWeight: "bold",
        color: "#333",
        marginTop: 5,
    },
});