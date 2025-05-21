import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const API_URL = "http://localhost:8080/api/v1/forgot-password";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Validação", "Por favor, preencha o e-mail.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Não foi possível enviar o e-mail de recuperação.");
      }

      Alert.alert(
        "Sucesso",
        "Se o e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/"),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Algo deu errado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.illustration}
        resizeMode="contain"
      />

      <Text style={styles.title}>Esqueci minha senha</Text>
      <Text style={styles.subtitle}>
        Informe seu e-mail para receber as instruções de recuperação.
      </Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="E-mail cadastrado"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity
        style={[styles.registerButton, loading && { opacity: 0.6 }]}
        onPress={handleForgotPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.registerText}>Enviar</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.loginPrompt}>
        Lembrou sua senha?{" "}
        <Text
          style={styles.loginLink}
          onPress={() => router.replace("/")}
        >
          Entrar
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  illustration: {
    width: "100%",
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
    color: "#111",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 48,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  registerButton: {
    backgroundColor: "#008066",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  registerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginPrompt: {
    textAlign: "center",
    color: "#333",
    fontSize: 14,
  },
  loginLink: {
    color: "#008066",
    fontWeight: "600",
  },
});