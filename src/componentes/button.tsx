import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles/styles";
import * as Notifications from "expo-notifications";
import { TelemetriaContext } from "../contextos";
import { Coordenadas } from "../interfaces";
import { useNavigation } from "@react-navigation/native";

interface ButtonProps {
  trecho: Coordenadas;
}

const Button: React.FC<ButtonProps> = ({ trecho }) => {
  const context = useContext(TelemetriaContext);
  const navigate = useNavigation<any>();

  if (!context) {
    throw new Error("Button must be used within a TelemetriaProvider");
  }

  const { setToken, setTrechoColeta } = context;

  const handlePressButton = async () => {
    await registerForPushNotificationsAsync();
  };

  async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission for notifications was denied");
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    setToken(token);
    setTrechoColeta(trecho);
    navigate.navigate("sucesso");
  }

  return (
    <TouchableOpacity style={styles.button} onPress={() => handlePressButton()}>
      <Text style={styles.buttonText}>escolher</Text>
    </TouchableOpacity>
  );
};

export default Button;
