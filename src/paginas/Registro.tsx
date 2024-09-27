import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword,  Auth, sendEmailVerification } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
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

export default function Registrar() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation<any>();

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Enviar e-mail de verificação
      await sendEmailVerification(user);
      navigation.navigate("verificar");
    } catch (error: any) {
      console.error('Erro ao registrar e enviar email de verificação:', error.message);
    }
  }

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    register(email, password);
    setErrorMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Confirmar Senha"
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
