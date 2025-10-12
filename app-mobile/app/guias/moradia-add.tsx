import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddMoradiaScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cadastrar Nova Moradia</Text>
      </View>
      <View style={styles.content}>
        <Text>Em breve: formulário para adicionar uma moradia.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
