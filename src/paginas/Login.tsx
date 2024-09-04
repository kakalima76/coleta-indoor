import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/styles"; // Importando os estilos
import { useNavigation } from "@react-navigation/native";
import { TelemetriaContext } from "../contextos";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const context = useContext(TelemetriaContext);
  const navigate = useNavigation<any>();
  const [senha, setSenha] = useState("");

  if (!context) {
    throw new Error("Button must be used within a TelemetriaProvider");
  }

  const { setUser } = context;

  const handleLogin = () => {
    // Validação simples para exemplo
    if (email === "" || senha === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    } else {
      setUser(email);
      navigation.navigate("cadastro");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={{
          ...styles.picker,
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 20,
        }} // Personalizando o input
        placeholder="Digite seu email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={{
          ...styles.picker,
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 20,
        }} // Personalizando o input
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
