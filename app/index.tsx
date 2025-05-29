import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const API_URL = 'http://localhost:8080/api/v1/auth';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("wrospagnol@gmail.com");
  const [password, setPassword] = useState("123456");
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
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
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

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.illustration}
        resizeMode="contain"
      />

      <Text style={styles.title}>Bem-vindo ao FeiraFácil</Text>
      <Text style={styles.subtitle}>Faça login para acessar sua conta</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome
            name={showPassword ? "eye" : "eye-slash"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.optionsRow}>
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            size={18}
            fillColor="#008066"
            unFillColor="#fff"
            iconStyle={{ borderColor: "#008066" }}
            isChecked={agreeTerms}
            onPress={(checked: boolean) => setAgreeTerms(checked)}
          />
          <Text style={styles.checkboxText}>
            <Text style={styles.termsLink}>Termos e Condições</Text>.
          </Text>
        </View>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.registerPrompt}>
        Não tem uma conta?{" "}
        <Text style={styles.registerLink} onPress={handleRegister}>
          Cadastre-se agora
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
    fontSize: 26,
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
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  loginButton: {
    backgroundColor: "#008066",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerPrompt: {
    textAlign: "center",
    color: "#333",
    fontSize: 14,
  },
  registerLink: {
    color: "#008066",
    fontWeight: "600",
  },
  optionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,            
    flexWrap: "wrap", 
  },
  checkboxText: {
    marginLeft: 8,
    color: "#555",
    flexShrink: 1,
    flexWrap: "wrap",
    fontSize: 10,
  },
  termsLink: {
    color: "#008066",
    textDecorationLine: "underline",
  },

  forgotPasswordText: {
    color: "#008066",
    fontWeight: "600",
    fontSize: 12,
  },
});
