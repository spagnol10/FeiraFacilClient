import { QrCodeScanner } from "@/components/QrCodeScanner";
import { usePaymentScreen } from "@/hooks/usePaymentScreen";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


export default function PaymentScreen() {
  const { totalPrice } = useLocalSearchParams();
  // Ensure totalPrice is string or number, not array
  const parsedTotalPrice =
    Array.isArray(totalPrice) ? totalPrice[0] : totalPrice;

  const {
    selectedDelivery,
    setSelectedDelivery,
    selectedPayment,
    setSelectedPayment,
    showScanner,
    setShowScanner,
    handleQrScanned,
    finalizePayment,
  } = usePaymentScreen(parsedTotalPrice);

  const basePrice = Number(totalPrice);
  const deliveryCost = selectedDelivery === "fast" ? 9.99 : 0;
  const finalPrice = (basePrice + deliveryCost).toFixed(2);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Finalize seu pedido</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <Text style={[styles.tab, styles.activeTab]}>Entrega</Text>
        <Text style={styles.tab}>Retirada</Text>
      </View>

      {/* Endereço */}
      <View style={styles.addressContainer}>
        <Text style={styles.address}>
          R. Salgado Filho, 590{"\n"}apartamento 2 - Cascavel/PR
        </Text>
        <TouchableOpacity>
          <Text style={styles.change}>Trocar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Hoje, 24-34 min</Text>

      <View style={styles.deliveryOptions}>
        {[
          {
            label: "Padrão",
            time: "Hoje, 24–34 min",
            price: "Grátis",
            value: "standard",
          },
          {
            label: "Rápida",
            time: "Hoje, 19–29 min",
            price: "R$ 9,99",
            value: "fast",
          },
        ].map((option) => (
          <TouchableOpacity
            key={option.label}
            style={[
              styles.deliveryBox,
              selectedDelivery === option.value && styles.selectedBox,
            ]}
            onPress={() => setSelectedDelivery(option.value as any)}
          >
            <Text style={styles.deliveryType}>{option.label}</Text>
            <Text style={styles.deliveryTime}>{option.time}</Text>
            <Text style={styles.deliveryPrice}>{option.price}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Como deseja pagar na entrega?</Text>

      {/* Opções de pagamento */}
      <View style={styles.paymentOptionsList}>
        {[
          "Dinheiro",
          "Cartão de Crédito",
          "Cartão de Débito",
          "Vale Refeição",
          "Vale Alimentação",
          "Pix",
        ].map((label) => (
          <TouchableOpacity
            key={label}
            style={[
              styles.paymentOptionRow,
              selectedPayment === label.toLowerCase() && styles.selectedBox,
            ]}
            onPress={() => setSelectedPayment(label.toLowerCase() as any)}
          >
            <Text style={styles.paymentLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.finishPayment} onPress={finalizePayment}>
        <Text style={styles.paymentButtonText}>Finalizar pedido {finalPrice} </Text>
      </TouchableOpacity>

      <QrCodeScanner
        visible={showScanner}
        onClose={() => setShowScanner(false)}
        onScanned={handleQrScanned}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  tab: {
    fontSize: 16,
    color: "#999",
    marginRight: 20,
  },
  activeTab: {
    color: "#00D361",
    fontWeight: "bold",
  },
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  deliveryOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  deliveryBox: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedBox: {
    borderColor: "#00D361",
    backgroundColor: "#eafff2",
  },
  deliveryType: {
    fontWeight: "bold",
    color: "#333",
  },
  deliveryTime: {
    color: "#666",
    fontSize: 14,
  },
  deliveryPrice: {
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  paymentOptionsList: {
    marginBottom: 30,
  },
  paymentOptionRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  finishPayment: {
    backgroundColor: "#00D361",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});