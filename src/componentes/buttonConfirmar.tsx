import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles/styles";
import * as Notifications from "expo-notifications";
import { TelemetriaContext } from "../contextos";
import { Coordenadas, ISubscritionExpoNotification } from "../interfaces";
import { useNavigation } from "@react-navigation/native";
import {
  RealTimeDatabaseSubscriptionService,
  SubscriptionService,
} from "../servicos";

const _service = new RealTimeDatabaseSubscriptionService();
const service = new SubscriptionService(_service);

const ButtonConfirmar = () => {
  const context = useContext(TelemetriaContext);
  const navigation = useNavigation<any>(); // Usando useNavigation para obter o objeto de navegação

  if (!context) {
    throw new Error("Button must be used within a TelemetriaProvider");
  }

  const { token, trechoColeta, user } = context;

  const handlePressButton = async () => {
    const _subscription: ISubscritionExpoNotification = {
      token,
      roteiroId: trechoColeta!.id,
      email: user,
    };
    await service.add(_subscription, user || "");
    navigation.navigate("sucesso"); // Navegando para a tela "sucesso"
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePressButton}>
      <Text style={styles.buttonText}>Realizar inscrição</Text>
    </TouchableOpacity>
  );
};

export default ButtonConfirmar;
