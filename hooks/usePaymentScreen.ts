import { Camera, CameraCapturedPicture } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";

export function usePaymentScreen(totalPrice: number | string) {
  const [selectedDelivery, setSelectedDelivery] = useState<"standard" | "fast">("standard");
  const [selectedPayment, setSelectedPayment] = useState<"pix" | "card" | null>("pix");
  const [showCardTypeModal, setShowCardTypeModal] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showScanner, setShowScanner] = useState(false);

  const cameraRef = useRef<CameraCapturedPicture | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleQrScanned = (data: string) => {
    Alert.alert("Código Pix escaneado!", data);
  };

  const finalizePayment = () => {
    const deliveryFee = selectedDelivery === "fast" ? 9.99 : 0;

    const parsedTotal = typeof totalPrice === "string" ? parseFloat(totalPrice) : totalPrice;
    const finalPrice = (parsedTotal + deliveryFee).toFixed(2);

    router.push({
      pathname: '/VendaRealizadaScreen',
      params: {
        orderId: '12345', // ou o que for gerado dinamicamente
        paymentMethod: selectedPayment,
        deliveryType: selectedDelivery,
        address: 'R. Salgado Filho, 590, ap 2 - Cascavel/PR',
        totalPrice: finalPrice,
      },
    });
  };

  return {
    selectedDelivery,
    setSelectedDelivery,
    selectedPayment,
    setSelectedPayment,
    showCardTypeModal,
    setShowCardTypeModal,
    hasPermission,
    showScanner,
    setShowScanner,
    handleQrScanned,
    finalizePayment,
  };
}
