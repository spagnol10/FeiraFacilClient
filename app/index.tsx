import { useLogin } from "@/hooks/useLogin";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const {
    email,
    password,
    showPassword,
    setEmail,
    setPassword,
    setShowPassword,
    handleLogin,
    handleForgotPassword,
    handleRegister,
  } = useLogin();

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
          <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.optionsRow}>
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
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 16,
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
