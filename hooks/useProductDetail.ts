import { Product } from "@/types/Product"; // Se já tiver esse tipo
import { useRouter } from "expo-router";
import { useState } from "react";

export const useProductDetail = (product: Product) => {
  const [quantity, setQuantity] = useState(2);
  const [showCheckout, setShowCheckout] = useState(false);
  const router = useRouter();

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const total = (product.price * quantity).toFixed(2);

  const handleAddToCart = () => {
    setShowCheckout(true);
  };

  const handleCheckout = () => {
    router.push({
      pathname: "/PagamentoScreen",
      params: {
        orderId: "12345", // pode ser gerado dinamicamente depois
        productName: product.name,
        totalPrice: total,
        address: "Rua das Laranjeiras, 123", // também pode vir de outro state/contexto
      },
    });
  };

  const goBack = () => router.back();

  return {
    quantity,
    showCheckout,
    total,
    increment,
    decrement,
    handleAddToCart,
    handleCheckout,
    goBack,
  };
};
