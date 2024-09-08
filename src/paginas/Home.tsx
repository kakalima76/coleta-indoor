import React, { useContext, useEffect, useRef } from "react";
import { Text, ScrollView } from "react-native";
import styles from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { TelemetriaContext } from "../contextos";
import Constants from "expo-constants";

const Home = () => {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const context = useContext(TelemetriaContext);
  const navigate = useNavigation<any>();

  if (!context) {
    throw new Error("Button must be used within a TelemetriaProvider");
  }

  const { setPayload, payload } = context;

  return (
    <ScrollView contentContainerStyle={styles.containerSucesso}>
      <Text style={styles.titleColeta}>Página Principal</Text>
      <Text style={styles.titleColeta}>{`${payload?.toString()}`}</Text>
    </ScrollView>
  );
};

export default Home;
