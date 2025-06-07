import { sendForgotPasswordEmail } from "@/services/authService";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export function useForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Validação", "Por favor, preencha o e-mail.");
      return;
    }

    try {
      setLoading(true);
      await sendForgotPasswordEmail(email);

      Alert.alert(
        "Sucesso",
        "Se o e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.",
        [
          {
            text: "OK",
            onPress: () =>
              router.push({ pathname: "/ResetPassword", params: { email } }),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao enviar e-mail.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    loading,
    handleForgotPassword,
  };
}