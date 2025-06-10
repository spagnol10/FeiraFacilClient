import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  selectedDelivery: "standard" | "fast";
  setSelectedDelivery: (value: "standard" | "fast") => void;
}

export const OrderDetails: React.FC<Props> = ({ selectedDelivery, setSelectedDelivery }) => {
  return (
    <>
      <Text style={styles.title}>Finalize seu pedido</Text>

      <View style={styles.tabContainer}>
        <Text style={[styles.tab, styles.activeTab]}>Entrega</Text>
        <Text style={styles.tab}>Retirada</Text>
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.address}>R. Salgado Filho, 590{"\n"}apartamento 2 - Cascavel/PR</Text>
        <TouchableOpacity>
          <Text style={styles.change}>Trocar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Hoje, 24-34 min</Text>

      <View style={styles.deliveryOptions}>
        <TouchableOpacity
          style={[
            styles.deliveryBox,
            selectedDelivery === "standard" && styles.selectedBox,
          ]}
          onPress={() => setSelectedDelivery("standard")}
        >
          <Text style={styles.deliveryType}>Padrão</Text>
          <Text style={styles.deliveryTime}>Hoje, 24–34 min</Text>
          <Text style={styles.deliveryPrice}>R$ 2,99</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.deliveryBox,
            selectedDelivery === "fast" && styles.selectedBox,
          ]}
          onPress={() => setSelectedDelivery("fast")}
        >
          <Text style={styles.deliveryType}>Rápida</Text>
          <Text style={styles.deliveryTime}>Hoje, 19–29 min</Text>
          <Text style={styles.deliveryPrice}>R$ 9,99</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // Reaproveite os estilos da tela original
});