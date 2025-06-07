import { authService } from "@/services/authService";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useResetPassword = (email: string, token: string) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Validação", "Preencha todos os campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Validação", "As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);
      await authService.resetPassword(email, newPassword, token);
      Alert.alert("Sucesso", "Senha redefinida com sucesso!", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Algo deu errado.");
    } finally {
      setLoading(false);
    }
  };

  return {
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    loading,
    handleResetPassword,
  };
};