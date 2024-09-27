import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, LogBox } from "react-native";
import styles from "../styles/styles"; // Importando os estilos
import { useNavigation } from "@react-navigation/native";
import { TelemetriaContext } from "../contextos";
import Constants from "expo-constants";
const androidVersionCode = Constants.expoConfig?.android?.versionCode || "N/A";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth } from 'firebase/auth';
import { RealTimeDatabaseSubscriptionService, SubscriptionService } from "../servicos";
import moment from 'moment-timezone';
LogBox.ignoreAllLogs();
const firebaseConfig = {
  apiKey: "AIzaSyBh_rk7bHfrr8nmIaGBeVesGasl2TDWeWI",
  authDomain: "igor-e1982.firebaseapp.com",
  databaseURL: "https://igor-e1982-default-rtdb.firebaseio.com",
  projectId: "igor-e1982",
  storageBucket: "igor-e1982.appspot.com",
  messagingSenderId: "341307780086",
  appId: "1:341307780086:web:e3a1d5d5a85c016b4135d7",
  measurementId: "G-JDKZX7M3B3"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const _service = new RealTimeDatabaseSubscriptionService();
const service = new SubscriptionService(_service);

export function getTimestampSaoPaulo(): number {
  const now = moment.tz("America/Sao_Paulo");
  return now.valueOf();
}


function Login() {
  const [_email, setEmail] = useState("");
  const context = useContext(TelemetriaContext);
  const navigation = useNavigation<any>();
  const [senha, setSenha] = useState("");


  if (!context) {
    throw new Error("Button must be used within a TelemetriaProvider");
  }

  const { setUser, setUid, setRoteiro } = context;


const login = async (auth: Auth, e_mail: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, e_mail, password);
    const user = userCredential.user;
    const {email, uid} = user
    setUser(email);
    setUid(uid);

    const _roteiro = await  service.get(uid);
    if(_roteiro){
      setRoteiro(_roteiro);
      navigation.navigate("roteiro");
    }else{
      navigation.navigate("cadastro");
    }

    
  } catch (error: any) {
    console.error('Erro ao fazer login:', error.message);
  }
};


  const handleLogin = () => {
    // Validação simples para exemplo
    if (_email === "" || senha === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    } else {
      login(auth, _email, senha)
      
    }
  };

  const handleRegister = () => {
    navigation.navigate("registro");
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5", // Cor de fundo suave
        padding: 20,
      }}
    >
      {/* Input de Email */}
      <TextInput
        style={{
          width: "100%",
          height: 50,
          borderRadius: 8,
          borderColor: "#ccc",
          borderWidth: 1,
          paddingHorizontal: 15,
          backgroundColor: "#fff",
          fontSize: 16,
          marginBottom: 20,
        }}
        placeholder="Email"
        keyboardType="email-address"
        value={_email}
        onChangeText={setEmail}
      />

      {/* Input de Senha */}
      <TextInput
        style={{
          width: "100%",
          height: 50,
          borderRadius: 8,
          borderColor: "#ccc",
          borderWidth: 1,
          paddingHorizontal: 15,
          backgroundColor: "#fff",
          fontSize: 16,
          marginBottom: 20,
        }}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* Botão de Login */}
      <TouchableOpacity
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#007BFF", // Cor azul para o botão
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={handleLogin}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          Entrar
        </Text>
      </TouchableOpacity>

      {/* Link para cadastro */}
      <TouchableOpacity onPress={handleRegister} style={{ marginTop: 30 }}>
        <Text
          style={{
            color: "#007BFF",
            fontSize: 16,
            textDecorationLine: "underline",
          }}
        >
          Ainda não tem uma conta? Cadastre-se
        </Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 40, fontSize: 12, color: "#aaa" }}>
        Versão: {Constants.expoConfig?.android?.versionCode || "N/A"}
      </Text>
    </View>
  );
}

export default Login;