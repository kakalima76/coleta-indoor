import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function Verificar() {

  const navigation = useNavigation<any>();

  const handleGoBackToLogin = () => {
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifique seu e-mail</Text>
      <Text style={styles.message}>
        Um e-mail de verificação foi enviado para o seu endereço de e-mail. Por favor, verifique seu e-mail para confirmar sua conta antes de fazer login.
      </Text>

      <Button title="Voltar para o Login" onPress={handleGoBackToLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
  },
});
