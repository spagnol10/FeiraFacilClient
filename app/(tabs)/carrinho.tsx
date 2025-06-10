import { useProductDetail } from "@/hooks/useProductDetail";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const product = {
  name: "Banana",
  price: 9.22,
  image: require("@/assets/images/banana.png"),
  description: "Your internet connection is currently not available please check or try again.",
};

export default function ProductDetailScreen() {
  const {
    quantity,
    showCheckout,
    total,
    increment,
    decrement,
    handleAddToCart,
    handleCheckout,
    goBack,
  } = useProductDetail(product.price);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goBack}>
          <FontAwesome name="chevron-left" size={24} />
        </TouchableOpacity>
        <FontAwesome name="heart-o" size={24} />
      </View>

      <Image source={product.image} style={styles.productImage} resizeMode="contain" />

      <View style={styles.infoContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>R${product.price.toFixed(2)}</Text>
        </View>

        <Text style={styles.descriptionLabel}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.cartRow}>
          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={decrement} style={styles.counterButton}>
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={increment} style={styles.counterButton}>
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Adicionar</Text>
            <Text style={styles.totalPrice}>R${total}</Text>
          </TouchableOpacity>
        </View>

        {showCheckout && (
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Finalizar Compra</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  productImage: {
    width: "100%",
    height: 220,
    marginVertical: 20,
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 8,
    color: "#444",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 8,
  },
  cartRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  counterButton: {
    padding: 8,
  },
  counterText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 12,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#00D361",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
    marginRight: 10,
  },
  totalPrice: {
    color: "#fff",
    fontWeight: "600",
  },
  bottomTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    backgroundColor: "#fff",
  },
  checkoutButton: {
    backgroundColor: "#FF6F00",
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
