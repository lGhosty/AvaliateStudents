import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import { BASE_URL } from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  // Tenta usar o avatar do utilizador, ou nulo
  const [avatarUri, setAvatarUri] = useState<string | null>(user?.avatarUrl || null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Ao abrir a tela, tenta carregar a foto salva no telemóvel
  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const savedAvatar = await AsyncStorage.getItem(`@avatar:${user?.email}`);
        if (savedAvatar) {
          setAvatarUri(savedAvatar);
        }
      } catch (e) {
        console.log('Erro ao carregar avatar local');
      }
    };
    loadAvatar();
  }, [user]);

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "É preciso permitir o acesso à galeria.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, aspect: [1, 1], quality: 1,
    });

    if (!pickerResult.canceled) {
      const uri = pickerResult.assets[0].uri;
      setAvatarUri(uri); // Mostra logo para o utilizador
      uploadAvatar(uri); // Faz o upload em segundo plano
    }
  };

  // 2. Função para fazer Upload e Salvar Localmente
  const uploadAvatar = async (uri: string) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      const filename = uri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename || '');
      const type = match ? `image/${match[1]}` : `image`;

      formData.append('image', { uri, name: filename, type } as any);

      const response = await fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.ok) {
        const data = await response.json();
        // Constrói a URL final (ex: http://192.168.../uploads/foto.jpg)
        const serverUrl = BASE_URL.replace('/api', '');
        const finalUrl = `${serverUrl}/uploads/${data.filename}`;
        
        // SALVA NO ASYNC STORAGE PARA NÃO SUMIR
        await AsyncStorage.setItem(`@avatar:${user?.email}`, finalUrl);
        Alert.alert("Sucesso", "Foto de perfil atualizada!");
      }
    } catch (error) {
      Alert.alert("Aviso", "Foto definida localmente, mas falha ao enviar para o servidor.");
      // Mesmo se falhar o upload, salvamos o URI local para o utilizador não perder
      await AsyncStorage.setItem(`@avatar:${user?.email}`, uri);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Meu Perfil</Text>
        
        <TouchableOpacity onPress={handleChoosePhoto} style={styles.avatarContainer}>
          {isLoading ? (
            <View style={[styles.avatar, {justifyContent:'center'}]}><ActivityIndicator color="#fff" /></View>
          ) : avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{user?.nome?.substring(0, 2).toUpperCase() || 'U'}</Text>
            </View>
          )}
          <Text style={styles.changePhotoText}>Alterar foto</Text>
        </TouchableOpacity>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{user?.nome || 'Carregando...'}</Text>
          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.value}>{user?.email || 'Carregando...'}</Text>
          <Text style={styles.label}>Tipo de Conta:</Text>
          <Text style={styles.valueBadge}>{user?.role || 'ESTUDANTE'}</Text>
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#28a745' }]}
            onPress={() => router.push('/minhas-reservas')}
          >
            <Text style={styles.actionButtonText}>📅 Ver Minhas Reservas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#dc3545' }]} onPress={logout}>
            <Text style={styles.actionButtonText}>Sair (Logout)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    content: { alignItems: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#333' },
    avatarContainer: { alignItems: 'center', marginBottom: 30 },
    avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: '#fff' },
    avatarPlaceholder: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center' },
    avatarText: { color: '#fff', fontSize: 48, fontWeight: 'bold' },
    changePhotoText: { color: '#007bff', marginTop: 10, fontSize: 16 },
    infoContainer: { width: '100%', backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 20, elevation: 2 },
    label: { fontSize: 14, color: '#666', marginBottom: 5 },
    value: { fontSize: 18, fontWeight: '600', marginBottom: 15, color: '#333' },
    valueBadge: { fontSize: 16, fontWeight: 'bold', color: '#007bff', backgroundColor: '#e7f1ff', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 },
    actionsContainer: { width: '100%' },
    actionButton: { padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
    actionButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
