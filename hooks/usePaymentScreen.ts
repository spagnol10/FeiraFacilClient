// hooks/usePaymentScreen.ts
import { Camera, CameraCapturedPicture } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";

export function usePaymentScreen() {
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
    router.push("/VendaRealizadaScreen");
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