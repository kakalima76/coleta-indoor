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
import moment from 'moment-timezone';

export function formatTimestampToSaoPaulo(timestamp: number): string {
  const date = moment.tz(timestamp, "America/Sao_Paulo");
  return date.format("DD:MM:YYYY HH:mm:ss");
}

export function getDiasColeta(aux: any) {
  const diasDaSemana: string[] = [
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado",
  ];
  const response: string[] = [];


  for (let dia of aux) {
    response.push(diasDaSemana[Number(dia)]);
  }

  return response.toString().replaceAll(",", ", ");
}

const Confirmar = () => {
  const contexto = useContext(TelemetriaContext);
  const [isChecked, setIsChecked] = useState(false); // Estado da checkbox

  if (!contexto) {
    throw new Error("Button must be used within a TelemetriaProvider");
  }

  const { trechoColeta, user } = contexto;

  return (
    <ScrollView contentContainerStyle={styles.containerSucesso}>
      <Text style={styles.titleColeta}>Dados da coleta</Text>
      <Text style={styles.label}>{`Usuário ${user}`}</Text>
      <Text style={styles.label}>Bairro: {trechoColeta?.bairro}</Text>
      <Text style={styles.label}>Logradouro: {trechoColeta?.logradouro}</Text>
      <Text style={styles.label}>Roteiro: {trechoColeta?.roteiro}</Text>
      <Text style={styles.label}>
        Dias: {`${getDiasColeta(trechoColeta?.dias || "")}`}
      </Text>
      <Text style={styles.label}>Início: {formatTimestampToSaoPaulo(Number(trechoColeta?.inicio_timestamp))}</Text>
      <Text style={styles.label}>Término: {formatTimestampToSaoPaulo(Number(trechoColeta?.fim_timestamp))}</Text>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setIsChecked(!isChecked)}
        >
          {isChecked && <Ionicons name="checkmark" size={18} color="white" />}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>
          Desejo realizar a inscrição no serviço de coleta indoor e autorizo o
          envio de notificações quando da aproximação do veículo de coleta do
          meu trecho de rua.
        </Text>
      </View>

      {isChecked && (
        <>
          <ButtonConfirmar />
        </>
      )}
    </ScrollView>
  );
};

export default Confirmar;
