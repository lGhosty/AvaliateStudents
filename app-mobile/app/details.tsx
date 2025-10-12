import { useRouter } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetailsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tela de Detalhes</Text>
      <Text style={styles.text}>A navegação para esta tela funcionou.</Text>
      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 20 },
  button: { backgroundColor: '#007bff', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5 },
  buttonText: { color: '#fff', fontSize: 18 },
});
