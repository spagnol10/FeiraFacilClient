import { MaterialIcons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type RootStackParamList = {
  PaymentSuccess: {
    orderId: string;
    deliveryType: string;
    paymentMethod: string;
    totalPrice: string;
    address: string;
  };
  OrderTracking: { orderId: string };
};

type PaymentSuccessScreenRouteProp = RouteProp<RootStackParamList, 'PaymentSuccess'>;

const PaymentSuccessScreen = () => {
  const route = useRoute<PaymentSuccessScreenRouteProp>();
  const router = useRouter();

  const { orderId, deliveryType, paymentMethod, totalPrice, address } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.successBox}>
        <MaterialIcons name="check-circle" size={100} color="#4CAF50" />
        <View style={styles.qrBox}>
          <QRCode value={`https://meusite.com/pedidos/${orderId}`} size={120} />
        </View>
      </View>

      <Text style={styles.orderTitle}>Pedido #{orderId} Confirmado!</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Tipo de entrega:</Text>
        <Text style={styles.infoValue}>{deliveryType}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Forma de pagamento:</Text>
        <Text style={styles.infoValue}>{paymentMethod}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Valor total:</Text>
        <Text style={styles.infoValue}>R$ {totalPrice}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Endereço:</Text>
        <Text style={styles.infoValue}>{address}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(tabs)/history")}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Verificar Histórico</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f6f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 30,
    gap: 30,
  },
  qrBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
  },
  orderTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 4,
  },
  button: {
    marginTop: 40,
    backgroundColor: '#4CAF50',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 6,
    shadowColor: '#388e3c',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
