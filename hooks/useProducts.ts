// hooks/useProducts.ts
import { useCallback, useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/v1/product";

const mockProducts = [
  // Fruits
  { id: 1, name: "Banana", price: 3.5, category: "Fruits", imageBase64: "https://cdn.awsli.com.br/600x450/502/502061/produto/18364412/8aaa8433f9.jpg" },
  { id: 2, name: "Maçã", price: 4.2, category: "Fruits", imageBase64: "https://superprix.vteximg.com.br/arquivos/ids/175207-600-600/Maca-Argentina--1-unidade-aprox.-200g-.png?v=636294203590200000" },
  { id: 3, name: "Uva", price: 6.0, category: "Fruits", imageBase64: "https://superprix.vteximg.com.br/arquivos/ids/179168-600-600/Uva-Vitoria-Bandeja-773417.png?v=636970945188000000" },

  { id: 13, name: "Banana", price: 3.5, category: "Fruits", imageBase64: "https://cdn.awsli.com.br/600x450/502/502061/produto/18364412/8aaa8433f9.jpg" },
  { id: 14, name: "Maçã", price: 4.2, category: "Fruits", imageBase64: "https://superprix.vteximg.com.br/arquivos/ids/175207-600-600/Maca-Argentina--1-unidade-aprox.-200g-.png?v=636294203590200000" },
  { id: 15, name: "Uva", price: 6.0, category: "Fruits", imageBase64: "https://superprix.vteximg.com.br/arquivos/ids/179168-600-600/Uva-Vitoria-Bandeja-773417.png?v=636970945188000000" },

  // Vegetables
  { id: 4, name: "Alface", price: 2.0, category: "Vegetables", imageBase64: "https://via.placeholder.com/60?text=Alface" },
  { id: 5, name: "Cenoura", price: 3.0, category: "Vegetables", imageBase64: "https://via.placeholder.com/60?text=Cenoura" },
  { id: 6, name: "Tomate", price: 3.5, category: "Vegetables", imageBase64: "https://via.placeholder.com/60?text=Tomate" },

  // Cereals
  { id: 7, name: "Arroz", price: 5.5, category: "Cereals", imageBase64: "https://via.placeholder.com/60?text=Arroz" },
  { id: 8, name: "Feijão", price: 6.2, category: "Cereals", imageBase64: "https://via.placeholder.com/60?text=Feijão" },
  { id: 9, name: "Aveia", price: 4.0, category: "Cereals", imageBase64: "https://via.placeholder.com/60?text=Aveia" },

  // Flowers
  { id: 10, name: "Rosa", price: 7.0, category: "Flowers", imageBase64: "https://via.placeholder.com/60?text=Rosa" },
  { id: 11, name: "Girassol", price: 8.0, category: "Flowers", imageBase64: "https://via.placeholder.com/60?text=Girassol" },
  { id: 12, name: "Lírio", price: 9.5, category: "Flowers", imageBase64: "https://via.placeholder.com/60?text=Lírio" },
];

export function useProducts(initialCategory: string = "Fruits", initialName: string = "") {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialName);

  const fetchProducts = useCallback(async (categoryFilter = activeCategory, nameFilter = searchTerm) => {
    try {
      setLoading(true);
      const url = new URL(API_URL);
      url.searchParams.append("companyId", "1");
      if (categoryFilter) url.searchParams.append("category", categoryFilter);
      if (nameFilter) url.searchParams.append("name", nameFilter);
      url.searchParams.append("inStock", "true");

      const response = await fetch(url.toString());
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      const filtered = mockProducts.filter(
        (p) =>
          (!categoryFilter || p.category === categoryFilter) &&
          (!nameFilter || p.name.toLowerCase().includes(nameFilter.toLowerCase()))
      );
      setProducts(filtered);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    activeCategory,
    searchTerm,
    setSearchTerm,
    setActiveCategory,
    fetchProducts,
  };
}