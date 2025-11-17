import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/api';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker'; // <-- Importar ImagePicker
import { Ionicons } from '@expo/vector-icons';

export default function AddMoradiaScreen() {
  const { token } = useAuth();
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null); // <-- Estado da imagem
  
  const [isLoading, setIsLoading] = useState(false);

  // 1. Escolher Foto
  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 3],
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // 2. Obter GPS
  const handleGetLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Sem acesso ao GPS.');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLatitude(loc.coords.latitude.toString());
      setLongitude(loc.coords.longitude.toString());
    } catch (e) { Alert.alert('Erro', 'Falha no GPS'); }
  };

  const handleAddMoradia = async () => {
    if (!nome || !endereco || !descricao || !preco) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios.');
      return;
    }
    setIsLoading(true);

    try {
      let imageUrlNoBackend = '';

      // 3. Se tiver imagem selecionada, faz o upload primeiro
      if (imageUri) {
        const formData = new FormData();
        // O React Native precisa deste formato específico para upload
        const filename = imageUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : `image`;

        formData.append('image', {
          uri: imageUri,
          name: filename,
          type,
        } as any); // 'as any' para evitar erro de TypeScript no FormData

        const uploadResponse = await fetch(`${BASE_URL}/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data', // Importante!
          },
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          // O backend devolve o nome do arquivo. Montamos a URL completa.
          // Ex: http://192.168.0.102:3333/uploads/hash-foto.jpg
          const serverUrl = BASE_URL.replace('/api', ''); // Remove o /api para pegar a raiz
          imageUrlNoBackend = `${serverUrl}/uploads/${uploadData.filename}`;
        } else {
          console.log('Falha no upload da imagem');
        }
      }

      // 4. Criar a moradia com a URL da imagem
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
          imageUrl: imageUrlNoBackend || null, // Envia a URL gerada
        })
      });

      if (response.ok) {
        Alert.alert('Sucesso!', 'Moradia cadastrada.');
        setNome(''); setEndereco(''); setDescricao(''); setPreco(''); setImageUri(null);
        router.push('/(tabs)/home');
      } else {
        Alert.alert('Erro', 'Não foi possível cadastrar.');
      }

    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha na conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cadastrar Moradia</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Área de Seleção de Foto */}
        <TouchableOpacity style={styles.imagePicker} onPress={handleSelectImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="camera" size={40} color="#ccc" />
              <Text style={styles.placeholderText}>Adicionar Foto</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput style={styles.input} placeholder="Nome (ex: República X)" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={setEndereco} />
        <TextInput style={styles.input} placeholder="Descrição" value={descricao} onChangeText={setDescricao} multiline />
        <TextInput style={styles.input} placeholder="Preço" value={preco} onChangeText={setPreco} keyboardType="numeric" />

        <TouchableOpacity style={[styles.button, { backgroundColor: '#6c757d' }]} onPress={handleGetLocation}>
          <Text style={styles.buttonText}>📍 Pegar GPS</Text>
        </TouchableOpacity>
        
        <View style={{flexDirection:'row', gap: 10, marginBottom: 15}}>
            <TextInput style={[styles.input, {flex:1, marginBottom:0}]} placeholder="Lat" value={latitude} onChangeText={setLatitude} />
            <TextInput style={[styles.input, {flex:1, marginBottom:0}]} placeholder="Long" value={longitude} onChangeText={setLongitude} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddMoradia} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#ddd' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  content: { padding: 20 },
  input: { height: 50, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  
  // Estilos da Imagem
  imagePicker: { height: 200, backgroundColor: '#e1e1e1', borderRadius: 10, marginBottom: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  previewImage: { width: '100%', height: '100%' },
  placeholder: { alignItems: 'center' },
  placeholderText: { color: '#666', marginTop: 5 }
});
