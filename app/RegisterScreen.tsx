import FormInput from "@/components/FormInput";
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
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const API_URL = 'http://localhost:8080/api/v1/user/pre';

export default function RegisterScreen() {
  const [name, setName] = useState<string>("Wellynton Spagnol");
  const [email, setEmail] = useState<string>("wrospagnol@gmail.com");
  const [phone, setPhone] = useState<string>("45991558558");
  const [password, setPassword] = useState<string>("123456");
  const [role, setRole] = useState<string>("CUSTOMER");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const validateForm = () => {
    if (!name || !email || !phone || !password) {
      Alert.alert("Validação", "Por favor, preencha todos os campos.");
      return false;
    }
    if (!agreeTerms) {
      Alert.alert("Validação", "Você deve concordar com os Termos e Condições.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const dto = { name, email, phone, password, role };
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "localKey": "Basic Q0hBVkVfUEFSQV9URVNURVNfTE9DQUlTOkZFSVJBX0ZBQ0lMX1NJTklTVFJB",
        },
        body: JSON.stringify(dto),
      });

      if (response.status === 201) {
        Alert.alert("Sucesso", "Pré-registro realizado com sucesso!");
        router.push("/");
      } else {
        const errorText = await response.text();
        console.log("URL:", response.url);
        console.log("Status:", response.status);
        console.log("Erro:", errorText);

        Alert.alert("Erro", `Falha no pré-registro: ${errorText}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
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

      <Text style={styles.title}>Registre-se</Text>
      <Text style={styles.subtitle}>Crie sua conta gratuitamente.</Text>

      <FormInput
        icon="user"
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
      />
      <FormInput
        icon="envelope"
        placeholder="E-mail válido"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <FormInput
        icon="phone"
        placeholder="Número de telefone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <FormInput
        icon="lock"
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        rightIcon={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome
              name={showPassword ? "eye" : "eye-slash"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        }
      />

      <View style={styles.checkboxRow}>
        <BouncyCheckbox
          size={14}
          fillColor="#008066"
          unFillColor="#FFF"
          iconStyle={{ borderColor: "#008066" }}
          isChecked={agreeTerms}
          onPress={(checked: boolean) => setAgreeTerms(checked)}
        />
        <Text style={styles.termsText}>
          Você concorda com nossos{" "}
          <Text style={styles.termsLink}>Termos e Condições</Text>.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.registerButton, loading && { opacity: 0.6 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.registerText}>Registrar</Text>
            <MaterialIcons
              name="arrow-forward"
              size={20}
              color="#fff"
              style={{ marginLeft: 8 }}
            />
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.loginPrompt}>
        Já possui uma conta?{" "}
        <Text style={styles.loginLink} onPress={() => router.push("/")}>
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
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    flexWrap: "wrap",
  },
  termsText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    color: "#444",
  },
  termsLink: {
    color: "#008066",
    fontWeight: "600",
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