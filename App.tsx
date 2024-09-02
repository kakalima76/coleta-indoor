import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import useCoordenadas from "./src/hooks/useCoordenadas"; // Assumindo que você salvou o hook em um arquivo chamado useCoordenadas.ts
import { Coordenadas } from "./src/interfaces";
import { Picker } from "@react-native-picker/picker";
import Card from "./src/componentes/card";

export default function App() {
  const { coordenadas, bairros, loading, error } = useCoordenadas();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [trechos, setTrechos] = useState<Coordenadas | any>(null);

  useEffect(() => {
    setTrechos(coordenadas?.filter((x) => x.bairro === selectedValue));
  }, [selectedValue]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Escolha um bairro:</Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          style={styles.picker}
        >
          <Picker.Item key={""} label={"selecione"} value={null} />
          {bairros &&
            bairros.map((b: string, index) => (
              <Picker.Item key={index} label={b} value={b} />
            ))}
        </Picker>

        {trechos && <Text style={styles.label}>Selecione um trecho:</Text>}

        {trechos &&
          trechos.map((t: Coordenadas, index: number) => (
            <Card key={index} data={t}></Card>
          ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "20%",
  },
  scrollView: {
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 200,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
  },
});
