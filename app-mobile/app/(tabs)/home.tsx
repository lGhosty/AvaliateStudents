import { Link, useRouter, useLocalSearchParams } from 'expo-router'; // Importar useLocalSearchParams
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_URL } from '../../constants/api';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons'; // Para o ícone do filtro

interface Moradia {
  id: number;
  nome: string;
  preco: number;
  imageUrl: string | null;
  avaliacoes: { nota: number }[];
}

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  // 1. Ler os parâmetros da URL (filtro)
  const params = useLocalSearchParams<{ precoMax?: string }>();
  
  const [moradias, setMoradias] = useState<Moradia[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMoradias() {
      setIsLoading(true);
      try {
        // 2. Montar a URL com o filtro, se existir
        let url = `${BASE_URL}/moradias`;
        if (params.precoMax) {
          url += `?precoMax=${params.precoMax}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Falha ao buscar moradias');
        }
        const data = await response.json();
        setMoradias(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMoradias();
  }, [params.precoMax]); // 3. Recarrega sempre que o filtro mudar

  const getNotaMedia = (avaliacoes: { nota: number }[]) => {
    if (!avaliacoes || avaliacoes.length === 0) return 'N/A';
    const total = avaliacoes.reduce((acc, ava) => acc + ava.nota, 0);
    return (total / avaliacoes.length).toFixed(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
            <Text style={styles.title}>Olá, {user?.nome.split(' ')[0]}</Text>
            <Text style={styles.subtitle}>Encontre seu Lar</Text>
        </View>
        
        {/* 4. Botão de Filtro */}
        <TouchableOpacity
            style={styles.filterButton}
            onPress={() => router.push('/filter')}
        >
             <Ionicons name="options" size={24} color="#007bff" />
             {params.precoMax && <View style={styles.filterBadge} />}
        </TouchableOpacity>
      </View>
      
      {/* Feedback se o filtro estiver ativo */}
      {params.precoMax && (
          <View style={styles.activeFilter}>
              <Text style={{color:'#fff'}}>Filtro: Até R$ {params.precoMax}</Text>
              <TouchableOpacity onPress={() => router.setParams({ precoMax: '' })}>
                  <Ionicons name="close-circle" size={20} color="#fff" />
              </TouchableOpacity>
          </View>
      )}
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={moradias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link href={{ pathname: "/details", params: { id: item.id } }} asChild>
              <TouchableOpacity style={styles.card}>
                <Image
                  source={{ uri: item.imageUrl || 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }}
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
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 18, color: '#666', marginTop: 4 },
  filterButton: { padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8, position: 'relative' },
  filterBadge: { position: 'absolute', top: 5, right: 5, width: 8, height: 8, borderRadius: 4, backgroundColor: 'red' },
  activeFilter: { backgroundColor: '#007bff', padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, marginTop: 10, borderRadius: 8 },
  
  card: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  cardImage: { width: 90, height: 90, borderRadius: 8 },
  cardTextContainer: { marginLeft: 15, flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  cardPrice: { fontSize: 16, color: '#28a745', fontWeight: '600', marginBottom: 5 },
  cardRating: { fontSize: 14, color: '#666' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#666' }
});
