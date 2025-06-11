import { login } from "@/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useLogin = () => {
  const router = useRouter();

  const [email, setEmail] = useState("wrospagnol@gmail.com");
  const [password, setPassword] = useState("123456");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const userData = await login(email, password);
      
      await AsyncStorage.setItem("token", userData.token);

      if (rememberMe) {
        await AsyncStorage.setItem("rememberedEmail", email);
      } else {
        await AsyncStorage.removeItem("rememberedEmail");
      }

      router.push("/(tabs)/home");
    } catch (error: any) {
      console.log("Erro ao fazer login:", error);
      Alert.alert("Erro", error.message || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => router.push("/ForgotPassword");
  const handleRegister = () => router.push("/RegisterScreen");

  return {
    email,
    password,
    rememberMe,
    showPassword,
    agreeTerms,
    loading,
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