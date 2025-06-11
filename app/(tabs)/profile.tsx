import CustomButton from '@/components/CustomButton';
import Header from '@/components/Header';
import InputWithIcon from '@/components/InputWithIcon';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const { user, setUser, loading, saveUser } = useUserProfile();
  const navigation = useNavigation();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Sair", "Você deseja sair do app?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => router.push("/"),
      },
    ]);
  };

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permissão negada', 'É necessário permitir acesso à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUser({ ...user, avatar: result.assets[0].uri });
    }
  };

  const openNotifications = () => {
    Alert.alert("Notificações", "Abrindo notificações...");
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (loading) return <ThemedText type="title">Carregando...</ThemedText>;

  return (
    <ThemedView style={styles.container}>
      <Header
        userName={user.name}
        onBackPress={goBack}
        onNotificationsPress={openNotifications}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleImagePick}>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <Ionicons name="person-circle-outline" size={100} color="white" style={styles.avatar} />
          )}
        </TouchableOpacity>
      </View>

      <InputWithIcon
        label="Nome"
        value={user.name}
        onChangeText={(text) => setUser({ ...user, name: text })}
        placeholder="Nome"
        iconName="person-outline"
      />

      <InputWithIcon
        label="Email"
        value={user.email}
        placeholder="E-mail"
        iconName="mail-outline"
        keyboardType="email-address"
      />

      <InputWithIcon
        label="Senha"
        value={user.password}
        onChangeText={(text) => setUser({ ...user, password: text })}
        placeholder="Senha"
        iconName="lock-closed-outline"
        secureTextEntry
      />

      <View style={{ width: '100%', marginTop: 20 }}>
        <CustomButton title="Salvar" onPress={saveUser} />
      </View>

      <View style={{ width: '100%', marginTop: 20 }}>
        <CustomButton title="Sair" onPress={handleLogout} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: -100,
    alignSelf: "center",
  },
});