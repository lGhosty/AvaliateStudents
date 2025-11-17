import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router'; // <-- Importar useRouter

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter(); // <-- Inicializar router
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "É preciso permitir o acesso à galeria.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setAvatarUri(pickerResult.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Meu Perfil</Text>
        
        <TouchableOpacity onPress={handleChoosePhoto} style={styles.avatarContainer}>
          {avatarUri ? (
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
          {/* --- BOTÃO NOVO AQUI --- */}
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#28a745' }]}
            onPress={() => router.push('/minhas-reservas')}
          >
            <Text style={styles.actionButtonText}>📅 Ver Minhas Reservas</Text>
          </TouchableOpacity>
          {/* ----------------------- */}

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
    avatar: { width: 120, height: 120, borderRadius: 60 },
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
