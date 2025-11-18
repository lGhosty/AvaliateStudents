import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FilterScreen() {
  const router = useRouter();
  const [precoMax, setPrecoMax] = useState('');

  const aplicarFiltro = () => {
    // Navega para a Home passando o parâmetro na URL
    // Ex: /home?precoMax=500
    router.push({
        pathname: '/(tabs)/home',
        params: { precoMax: precoMax }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Filtros</Text>
      
      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Preço Máximo (R$)</Text>
        <TextInput
            style={styles.input}
            placeholder="Ex: 1000"
            keyboardType="numeric"
            value={precoMax}
            onChangeText={setPrecoMax}
        />
      </View>
      
      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Tipo de Moradia</Text>
        <Text style={styles.filterValue}>Todos (Padrão)</Text>
      </View>

      <TouchableOpacity style={styles.applyButton} onPress={aplicarFiltro}>
        <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 40, paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  filterGroup: { marginBottom: 25 },
  filterLabel: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, fontSize: 16, borderWidth: 1, borderColor: '#ddd' },
  filterValue: { fontSize: 16, color: '#6c757d', padding: 15, backgroundColor: '#fff', borderRadius: 5 },
  applyButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  applyButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  backButton: { padding: 15, alignItems: 'center' },
  backButtonText: { color: '#6c757d', fontSize: 16 },
});
