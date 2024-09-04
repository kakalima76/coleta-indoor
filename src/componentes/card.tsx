import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Coordenadas } from "../interfaces";
import Button from "./button";

interface CardProps {
  data: Coordenadas;
}

const handlePress = () => {
  console.log("Botão pressionado");
};

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{data.logradouro}</Text>
        <Text style={styles.cardTitle}>{`(Lado ${data.lado})`}</Text>
        <Text style={styles.cardSubTitle}>Entre</Text>
        <Text style={styles.cardDescription}>{data.inicio}</Text>
        <Text style={styles.cardTitleBotton}>E</Text>
        <Text style={styles.cardDescription}>{data.fim}</Text>
        <Button trecho={data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardSubTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#6c757d",
  },
  cardTitleBotton: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Card;
