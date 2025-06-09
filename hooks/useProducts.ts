import { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const API_URL = "http://localhost:8080/api/v1/product";

export const useProducts = (initialCategory: string = "Fruits", initialSearch: string = "") => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const fetchProducts = async (categoryFilter = activeCategory, nameFilter = searchTerm) => {
    try {
      setLoading(true);
      const url = new URL(API_URL);
      url.searchParams.append("companyId", "bf1839dc-989b-49d1-ae6a-2913f5895c71");
      if (categoryFilter) url.searchParams.append("category", categoryFilter.toUpperCase());
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
    fetchProducts();
  }, []);

  const updateCategory = (category: string) => {
    setActiveCategory(category);
    fetchProducts(category, searchTerm);
  };

  const updateSearch = (search: string) => {
    setSearchTerm(search);
    fetchProducts(activeCategory, search);
  };

  return {
    products,
    loading,
    activeCategory,
    searchTerm,
    setSearchTerm,
    updateCategory,
    updateSearch,
  };
};