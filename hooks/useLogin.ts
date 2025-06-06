// src/hooks/useLogin.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const API_URL = 'http://localhost:8080/api/v1/auth';

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
    if (!agreeTerms) {
      Alert.alert("Atenção", "Você deve aceitar os termos para continuar.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Erro", errorData.message || "Usuário não encontrado");
        return;
      }

      const userData = await response.json();

      if (rememberMe) {
        await AsyncStorage.setItem("rememberedEmail", email);
      } else {
        await AsyncStorage.removeItem("rememberedEmail");
      }

      Alert.alert("Sucesso", "Login bem-sucedido!");
      router.push("/(tabs)/home");

    } catch (error: any) {
      console.warn("API falhou:", error.message);
      Alert.alert("Erro", "Não foi possível conectar. Tente novamente.");
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