import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useProducts } from "../../hooks/useProducts";

export default function HomeScreen() {
  const router = useRouter();
  const { products, loading, activeCategory, searchTerm, setSearchTerm, setActiveCategory, fetchProducts } =
    useProducts();

  const openNotifications = () => {
    Alert.alert("Notificações", "Abrindo notificações...");
  };

  const categories = ["Fruits", "Vegetables", "Cereals", "Flowers"];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openNotifications}>
          <FontAwesome name="bell-o" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={18} color="#888" />
        <TextInput
          placeholder="Search Fruits, Vegetables"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={() => fetchProducts(activeCategory, searchTerm)}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.categories}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => {
              setActiveCategory(cat);
              fetchProducts(cat, searchTerm);
            }}
          >
            <Text style={[styles.category, activeCategory === cat && styles.categoryActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00D361" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() => router.push("/(tabs)/carrinho")}>
              <Image 
              source={{ uri: item.imageBase64 || "https://via.placeholder.com/60" }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>R${item.price?.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        />
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#00D361" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() => router.push("/(tabs)/carrinho")}>
              <Image 
              source={{ uri: item.imageBase64 || "https://via.placeholder.com/60" }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>R${item.price?.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        />
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#00D361" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() => router.push("/(tabs)/carrinho")}>
              <Image 
              source={{ uri: item.imageBase64 || "https://via.placeholder.com/60" }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>R${item.price?.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  discountCard: {
    flexDirection: "row",
    backgroundColor: "#00D361",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  discountText: {
    color: "#fff",
    fontSize: 16,
  },
  discountValue: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  discountImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  voucherButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
    borderRadius: 5,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#00D361",
  },
  voucherButtonText: {
    color: "#00D361",
    fontSize: 16,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  categories: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  category: {
    fontSize: 16,
    fontWeight: "500",
    color: "#888",
  },
  categoryActive: {
    color: "#00D361",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  productList: {
    paddingVertical: 10,
  },
  productCard: {
    flexDirection: "column",
    // height: 140,
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: 140,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ddd",
  },
  productName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  orderText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
  },
});
