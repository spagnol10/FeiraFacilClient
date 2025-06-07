import { authService } from "@/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("wrospagnol@gmail.com");
  const [password, setPassword] = useState("1234567");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    const loadRememberedEmail = async () => {
      const storedEmail = await AsyncStorage.getItem("rememberedEmail");
      if (storedEmail) {
        setEmail(storedEmail);
        setRememberMe(true);
      }
    };
    loadRememberedEmail();
  }, []);

  const handleLogin = async () => {
    try {
      const userData = await authService.login(email, password);

      if (rememberMe) {
        await AsyncStorage.setItem("rememberedEmail", email);
      } else {
        await AsyncStorage.removeItem("rememberedEmail");
      }

      Alert.alert("Sucesso", "Login bem-sucedido!");
      router.push("/(tabs)/home");

    } catch (error: any) {
      console.warn("API falhou:", error.message);
      Alert.alert("Erro", error.message || "Não foi possível conectar.");
    }
  };

  const handleForgotPassword = () => {
    router.push("/ForgotPassword");
  };

  const handleRegister = () => {
    router.push("/RegisterScreen");
  };

  return {
    email,
    password,
    rememberMe,
    showPassword,
    agreeTerms,
    setEmail,
    setPassword,
    setRememberMe,
    setShowPassword,
    setAgreeTerms,
    handleLogin,
    handleForgotPassword,
    handleRegister,
  };
};