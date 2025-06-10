import { useRouter } from "expo-router";
import { useState } from "react";

export const useProductDetail = (productPrice: number) => {
  const [quantity, setQuantity] = useState(2);
  const [showCheckout, setShowCheckout] = useState(false);
  const router = useRouter();

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const total = (productPrice * quantity).toFixed(2);

  const handleAddToCart = () => {
    // Adiciona ao carrinho
    setShowCheckout(true);
  };

  const handleCheckout = () => {
    router.push("/PagamentoScreen");
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