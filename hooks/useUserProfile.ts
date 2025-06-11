import { fetchUser, updateUser } from "@/services/userService";
import { User } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useUserProfile = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);

        const token = await AsyncStorage.getItem("token");
        console.log(token);
        if (!token) throw new Error("Token não encontrado");

        const userData = await fetchUser(token);
        setUser({
          name: userData.name || "",
          email: userData.email || "",
          password: "",
          avatar: userData.avatar || "",
        });
      } catch (error) {
        console.log("Erro ao carregar usuário:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const saveUser = async () => {
    try {
      setLoading(true);
      await updateUser(user);
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    } catch (error) {
      console.log("Erro ao salvar perfil:", error);
      Alert.alert("Erro", "Erro ao salvar o perfil.");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    setUser,
    loading,
    saveUser,
  };
};