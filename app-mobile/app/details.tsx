import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from '../constants/api';
import { useAuth } from '../context/AuthContext';
import { ModalAvaliacao } from './components/ModalAvaliacao';

// URL de imagem segura para usar caso a moradia não tenha foto
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

interface MoradiaDetalhada {
  id: number;
  nome: string;
  endereco: string;
  descricao: string;
  preco: number;
  imageUrl: string | null;
  criador: {
    id: number;
    nome: string;
  };
  avaliacoes: { id: number; nota: number; comentario: string | null; autor: { nome: string; }; }[];
}

export default function DetailsScreen() {
  const router = useRouter();
  const { token, user } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const [moradia, setMoradia] = useState<MoradiaDetalhada | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalAvaliacaoVisivel, setIsModalAvaliacaoVisivel] = useState(false);

  const fetchMoradiaDetalhes = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/moradias/${id}`);
      if (!response.ok) throw new Error('Moradia não encontrada');
      const data = await response.json();
      setMoradia(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes.');
      router.back();
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMoradiaDetalhes();
  }, [fetchMoradiaDetalhes]);

  // --- Lógica de EXCLUIR ---
  const handleDelete = async () => {
    Alert.alert(
      "Excluir Moradia",
      "Tem certeza? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`${BASE_URL}/moradias/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
              });
              if (response.ok) {
                Alert.alert("Sucesso", "Moradia excluída.");
                router.replace('/(tabs)/home');
              } else {
                const data = await response.json();
                Alert.alert("Erro", data.message || "Não foi possível excluir.");
              }
            } catch (e) {
              Alert.alert("Erro", "Falha na conexão.");
            }
          }
        }
      ]
    );
  };

  // --- Lógica de RESERVAR ---
  const handleReserva = async () => {
    if (!token) {
      Alert.alert('Login necessário', 'Você precisa estar logado para reservar.');
      return;
    }

    try {
      const hoje = new Date();
      const amanha = new Date(hoje); amanha.setDate(hoje.getDate() + 1);
      const fim = new Date(hoje); fim.setDate(hoje.getDate() + 8);

      const response = await fetch(`${BASE_URL}/reservas/moradia/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          dataEntrada: amanha.toISOString(),
          dataSaida: fim.toISOString()
        })
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Sucesso!', 'Reserva realizada com sucesso.');
        router.push('/minhas-reservas');
      } else {
        throw new Error(data.message || 'Erro ao reservar.');
      }
    } catch (error) {
      Alert.alert('Erro', (error as Error).message);
    }
  };

  const getNotaMedia = (avaliacoes: MoradiaDetalhada['avaliacoes']) => {
    if (!avaliacoes || avaliacoes.length === 0) return 'N/A';
    const total = avaliacoes.reduce((acc, ava) => acc + ava.nota, 0);
    return (total / avaliacoes.length).toFixed(1);
  };

  if (isLoading || !moradia) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </SafeAreaView>
    );
  }

  // Imagem de fallback se não houver foto
  const imagemFinal = moradia.imageUrl ? moradia.imageUrl : FALLBACK_IMAGE;

  // Verifica se o utilizador logado é o dono da moradia
  const isDono = user && moradia.criador && user.id === moradia.criador.id;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imagemFinal }}
            style={styles.image}
            resizeMode="cover"
          />
          
          {/* Botão Voltar (Seta Esquerda) */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          {/* Botão Excluir (Lixeira Direita) - Só aparece se for o dono */}
          {isDono && (
             <TouchableOpacity
               style={[styles.backButton, { left: undefined, right: 20, backgroundColor: '#dc3545' }]}
               onPress={handleDelete}
             >
               <Ionicons name="trash" size={24} color="#fff" />
             </TouchableOpacity>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{moradia.nome}</Text>
          <Text style={styles.price}>R$ {moradia.preco.toFixed(2)}/mês</Text>
          
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>
              {getNotaMedia(moradia.avaliacoes)} ({moradia.avaliacoes.length} avaliações)
            </Text>
          </View>

          <Text style={styles.address}>{moradia.endereco}</Text>
          
          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{moradia.descricao}</Text>
          <Text style={styles.anunciante}>Anunciado por: {moradia.criador.nome}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={handleReserva}
            >
              <Text style={styles.buttonText}>Reservar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={() => setIsModalAvaliacaoVisivel(true)}
              disabled={!token}
            >
              <Text style={styles.buttonTextSecondary}>Avaliar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Avaliações</Text>
          {moradia.avaliacoes.length === 0 ? (
            <Text style={styles.noReviews}>Esta moradia ainda não tem avaliações.</Text>
          ) : (
            moradia.avaliacoes.map((ava) => (
              <View key={ava.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewAuthor}>{ava.autor.nome}</Text>
                  <View style={{flexDirection:'row'}}>
                     <Text style={{fontWeight:'bold', color:'#FFD700', marginRight: 4}}>{ava.nota}</Text>
                     <Ionicons name="star" size={14} color="#FFD700" />
                  </View>
                </View>
                <Text style={styles.reviewComment}>{ava.comentario || 'Sem comentário.'}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      
      <ModalAvaliacao
        isVisible={isModalAvaliacaoVisivel}
        onClose={() => setIsModalAvaliacaoVisivel(false)}
        moradiaId={moradia.id}
        onSubmitSuccess={() => {
          setIsModalAvaliacaoVisivel(false);
          fetchMoradiaDetalhes();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#fff' },
  
  imageContainer: { position: 'relative' },
  image: { width: '100%', height: 300 },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  content: { padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  price: { fontSize: 22, color: '#28a745', fontWeight: 'bold', marginBottom: 10 },
  
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  ratingText: { fontSize: 16, color: '#666', marginLeft: 5 },
  
  address: { fontSize: 16, color: '#666', marginBottom: 10 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  description: { fontSize: 16, lineHeight: 24, color: '#555' },
  anunciante: { fontSize: 14, color: '#888', marginTop: 15, fontStyle: 'italic' },
  
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginBottom: 10 },
  buttonPrimary: { flex: 1, backgroundColor: '#007bff', padding: 15, borderRadius: 10, alignItems: 'center', marginRight: 10, elevation: 2 },
  buttonSecondary: { flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#007bff', marginLeft: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  buttonTextSecondary: { color: '#007bff', fontSize: 16, fontWeight: 'bold' },
  
  noReviews: { fontSize: 14, color: '#888', fontStyle: 'italic', textAlign: 'center', paddingVertical: 10 },
  reviewCard: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#f0f0f0' },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  reviewAuthor: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  reviewComment: { fontSize: 14, color: '#555' }
});
