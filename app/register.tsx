import { Link } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Crie sua Conta</Text>
      <TextInput style={styles.input} placeholder="Nome Completo" />
      <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
      <Link href="/home" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/" style={styles.link}>
        Já tem uma conta? Faça login
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, color: '#333' },
    input: { height: 50, backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 15, fontSize: 16 },
    button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    link: { marginTop: 20, textAlign: 'center', color: '#007bff', fontSize: 16 },
});
