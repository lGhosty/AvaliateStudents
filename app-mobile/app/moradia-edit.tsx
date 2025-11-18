import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { BASE_URL } from '../constants/api';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function EditMoradiaScreen() {
  const { token } = useAuth();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Carregar os dados atuais da moradia
  useEffect(() => {
    async function fetchDados() {
      try {
        const response = await fetch(`${BASE_URL}/moradias/${id}`);
        const data = await response.json();
        setNome(data.nome);
        setEndereco(data.endereco);
        setDescricao(data.descricao);
        setPreco(data.preco.toString());
        setImageUri(data.imageUrl); // Carrega a imagem atual (URL do servidor)
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados.");
        router.back();
      } finally {
        setIsLoading(false);
      }
    }
    fetchDados();
  }, [id]);

  // 2. Escolher Nova Foto
  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1, aspect: [4, 3], allowsEditing: true,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Atualiza com a nova foto local
    }
  };

  // 3. Salvar Alterações
  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      let finalImageUrl = imageUri;

      // Se a imagem for local (começa com file://), precisa fazer upload
      if (imageUri && imageUri.startsWith('file')) {
        const formData = new FormData();
        const filename = imageUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : `image`;

        formData.append('image', { uri: imageUri, name: filename, type } as any);

        const uploadRes = await fetch(`${BASE_URL}/upload`, {
          method: 'POST', body: formData, headers: { 'Content-Type': 'multipart/form-data' },
        });
        
        if (uploadRes.ok) {
           const data = await uploadRes.json();
           const serverUrl = BASE_URL.replace('/api', '');
           finalImageUrl = `${serverUrl}/uploads/${data.filename}`;
        }
      }

      // Envia o PUT para atualizar
      const response = await fetch(`${BASE_URL}/moradias/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nome, endereco, descricao,
          preco: parseFloat(preco),
          imageUrl: finalImageUrl // Manda a nova URL ou a antiga
        })
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Moradia atualizada!");
        router.push('/(tabs)/home'); // Volta para a home para recarregar
      } else {
        Alert.alert("Erro", "Falha ao atualizar.");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro de conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <ActivityIndicator style={{marginTop:50}} size="large" color="#007bff"/>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
             <Text style={{color:'#007bff', fontSize:16}}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Editar Moradia</Text>
        <View style={{width:50}}/>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.imagePicker} onPress={handleSelectImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="camera" size={40} color="#ccc" />
              <Text style={styles.placeholderText}>Alterar Foto</Text>
            </View>
          )}
          <View style={styles.editBadge}><Ionicons name="pencil" size={12} color="#fff"/></View>
        </TouchableOpacity>

        <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome" />
        <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} placeholder="Endereço" />
        <TextInput style={[styles.input, {height:100}]} value={descricao} onChangeText={setDescricao} multiline placeholder="Descrição" />
        <TextInput style={styles.input} value={preco} onChangeText={setPreco} keyboardType="numeric" placeholder="Preço" />

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
           <Text style={styles.buttonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#ddd' },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 15, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  imagePicker: { height: 200, backgroundColor: '#e1e1e1', borderRadius: 10, marginBottom: 20, justifyContent: 'center', alignItems: 'center', position:'relative' },
  previewImage: { width: '100%', height: '100%', borderRadius: 10 },
  placeholder: { alignItems: 'center' },
  placeholderText: { color: '#666', marginTop: 5 },
  editBadge: { position:'absolute', bottom:10, right:10, backgroundColor:'#007bff', padding:8, borderRadius:20 }
});
