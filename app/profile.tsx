import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tela de Perfil</Text> {/* Mude para Tela de Filtro */}
      <Link href="/home" style={styles.link}>Voltar para Home</Link>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  link: { marginTop: 20, color: '#007bff', fontSize: 16 },
});
