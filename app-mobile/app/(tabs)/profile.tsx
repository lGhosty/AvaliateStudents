import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, Alert,
  ScrollView, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import { BASE_URL } from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const { user, token, logout } = useAuth();
  const router = useRouter();

  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // -------------------------------------------------------------------------
  // 1. Carregar foto localmente → depois do servidor → senão placeholder
  // -------------------------------------------------------------------------
  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const savedAvatar = await AsyncStorage.getItem(`@avatar:${user?.email}`);

        if (savedAvatar) {
          setAvatarUri(savedAvatar);
        } else if (user?.avatarUrl) {
          setAvatarUri(user.avatarUrl);
        }
      } catch {
        console.log('Erro ao carregar foto');
      }
    };

    if (user) loadAvatar();
  }, [user]);

  // -------------------------------------------------------------------------
  // 2. Selecionar foto da galeria
  // -------------------------------------------------------------------------
  const handleChoosePhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permissão necessária", "É preciso permitir o acesso à galeria.");
      return;
    }

    const picker = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!picker.canceled) {
      const uri = picker.assets[0].uri;
      setAvatarUri(uri); // Feedback imediato
      handleUploadAvatar(uri);
    }
  };

  // -------------------------------------------------------------------------
  // 3. Upload → salvar no servidor → salvar no banco → salvar local
  // -------------------------------------------------------------------------
  const handleUploadAvatar = async (uri: string) => {
    setIsLoading(true);

    try {
      // A. Upload físico
      const formData = new FormData();
      const filename = uri.split('/').pop();
      const extMatch = /\.(\w+)$/.exec(filename || '');
      const type = extMatch ? `image/${extMatch[1]}` : 'image';

      formData.append('image', { uri, name: filename, type } as any);

      const uploadRes = await fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (!uploadRes.ok) {
        throw new Error("Falha no upload do arquivo.");
      }

      const data = await uploadRes.json();
      const serverUrl = BASE_URL.replace('/api', '');
      const finalUrl = `${serverUrl}/uploads/${data.filename}`;

      // B. Salvar avatar no banco
      const dbRes = await fetch(`${BASE_URL}/auth/avatar`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ avatarUrl: finalUrl }),
      });

      if (!dbRes.ok) {
        throw new Error("Erro ao vincular foto ao usuário.");
      }

      // C. Salvar localmente (cache)
      await AsyncStorage.setItem(`@avatar:${user?.email}`, finalUrl);
      setAvatarUri(finalUrl);
      Alert.alert("Sucesso", "Foto atualizada!");

    } catch (err) {
      console.log(err);
      Alert.alert("Aviso", "Não foi possível salvar no servidor. A foto ficará apenas neste dispositivo.");
      await AsyncStorage.setItem(`@avatar:${user?.email}`, uri);

    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------------------------------------------------
  // 4. Render
  // -------------------------------------------------------------------------
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.title}>Meu Perfil</Text>

        {/* Avatar */}
        <TouchableOpacity onPress={handleChoosePhoto} style={styles.avatarContainer}>
          {isLoading ? (
            <View style={[styles.avatar, { justifyContent: 'center' }]}>
              <ActivityIndicator color="#007bff" />
            </View>
          ) : avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {user?.nome?.substring(0, 2).toUpperCase() || 'U'}
              </Text>
            </View>
          )}
          <Text style={styles.changePhotoText}>Alterar foto</Text>
        </TouchableOpacity>

        {/* Informações */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{user?.nome || 'Carregando...'}</Text>

          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.value}>{user?.email || 'Carregando...'}</Text>

          <Text style={styles.label}>Tipo de Conta:</Text>
          <Text style={styles.valueBadge}>{user?.role || 'ESTUDANTE'}</Text>
        </View>

        {/* Ações */}
        <View style={styles.actionsContainer}>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#28a745' }]}
            onPress={() => router.push('/minhas-reservas')}
          >
            <Text style={styles.actionButtonText}>📅 Minhas Viagens</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#007bff' }]}
            onPress={() => router.push('/gerenciar-reservas')}
          >
            <Text style={styles.actionButtonText}>🏠 Gerenciar Meus Aluguéis</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#dc3545' }]}
            onPress={logout}
          >
            <Text style={styles.actionButtonText}>Sair (Logout)</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// -------------------------------------------------------------------------
// 5. Styles
// -------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { alignItems: 'center', padding: 20 },

  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#333' },

  avatarContainer: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: '#fff', backgroundColor: '#eee' },
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

