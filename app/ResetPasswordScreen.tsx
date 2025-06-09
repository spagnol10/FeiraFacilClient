import { useResetPassword } from "@/hooks/useResetPassword";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ResetPassword() {
  const { token } = useLocalSearchParams<{ token: string }>();
  const [email] = useState<string>("wrospagnol@gmail.com");

  const {
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    loading,
    handleResetPassword,
  } = useResetPassword(email, token || "");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.illustration}
        resizeMode="contain"
      />
      <Text style={styles.title}>Redefinir Senha</Text>
      <Text style={styles.subtitle}>Digite sua nova senha abaixo.</Text>

      <TextInput
        style={[styles.input, { color: "#888" }]}
        value={email}
        editable={false}
        placeholderTextColor="#999"
      />

      {/* Campo Nova Senha */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Nova senha"
          secureTextEntry={!showNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
          <FontAwesome name={showNewPassword ? "eye" : "eye-slash"} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Campo Confirmar Nova Senha */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Confirmar nova senha"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <FontAwesome name={showConfirmPassword ? "eye" : "eye-slash"} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleResetPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.buttonText}>Redefinir</Text>
            <MaterialIcons name="lock-reset" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </>
        )}
      </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#111",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
  },
  illustration: {
    width: "100%",
    height: 180,
    marginBottom: 20,
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
  inputField: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  input: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 48,
    marginBottom: 14,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#008066",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});