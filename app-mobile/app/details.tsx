import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_URL } from '../constants/api'; // O nosso IP centralizado
import { useAuth } from '../context/AuthContext'; // Para o botão de reservar/avaliar

// Interface para os dados completos da moradia (do back-end)
interface MoradiaDetalhada {
  id: number;
  nome: string;
  endereco: string;
  descricao: string;
  preco: number;
  imageUrl: string | null;
  criador: {
    nome: string;
  };
  avaliacoes: {
    id: number;
    nota: number;
    comentario: string | null;
    autor: {
      nome: string;
    };
  }[];
}

export default function DetailsScreen() {
  const router = useRouter();
  const { token } = useAuth(); // Apanha o token para sabermos se podemos reservar/avaliar
  const { id } = useLocalSearchParams<{ id: string }>(); // 1. Apanha o ID da moradia (da URL)
  
  const [moradia, setMoradia] = useState<MoradiaDetalhada | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2. useEffect para buscar os dados da moradia específica
  useEffect(() => {
    if (!id) return; // Se não houver ID, não faz nada

    async function fetchMoradiaDetalhes() {
      setIsLoading(true); // Garante que o loading aparece em cada nova moradia
      try {
        // 3. Chama a nova rota do back-end (GET /api/moradias/:id)
        const response = await fetch(`${BASE_URL}/moradias/${id}`);
        
        if (!response.ok) {
          throw new Error('Moradia não encontrada');
        }
        const data = await response.json();
        setMoradia(data);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os detalhes da moradia.');
        router.back();
      } finally {
        setIsLoading(false);
      }
    }

    fetchMoradiaDetalhes();
  }, [id]); // Re-executa se o ID mudar

  // Função para calcular a nota média
  const getNotaMedia = (avaliacoes: MoradiaDetalhada['avaliacoes']) => {
    if (!avaliacoes || avaliacoes.length === 0) return 'N/A';
    const total = avaliacoes.reduce((acc, ava) => acc + ava.nota, 0);
    return (total / avaliacoes.length).toFixed(1);
  };

  // Se estiver a carregar, mostra o spinner
  if (isLoading || !moradia) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </SafeAreaView>
    );
  }

  // 4. Se carregou, mostra os dados reais
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: moradia.imageUrl || 'https://via.placeholder.com/400' }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{moradia.nome}</Text>
          <Text style={styles.price}>R$ {moradia.preco.toFixed(2)}/mês</Text>
          <Text style={styles.rating}>
            Nota: {getNotaMedia(moradia.avaliacoes)} ★ ({moradia.avaliacoes.length} avaliações)
          </Text>
          <Text style={styles.address}>{moradia.endereco}</Text>
          
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{moradia.descricao}</Text>
          <Text style={styles.anunciante}>Anunciado por: {moradia.criador.nome}</Text>

          {/* Botões para os NOVOS CASOS DE USO */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonPrimary} onPress={() => {/* TODO: Lógica de Reserva */}}>
              <Text style={styles.buttonText}>Reservar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSecondary} onPress={() => {/* TODO: Lógica de Avaliar */}}>
              <Text style={styles.buttonTextSecondary}>Avaliar</Text>
            </TouchableOpacity>
          </View>

          {/* 5. Lista as avaliações (Novo Caso de Uso) */}
          <Text style={styles.sectionTitle}>Avaliações</Text>
          {moradia.avaliacoes.length === 0 ? (
            <Text style={styles.noReviews}>Esta moradia ainda não tem avaliações.</Text>
          ) : (
            moradia.avaliacoes.map((ava) => (
              <View key={ava.id} style={styles.reviewCard}>
                <Text style={styles.reviewAuthor}>{ava.autor.nome} (Nota: {ava.nota.toFixed(1)} ★)</Text>
                <Text style={styles.reviewComment}>{ava.comentario || 'Sem comentário.'}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 250 },
  content: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 22, color: '#28a745', fontWeight: 'bold', marginBottom: 8 },
  rating: { fontSize: 16, color: '#666', marginBottom: 8 },
  address: { fontSize: 16, color: '#666', marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5 },
  description: { fontSize: 16, lineHeight: 24, color: '#333' },
  anunciante: { fontSize: 14, color: '#666', marginTop: 15, fontStyle: 'italic' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  buttonPrimary: { flex: 1, backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center', marginRight: 10 },
  buttonSecondary: { flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#007bff', marginLeft: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  buttonTextSecondary: { color: '#007bff', fontSize: 16, fontWeight: 'bold' },
  noReviews: { fontSize: 14, color: '#666', fontStyle: 'italic', textAlign: 'center', paddingVertical: 20 },
  reviewCard: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  reviewAuthor: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  reviewComment: { fontSize: 14, color: '#333' }
});
