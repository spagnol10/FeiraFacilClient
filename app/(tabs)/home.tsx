import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

// function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
//   return <FontAwesome size={18} style={{ marginBottom: -3 }} {...props} />;
// }

// const ProductCard = ({ product, onPress }: { product: Product; onPress: () => void }) => (
//   <TouchableOpacity onPress={onPress} style={styles.productCard}>
//     <Image source={{ uri: product.imageBase64 }} style={styles.productImage} />
//     <Text style={styles.productName}>{product.name}</Text>
//     <Text style={styles.productPrice}>{product.price}</Text>
//   </TouchableOpacity>
// );

const API_URL = "http://localhost:8080/products";

export default function HomeScreen() {
  // const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const router = useRouter();

  // const [user] = useState(mockUser);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      // setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos da API, usando mock:", error);
      // setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openNotifications = () => {
    Alert.alert("Notificações", "Abrindo notificações...");
  };

  const openMenu = () => {
    Alert.alert("Menu", "Abrindo menu lateral...");
  };

  return (
    <View style={styles.container}>
      {/* Usa nome do mockUser no header */}
      {/* <Header userName={user.name} onBackPress={openMenu} onNotificationsPress={openNotifications} /> */}

      <View style={{ marginTop: 100 }}>
        <Text style={styles.title}>Delicious food for you</Text>

        <View style={styles.discountCard}>
          <View>
            <Text style={styles.discountText}>A special discount</Text>
            <Text style={styles.discountValue}>Up to 50%</Text>
          </View>
          <Image source={require("@/assets/images/logo.png")} style={styles.discountImage} />
        </View>

        <TouchableOpacity style={styles.voucherButton}>
          <Text style={styles.voucherButtonText}>Claim voucher</Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={18} color="#888" />
          <TextInput placeholder="Search..." style={styles.searchInput} />
        </View>

        <View style={styles.categories}>
          <Text style={styles.category}>Fruits</Text>
          <Text style={styles.category}>Vegetables</Text>
          <Text style={styles.category}>Fairs</Text>
        </View>

        {/* {loading ? (
          <ActivityIndicator size="large" color="#00D361" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() => router.push("/(tabs)/carrinho")}
              />
            )}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            horizontal
            contentContainerStyle={styles.productList}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          />
        )} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
  },
  discountCard: {
    flexDirection: "row",
    backgroundColor: "#00D361",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  discountText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "300",
  },
  discountValue: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  discountImage: {
    width: 80,
    height: 80,
    marginLeft: 16,
    borderRadius: 8,
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
    justifyContent: "space-between",
    marginBottom: 16,
  },
  category: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
  },
  productList: {
    paddingVertical: 10,
  },
  productCard: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    width: 120,
    marginRight: 12,
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
    fontWeight: "bold",
    textAlign: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 4,
  },
});
