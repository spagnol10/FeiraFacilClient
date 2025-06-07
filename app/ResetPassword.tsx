// screens/ResetPassword.tsx
import { useResetPassword } from "@/hooks/useResetPassword";
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

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.illustration}
        resizeMode="contain"
      />
      <Text style={styles.title}>Redefinir Senha</Text>
      <Text style={styles.subtitle}>Digite sua nova senha abaixo.</Text>

      <TextInput style={styles.input} value={email} editable={false} placeholderTextColor="#999" />
      <TextInput
        style={styles.input}
        placeholder="Nova senha"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar nova senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

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
  illustration: {
    width: "100%",
    height: 180,
    marginBottom: 20,
  },
});