import { mockUser } from "@/mock/mockUser";
import { fetchUser, updateUser } from "@/services/userService";
import { User } from "@/types/User";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useUserProfile = () => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    phone: '',
    password: '',
    avatar: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(user.email)
      .then(setUser)
      .catch((error) => {
        console.error("Erro ao buscar usuário, usando mock:", error);
        setUser(mockUser);
      })
      .finally(() => setLoading(false));
  }, []);

  const saveUser = async () => {
    try {
      await updateUser(user);
      Alert.alert("Sucesso", "Dados atualizados com sucesso.");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  return {
    user,
    setUser,
    loading,
    saveUser,
  };
};