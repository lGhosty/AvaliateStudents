import { Link } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rate My República</Text>
      <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
      <Link href="/home" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/register" style={styles.link}>
        Não tem uma conta? Cadastre-se
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  input: { height: 50, borderColor: 'gray', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 15 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  link: { marginTop: 20, textAlign: 'center', color: '#007bff' },
});
