import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// DADOS MOCKADOS (ESTÁTICOS)
const MORADIAS = [
  { id: '1', nome: 'República Centro', preco: 'R$ 550/mês', nota: 4.5, img: 'https://via.placeholder.com/150' },
  { id: '2', nome: 'Kitnet Sossego', preco: 'R$ 700/mês', nota: 4.8, img: 'https://via.placeholder.com/150' },
  { id: '3', nome: 'Ap Universitário', preco: 'R$ 900/mês', nota: 4.2, img: 'https://via.placeholder.com/150' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Encontre seu Lar</Text>
        <View style={styles.navLinks}>
          <Link href="/profile" style={styles.link}>Perfil</Link>
          <Link href="/filter" style={styles.link}>Filtrar</Link>
        </View>
      </View>
      <FlatList
        data={MORADIAS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href="/details" asChild>
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.img }} style={styles.cardImage} />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text>{item.preco}</Text>
                <Text>Nota: {item.nota.toString()} ★</Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { paddingTop: 20, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  navLinks: { flexDirection: 'row', justifyContent: 'space-around' },
  link: { textAlign: 'center', color: '#007bff', fontSize: 16 },
  card: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardImage: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
  cardTextContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
});
