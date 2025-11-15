import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext'; // <-- Para apanhar o token
import { BASE_URL } from '../../constants/api';
import { useRouter } from 'expo-router';

export default function AddMoradiaScreen() {
  const { token } = useAuth();
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMoradia = async () => {
    if (!nome || !endereco || !descricao || !preco) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    setIsLoading(true);

    try {
      // 2. Fazer a chamada FETCH para a rota protegida
      const response = await fetch(`${BASE_URL}/moradias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nome,
          endereco,
          descricao,
          preco: parseFloat(preco), // O back-end espera um Float
          latitude: parseFloat(latitude) || 0.0, // GPS
          longitude: parseFloat(longitude) || 0.0, // GPS
        })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso!', 'Moradia cadastrada.');
        // Limpa os campos e volta para a Home
        setNome('');
        setEndereco('');
        setDescricao('');
        setPreco('');
        setLatitude('');
        setLongitude('');
        router.push('/(tabs)/home');
      } else {
        Alert.alert('Erro ao Cadastrar', data.message || 'Não foi possível cadastrar.');
      }

    } catch (error) {
      console.error(error);
      Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cadastrar Nova Moradia</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <TextInput style={styles.input} placeholder="Nome da Moradia" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={setEndereco} />
        <TextInput style={styles.input} placeholder="Descrição" value={descricao} onChangeText={setDescricao} multiline />
        <TextInput style={styles.input} placeholder="Preço (ex: 750.00)" value={preco} onChangeText={setPreco} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Latitude (Opcional)" value={latitude} onChangeText={setLatitude} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Longitude (Opcional)" value={longitude} onChangeText={setLongitude} keyboardType="numeric" />

        <TouchableOpacity style={styles.button} onPress={handleAddMoradia} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff'
  },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  content: { padding: 20 }, // Removido flex: 1
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 50,
    justifyContent: 'center',
    marginTop: 10
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
