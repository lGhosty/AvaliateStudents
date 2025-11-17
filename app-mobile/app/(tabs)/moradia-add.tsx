import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/api';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';

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
  const handleGetLocation = async () => {
    setIsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos de acesso à localização para preencher automaticamente.');
        setIsLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude.toString());
      setLongitude(location.coords.longitude.toString());
      Alert.alert('Sucesso', 'Localização obtida!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a localização.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMoradia = async () => {
    if (!nome || !endereco || !descricao || !preco) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    setIsLoading(true);

    try {
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
          preco: parseFloat(preco),
          latitude: parseFloat(latitude) || 0.0,
          longitude: parseFloat(longitude) || 0.0,
        })
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso!', 'Moradia cadastrada.');
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

        {/* 3. Botão para pegar o GPS */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#6c757d', marginBottom: 15 }]}
          onPress={handleGetLocation}
        >
          <Text style={styles.buttonText}>📍 Usar Minha Localização Atual</Text>
        </TouchableOpacity>

        <TextInput style={styles.input} placeholder="Latitude" value={latitude} onChangeText={setLatitude} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Longitude" value={longitude} onChangeText={setLongitude} keyboardType="numeric" />

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
  content: { padding: 20 },
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
