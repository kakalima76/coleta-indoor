import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/styles";
import { TelemetriaContext } from "../contextos";
import ButtonConfirmar from "../componentes/buttonConfirmar";
import { useNavigation } from "@react-navigation/native";

const Sucesso = () => {
  const navigation = useNavigation<any>(); // Usando useNavigation para obter o objeto de navegação
  return (
    <ScrollView contentContainerStyle={styles.containerSucesso}>
      <Text style={styles.title}>Parabéns</Text>
      <Text style={styles.sucessMessage}>
        Agora, você está habilitado a receber as notificaçoes da sua coleta
        domiciliar indoor.
      </Text>
      <Text
        style={styles.sucessMessage}
        onPress={() => navigation.navigate("login")}
      >
        sair
      </Text>
    </ScrollView>
  );
};

export default Sucesso;
