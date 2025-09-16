import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';

export default function DetailsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/400' }} style={styles.mainImage} />
      <Text style={styles.title}>República Centro</Text>
      <Text style={styles.price}>R$ 550/mês</Text>
      <Text style={styles.description}>
        Descrição completa da moradia, com detalhes sobre os quartos,
        áreas comuns, regras da casa e informações de contato.
      </Text>
       <Link href="/home" style={styles.link}>Voltar para a lista</Link>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    mainImage: { width: '100%', height: 250 },
    title: { fontSize: 28, fontWeight: 'bold', margin: 20 },
    price: { fontSize: 22, color: 'green', marginHorizontal: 20 },
    description: { fontSize: 16, margin: 20, lineHeight: 24 },
    link: { marginTop: 20, textAlign: 'center', color: '#007bff', fontSize: 16 },
});
