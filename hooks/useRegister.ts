import { preRegister } from "@/services/authService";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useRegister = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (user: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
  }) => {
    setLoading(true);

    try {
      await preRegister(user);
      Alert.alert("Sucesso", "Pré-registro realizado com sucesso!");
      router.push("/");
    } catch (error: any) {
      console.error("Erro no registro:", error);
      // Alert.alert("Erro", error.message || "Falha no pré-registro.");
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading };
};