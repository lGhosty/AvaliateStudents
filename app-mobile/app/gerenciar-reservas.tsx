import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { BASE_URL } from '../constants/api';
import { Ionicons } from '@expo/vector-icons';

export default function GerenciarReservasScreen() {
  const { token } = useAuth();
  const [reservas, setReservas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReservas = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/reservas/recebidas`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservas(await res.json());
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchReservas(); }, []);

  const handleStatus = async (id: number, status: string) => {
    try {
      await fetch(`${BASE_URL}/reservas/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      Alert.alert("Sucesso", `Reserva ${status.toLowerCase()}!`);
      fetchReservas(); // Atualiza a lista
    } catch (e) { Alert.alert("Erro", "Falha ao atualizar."); }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pedidos de Reserva</Text>
      {isLoading ? <ActivityIndicator color="blue" /> : (
        <FlatList
          data={reservas}
          keyExtractor={i => i.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.casa}>{item.moradia.nome}</Text>
              <Text>Solicitante: {item.usuario.nome}</Text>
              <Text>Status: <Text style={{fontWeight:'bold'}}>{item.status}</Text></Text>
              
              {item.status === 'PENDENTE' && (
                <View style={styles.actions}>
                  <TouchableOpacity style={[styles.btn, {backgroundColor:'green'}]} onPress={() => handleStatus(item.id, 'CONFIRMADA')}>
                    <Ionicons name="checkmark" color="#fff" size={20}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.btn, {backgroundColor:'red'}]} onPress={() => handleStatus(item.id, 'CANCELADA')}>
                    <Ionicons name="close" color="#fff" size={20}/>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
  casa: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 10, justifyContent: 'flex-end' },
  btn: { padding: 10, borderRadius: 5 }
});
