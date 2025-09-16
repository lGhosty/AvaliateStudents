import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FilterScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Filtros</Text>
      
      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Faixa de Preço</Text>
        {/* Aqui entraria um slider ou inputs de preço no futuro */}
        <Text style={styles.filterValue}>Qualquer valor</Text>
      </View>
      
      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Tipo de Moradia</Text>
        <Text style={styles.filterValue}>República, Kitnet, AP</Text>
      </View>

      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 40, paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  filterGroup: { marginBottom: 25 },
  filterLabel: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  filterValue: { fontSize: 16, color: '#6c757d', padding: 15, backgroundColor: '#fff', borderRadius: 5 },
  applyButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  applyButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  backButton: { backgroundColor: '#6c757d', padding: 15, borderRadius: 8, alignItems: 'center' },
  backButtonText: { color: '#fff', fontSize: 18 },
});
