import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
    selected: "pix" | "card" | null;
    onSelect: (value: "pix" | "card") => void;
    onAddCard: () => void;
}

export function PaymentOptions({ selected, onSelect, onAddCard }: Props) {
    return (
        <>
            <TouchableOpacity
                style={[styles.option, selected === "pix" && styles.selected]}
                onPress={() => onSelect("pix")}
            >
                <Text style={styles.label}>Pague com Pix</Text>
                <Text style={styles.desc}>Use o QR Code ou copie e cole o código</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.option, selected === "card" && styles.selected]}
                onPress={() => onSelect("card")}
            >
                <Image source={require("@/assets/images/logo.png")} style={styles.image} />
                <Text style={styles.label}>Adicione um cartão</Text>
                <Text style={styles.desc}>
                    É prático, seguro e você não perde tempo quando seu pedido chegar.
                </Text>
                <TouchableOpacity style={styles.addButton} onPress={onAddCard}>
                    <Text style={styles.addText}>Adicionar novo cartão</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    option: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    selected: {
        borderColor: "#00D361",
        backgroundColor: "#eafff2",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 6,
        color: "#333",
    },
    desc: {
        fontSize: 14,
        color: "#666",
    },
    image: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginBottom: 10,
    },
    addButton: {
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 6,
        backgroundColor: "#00D361",
        alignItems: "center",
    },
    addText: {
        color: "#fff",
        fontWeight: "bold",
    },
});