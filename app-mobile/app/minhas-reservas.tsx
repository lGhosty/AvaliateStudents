import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { BASE_URL } from '../constants/api';

interface Reserva {
  id: number;
  dataEntrada: string;
  dataSaida: string;
  status: string;
  moradia: {
    nome: string;
    imageUrl: string | null;
  };
}

export default function MinhasReservasScreen() {
  const { token } = useAuth();
  const router = useRouter();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReservas() {
      try {
        const response = await fetch(`${BASE_URL}/reservas/minhas`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setReservas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReservas();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>{'< Voltar'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Minhas Reservas</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.emptyText}>Você não tem reservas.</Text>}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item.moradia.imageUrl || 'https://via.placeholder.com/100' }}
                style={styles.image}
              />
              <View style={styles.details}>
                <Text style={styles.moradiaNome}>{item.moradia.nome}</Text>
                <Text style={styles.dates}>De: {formatDate(item.dataEntrada)}</Text>
                <Text style={styles.dates}>Até: {formatDate(item.dataSaida)}</Text>
                <Text style={[styles.status, { color: item.status === 'PENDENTE' ? 'orange' : 'green' }]}>
                  {item.status}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#ddd' },
  backButton: { fontSize: 16, color: '#007bff', marginRight: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  card: { flexDirection: 'row', backgroundColor: '#fff', margin: 10, padding: 10, borderRadius: 8, elevation: 2 },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 15 },
  details: { flex: 1, justifyContent: 'center' },
  moradiaNome: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  dates: { fontSize: 14, color: '#666' },
  status: { fontSize: 14, fontWeight: 'bold', marginTop: 5 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#666' }
});
