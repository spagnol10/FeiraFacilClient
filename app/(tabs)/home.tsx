import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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

const API_URL = "http://192.168.0.123:8080/api/v1/product"; // Altere para seu IP local

export default function HomeScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Fruits");

  const navigation = useNavigation();
  const router = useRouter();

  const fetchProducts = async (categoryFilter: string = "", nameFilter: string = "") => {
    try {
      setLoading(true);
      const url = new URL(API_URL);
      url.searchParams.append("companyId", "1"); // Altere conforme necessário
      if (categoryFilter) url.searchParams.append("category", categoryFilter);
      if (nameFilter) url.searchParams.append("name", nameFilter);
      url.searchParams.append("inStock", "true");

      const response = await fetch(url.toString());
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      Alert.alert("Erro", "Não foi possível carregar os produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(activeCategory, searchTerm);
  }, []);

  const openNotifications = () => {
    Alert.alert("Notificações", "Abrindo notificações...");
  };

  const categories = ["Fruits", "Vegetables", "Cereals", "Flowers"];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Delicious{"\n"}food for you</Text>
        <TouchableOpacity onPress={openNotifications}>
          <FontAwesome name="bell" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Discount Card */}
      <View style={styles.discountCard}>
        <View>
          <Text style={styles.discountText}>Get Special Discount</Text>
          <Text style={styles.discountValue}>Up To 50%</Text>
        </View>
        <Image source={require("@/assets/images/logo.png")} style={styles.discountImage} />
      </View>

      {/* Voucher Button */}
      <TouchableOpacity style={styles.voucherButton}>
        <Text style={styles.voucherButtonText}>Claim Voucher</Text>
      </TouchableOpacity>

      {/* Search */}
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

      {/* Categories */}
      <View style={styles.categories}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat} onPress={() => {
            setActiveCategory(cat);
            fetchProducts(cat, searchTerm);
          }}>
            <Text style={[styles.category, activeCategory === cat && styles.categoryActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Products List */}
      {loading ? (
        <ActivityIndicator size="large" color="#00D361" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() => router.push("/(tabs)/carrinho")}
            >
              <Image
                source={{ uri: item.imageBase64 || "https://via.placeholder.com/60" }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price?.toFixed(2)}</Text>
              <Text style={styles.orderText}>Order</Text>
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
    justifyContent: "space-between",
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
    backgroundColor: "#f0f0f0",
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
    color: "#00D361",
    marginTop: 4,
  },
  orderText: {
    marginTop: 4,
    fontSize: 12,
    color: "#00D361",
    fontWeight: "500",
  },
});
