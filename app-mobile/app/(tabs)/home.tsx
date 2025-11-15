import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_URL } from '../../constants/api';
import { useAuth } from '../../context/AuthContext';


interface Moradia {
  id: number;
  nome: string;
  preco: number;
  imageUrl: string | null;
  avaliacoes: { nota: number }[];
}

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth(); // Apanha o utilizador logado
  const [moradias, setMoradias] = useState<Moradia[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMoradias() {
      try {
        // 3. Chamada GET para a rota pública de moradias
        const response = await fetch(`${BASE_URL}/moradias`);
        if (!response.ok) {
          throw new Error('Falha ao buscar moradias');
        }
        const data = await response.json();
        setMoradias(data);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar as moradias.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchMoradias();
  }, []);

  const getNotaMedia = (avaliacoes: { nota: number }[]) => {
    if (!avaliacoes || avaliacoes.length === 0) return 'N/A';
    const total = avaliacoes.reduce((acc, ava) => acc + ava.nota, 0);
    return (total / avaliacoes.length).toFixed(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Olá, {user?.nome.split(' ')[0]}</Text>
        <Text style={styles.subtitle}>Encontre seu Lar</Text>
      </View>
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={moradias}
          keyExtractor={(item) => item.id.toString()} // 4. Usar dados reais
          renderItem={({ item }) => (
            <Link href={{ pathname: "/details", params: { id: item.id } }} asChild>
              <TouchableOpacity style={styles.card}>
                <Image
                  source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }}
                  style={styles.cardImage}
                />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{item.nome}</Text>
                  <Text style={styles.cardPrice}>R$ {item.preco.toFixed(2)}/mês</Text>
                  <Text style={styles.cardRating}>
                    Nota: {getNotaMedia(item.avaliacoes)} ★
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma moradia encontrada.</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 18, color: '#666', marginTop: 4 },
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
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardImage: { width: 90, height: 90, borderRadius: 8 },
  cardTextContainer: { marginLeft: 15, flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  cardPrice: { fontSize: 16, color: '#28a745', fontWeight: '600', marginBottom: 5 },
  cardRating: { fontSize: 14, color: '#666' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#666' }
});
