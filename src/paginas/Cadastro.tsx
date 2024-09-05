import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, ScrollView } from "react-native";

import { Picker } from "@react-native-picker/picker";
import useCoordenadas from "../hooks/useCoordenadas";
import { Coordenadas } from "../interfaces";
import Card from "../componentes/card";
import styles from "../styles/styles";

const Cadastro = ({ navigation }) => {
  const { coordenadas, bairros, loading, error } = useCoordenadas();
  const [selectedBairro, setSelectedBairro] = useState<string>("");
  const [selectedLocal, setSelectedLocal] = useState<string>("");
  const [locais, setLocais] = useState<string[]>([]);
  const [trechos, setTrechos] = useState<Coordenadas | any>(null);

  useEffect(() => {
    const coordenadasFiltradas = coordenadas?.filter(
      (x) => x.bairro === selectedBairro
    );
    const _locais = new Set();
    coordenadasFiltradas?.forEach((c) => {
      _locais.add(c.logradouro);
    });
    const locaisFiltrados: any = Array.from(_locais);
    setLocais(locaisFiltrados);
  }, [selectedBairro]);

  useEffect(() => {
    const coordenadasFiltradas = coordenadas?.filter(
      (x: Coordenadas) => x.logradouro === selectedLocal
    );

    setTrechos(coordenadasFiltradas);
  }, [selectedLocal]);

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

  const handleChangeBairro = (itemValue: string) => {
    setSelectedBairro(itemValue);
  };

  const handleChangeLocal = (itemValue: string) => {
    setSelectedLocal(itemValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Escolha um bairro:</Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Picker
          selectedValue={selectedBairro}
          onValueChange={(itemValue) => handleChangeBairro(itemValue)}
          style={styles.picker}
        >
          <Picker.Item key={""} label={"selecione"} value={null} />
          {bairros &&
            bairros.map((b: string, index) => (
              <Picker.Item key={index} label={b} value={b} />
            ))}
        </Picker>

        {!!locais.length && (
          <Text style={styles.label}>Selecione um local:</Text>
        )}

        {!!locais.length && (
          <Picker
            selectedValue={selectedLocal}
            onValueChange={(itemValue) => handleChangeLocal(itemValue)}
            style={styles.picker}
          >
            <Picker.Item key={""} label={"selecione"} value={null} />
            {locais &&
              locais.map((b: string, index) => (
                <Picker.Item key={index} label={b} value={b} />
              ))}
          </Picker>
        )}

        {trechos && !!locais.length && (
          <Text style={styles.label}>Selecione um trecho:</Text>
        )}

        {trechos &&
          !!locais.length &&
          trechos.map((t: Coordenadas, index: number) => (
            <Card key={index} data={t} navigation={navigation}></Card>
          ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

export default Cadastro;
