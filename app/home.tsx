import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';

// DADOS MOCKADOS (ESTÁTICOS)
const MORADIAS = [
  { id: '1', nome: 'República Centro', preco: 'R$ 550/mês', nota: 4.5, img: 'https://via.placeholder.com/150' },
  { id: '2', nome: 'Kitnet Sossego', preco: 'R$ 700/mês', nota: 4.8, img: 'https://via.placeholder.com/150' },
  { id: '3', nome: 'Ap Universitário', preco: 'R$ 900/mês', nota: 4.2, img: 'https://via.placeholder.com/150' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Encontre seu Lar</Text>
      {/* Adicione links para Perfil e Filtro aqui */}
      <Link href="/profile" style={styles.link}>Ir para Perfil</Link>
      <Link href="/filter" style={styles.link}>Filtrar</Link>
      <FlatList
        data={MORADIAS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href="/details" asChild>
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.img }} style={styles.cardImage} />
              <View>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text>{item.preco}</Text>
                <Text>Nota: {item.nota} ★</Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
