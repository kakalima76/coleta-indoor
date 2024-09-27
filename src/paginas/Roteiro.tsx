import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { TelemetriaContext } from "../contextos";
import moment from "moment-timezone";
import { formatTimestampToSaoPaulo, getDiasColeta } from "./Confirmacao";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { Coords } from "../interfaces";

const firebaseConfig = {
  apiKey: "AIzaSyBh_rk7bHfrr8nmIaGBeVesGasl2TDWeWI",
  authDomain: "igor-e1982.firebaseapp.com",
  databaseURL: "https://igor-e1982-default-rtdb.firebaseio.com",
  projectId: "igor-e1982",
  storageBucket: "igor-e1982.appspot.com",
  messagingSenderId: "341307780086",
  appId: "1:341307780086:web:e3a1d5d5a85c016b4135d7",
  measurementId: "G-JDKZX7M3B3",
};
const app = initializeApp(firebaseConfig);

export function getTimestampSaoPaulo(): number {
  const now = moment.tz("America/Sao_Paulo");
  return now.valueOf();
}

export const RoteiroDetalhes = () => {
  const navigation = useNavigation<any>();
  const context = useContext(TelemetriaContext);
  const [coordsVeiculo, setCoordsVeiculo] = useState<Coords | null>(null);
  const [coordsLocal, setCoordsLocal] = useState<Coords | null>(null);
  const [style, setStyle] = useState("mapbox://styles/mapbox/streets-v11");

  if (!context) {
    throw new Error("Button must be used within a TelemetriaProvider");
  }

  const { roteiro } = context;

  useEffect(() => {
    const db = getDatabase(
      app,
      "https://igor-e1982-default-rtdb.firebaseio.com/"
    );
    const reference = ref(db, `/coordenadas/${roteiro?.id}`);
    console.log(reference);

    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      const { lng_veiculo, lat_veiculo, lat, lng } = data;
      setCoordsLocal({ latitude: lat, longitude: lng });
      setCoordsVeiculo({ latitude: lat_veiculo, longitude: lng_veiculo });
      console.log("Dados atualizados:", data);
    });

    // Limpeza do listener (opcional, mas recomendado)
    return () => {
      off(reference);
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.containerSucesso}>
      <Text style={styles.title}>Detalhes da coleta</Text>

      <Text style={styles.label}>
        <Text style={styles.label}>Hora do sistema: </Text>
        {formatTimestampToSaoPaulo(getTimestampSaoPaulo())}
      </Text>

      <Text style={styles.label}>
        <Text style={styles.label}>Última Atualização: </Text>
        {roteiro?.atualizacao}
      </Text>

      <Text style={styles.label}>
        <Text style={styles.label}>Placa do Veículo: </Text>
        {roteiro?.placa}
      </Text>

      <Text style={styles.label}>
        <Text style={styles.label}>Prefixo: </Text>
        {roteiro?.prefixo}
      </Text>

      <Text style={styles.label}>
        <Text style={styles.label}>Dias: </Text>
        {getDiasColeta(roteiro?.dias)}
      </Text>

      <Text style={styles.label}>
        <Text style={styles.label}>Início: </Text>
        {formatTimestampToSaoPaulo(Number(roteiro?.inicio_timestamp)).substring(
          11
        )}
      </Text>

      <Text style={styles.label}>
        <Text style={styles.label}>Fim: </Text>
        {formatTimestampToSaoPaulo(Number(roteiro?.fim_timestamp)).substring(
          11
        )}
      </Text>

      <Text style={styles.label}>
        <Text style={styles.label}>Fim: </Text>
        {`${coordsLocal?.latitude} ${coordsLocal?.longitude} ${coordsVeiculo?.latitude} ${coordsVeiculo?.longitude}`}
      </Text>

      <Text style={styles.label} onPress={() => navigation.navigate("login")}>
        Sair
      </Text>
    </ScrollView>
  );
};

export default RoteiroDetalhes;
