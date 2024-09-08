import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles/styles";
import * as Notifications from "expo-notifications";
import { TelemetriaContext } from "../contextos";
import { Coordenadas } from "../interfaces";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

interface ButtonProps {
  trecho: Coordenadas;
}

const Button: React.FC<ButtonProps> = ({ trecho }) => {
  const context = useContext(TelemetriaContext);
  const navigation = useNavigation<any>();

  if (!context) {
    throw new Error("Button must be used within a TelemetriaProvider");
  }

  const { setToken, setTrechoColeta } = context;

  const handlePressButton = async () => {
    await registerForPushNotificationsAsync();
    navigation.navigate("confirmar");
  };

  async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission for notifications was denied");
      return;
    }

    const { expoConfig } = Constants;
    const extra = expoConfig!.extra;
    const eas = extra!.eas;
    const projectId = eas!.projectId;

    const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
      .data;

    setToken(token);
    setTrechoColeta(trecho);
  }

  return (
    <TouchableOpacity style={styles.button} onPress={() => handlePressButton()}>
      <Text style={styles.buttonText}>escolher</Text>
    </TouchableOpacity>
  );
};

export default Button;
